"use client";

import { PhoneInput } from "@/components/reui/phone-input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { messageSchema } from "@/lib/validations/project-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SendMessageForm() {
  const supabase = createClient();
  const form = useForm({
    resolver: zodResolver(messageSchema),

    defaultValues: {
      name: "",
      phone: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = form;

  const items = [
    { label: "Select a topic", value: "" },
    { label: "New Project", value: "new-project" },
    { label: "Freelance Project", value: "freelance" },
    { label: "Full-time Opportunity", value: "full-time" },
    { label: "Website Redesign", value: "redesign" },
    { label: "Bug Fixes", value: "bug-fixes" },
    { label: "Other", value: "other" },
  ];

  const onSubmit = async (values) => {
    const loading = toast.loading("Sending message...");

    const { error } = await supabase.from("contact_messages").insert({
      name: values.name,
      phone: values.phone,
      email: values.email,
      topic: values.topic,
      message: values.message,
    });

    if (error) {
      toast.error(error.message, { id: loading });
      return;
    }

    form.reset();

    toast.success("Message sent successfully.", {
      id: loading,
    });
  };

  return (
    <form
      className="flex flex-col gap-5 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
    >
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field className="w-full">
          <FieldLabel
            htmlFor="input-field-name"
            className="uppercase text-[12px]"
          >
            Name
          </FieldLabel>
          <Input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Enter your name"
            className="w-full py-5"
          />
        </Field>

        <Field className="w-full">
          <FieldLabel className="uppercase text-[12px]">Phone</FieldLabel>

          <Controller
            name="phone"
            control={form.control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="EG"
                placeholder="Enter phone number"
              />
            )}
          />

          {form.formState.errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.phone.message}
            </p>
          )}
        </Field>
      </div>

      <Field className="w-full">
        <FieldLabel
          htmlFor="fieldgroup-email"
          className="uppercase text-[12px]"
        >
          Email
        </FieldLabel>
        <Input
          id="fieldgroup-email"
          {...register("email")}
          type="email"
          placeholder="name@example.com"
          className="w-full py-5"
        />
      </Field>

      {/* Select */}
      <Field className="w-full">
        <FieldLabel className="uppercase text-[12px]">topic</FieldLabel>

        <Select
          items={items}
          className="w-full"
          onValueChange={(value) =>
            setValue("topic", value, {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="w-full! py-5">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {items
                .filter((item) => item.value)
                .map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel
          htmlFor="textarea-message"
          className="uppercase text-[12px]"
        >
          Message
        </FieldLabel>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Type your message here."
        />
      </Field>

      <Button
        className="capitalize py-5 text-[12px]"
        type="submit"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}{" "}
        <MoveRight data-icon="inline-start" />
      </Button>
    </form>
  );
}
