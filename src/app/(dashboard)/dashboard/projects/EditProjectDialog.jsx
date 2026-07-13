"use client";

import FileUpload06 from "@/components/file-upload-06";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/lib/validations/project-schema";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export default function EditProjectDialog({ project }) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: project.title,
      description: project.description,
      live_link: project.live_link,
      github_link: project.github_link,
      tech_stack: project.tech_stack.join(", "),
      is_active: project.is_active,
      is_featured: project.is_featured,
    },
  });

  const onSubmit = async (values) => {
    const loading = toast.loading("Updating project...");
    let imageUrl = project.image_url;

    if (values.image instanceof File) {
      const image = values.image;
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, image);

      if (uploadError) {
        toast.error(uploadError.message, { id: loading });
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const techStack = values.tech_stack
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const { data, error } = await supabase
      .from("projects")
      .update({
        title: values.title,
        description: values.description,
        live_link: values.live_link,
        github_link: values.github_link,
        tech_stack: techStack,
        image_url: imageUrl,
        is_active: values.is_active,
        is_featured: values.is_featured,
      })
      .eq("id", project.id)
      .select();

    if (error) {
      toast.error(error.message, { id: loading });
      return;
    }

    router.refresh();
    form.reset();
    setOpen(false);

    toast.success("Project updated successfully.", {
      id: loading,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>

          <DialogDescription>
            Fill in the information below to create a new portfolio project.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FileUpload06
            value={form.watch("image")}
            onChange={(file) => form.setValue("image", file)}
          />

          <Field>
            <FieldLabel>Project Title</FieldLabel>

            <Input
              id="title"
              placeholder="Portfolio Website"
              {...form.register("title")}
            />
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>

            <Textarea
              rows={4}
              id="description"
              placeholder="Write a short description..."
              {...form.register("description")}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Live Demo</FieldLabel>

              <Input
                id="live_link"
                placeholder="https://..."
                {...form.register("live_link")}
              />
            </Field>

            <Field>
              <FieldLabel>GitHub Repository</FieldLabel>

              <Input
                id="github_link"
                placeholder="https://github.com/..."
                {...form.register("github_link")}
              />
            </Field>
          </div>

          <Field>
            <FieldLabel>Tech Stack</FieldLabel>

            <Input
              id="tech_stack"
              placeholder="React, Next.js, Tailwind..."
              {...form.register("tech_stack")}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h4 className="font-medium">Active</h4>
                <p className="text-sm text-muted-foreground">
                  Show this project on your portfolio.
                </p>
              </div>

              <Switch
                checked={form.watch("is_active")}
                onCheckedChange={(checked) =>
                  form.setValue("is_active", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <h4 className="font-medium">Featured</h4>
                <p className="text-sm text-muted-foreground">
                  Display this project in the featured section.
                </p>
              </div>

              <Switch
                checked={form.watch("is_featured")}
                onCheckedChange={(checked) =>
                  form.setValue("is_featured", checked)
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>

            <Button type="submit">Add Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
