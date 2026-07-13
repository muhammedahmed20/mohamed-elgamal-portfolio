"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import EditProjectDialog from "./projects/EditProjectDialog";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AlertDialogDestructive } from "./AlertDialogDestructive";

export default function ProjectActions({ project }) {
 

  return (
    <div className="flex items-center gap-1">
      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
        <Link
          href={project.live_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>

      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
        <Link
          href={project.github_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub className="h-4 w-4" />
        </Link>
      </Button>

      <EditProjectDialog project={project} />

      <AlertDialogDestructive project={project}/>
    </div>
  );
}
