import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EllipsisVertical, FolderCode } from "lucide-react";
import AddProjectDialog from "../AddProjectDialog";
import { createClient } from "@/lib/supabase/server";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import ProjectSearch from "../ProjectSearch";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProjectActions from "../ProjectActions";

async function getProjects(search = "") {
  const supabase = await createClient();

  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export default async function Projects({ searchParams }) {
  const { search = "" } = await searchParams;

  const projects = await getProjects(search);
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects.
          </p>
        </div>

        <AddProjectDialog />
      </div>

      {/* Search */}
      <ProjectSearch />

      {/* Grid */}
      {projects.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCode />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
              There are no projects yet. Add a new project to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <AddProjectDialog />
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group p-0 relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-2xl hover:shadow-black/10"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />

                {/* Status badge */}
                <Badge
                  className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border-0 px-2.5 py-1 shadow-sm backdrop-blur-sm"
                  variant={project.is_active ? "success" : "secondary"}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      project.is_active
                        ? "bg-emerald-300"
                        : "bg-muted-foreground"
                    }`}
                  />

                  {project.is_active ? "Published" : "Draft"}
                </Badge>

                {/* Menu button */}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-3 top-3 h-8 w-8 rounded-full opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
                >
                  <EllipsisVertical className="h-4 w-4" />
                </Button>

                {/* Title overlay على الصورة نفسها لإحساس أكثر احترافية */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="line-clamp-1 text-base font-semibold text-white drop-shadow-sm">
                    {project.title}
                  </h2>
                </div>
              </div>

              <CardContent className="space-y-4 p-5">
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Tech stack */}
                {Array.isArray(project.tech_stack) &&
                  project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech_stack.slice(0, 4).map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="rounded-full border-border/60 bg-muted/40 px-2.5 py-0.5 font-normal text-muted-foreground"
                        >
                          {item}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <Badge
                          variant="outline"
                          className="rounded-full border-border/60 bg-muted/40 px-2.5 py-0.5 font-normal text-muted-foreground"
                        >
                          +{project.tech_stack.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}

                <Separator className="bg-border/60" />

                {/* Stats & actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{project.views_count ?? 0} views</span>
                  </div>

                  <TooltipProvider delayDuration={200}>
                    <ProjectActions project={project} />
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
