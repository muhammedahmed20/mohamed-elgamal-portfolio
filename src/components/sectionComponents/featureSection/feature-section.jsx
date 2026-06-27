"use client";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  CodeIcon,
  DatabaseIcon,
  PenToolIcon,
  MessageSquareIcon,
  BriefcaseIcon,
  UsersIcon,
  MailIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FeatureSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="mx-auto w-full max-w-5xl space-y-8 py-6 md:py-8 lg:pb-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          What I Offer Services
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          Primarily a Frontend developer — with the extra skills to take your
          project all the way to the finish line.
        </p>
      </div>
      <div className="overflow-hidden rounded-lg border border-secondary-foreground/20">
        <div className="grid grid-cols-1 gap-px bg-secondary-foreground/20 sm:grid-cols-2 md:grid-cols-3 ">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
          ))}
        </div>
      </div>
      <Button variant="link" asChild>
        <a
          href="mailto:your@email.com"
          className="
      flex items-center gap-2
      text-[13px] font-medium text-primary
      border border-primary/40
      rounded px-5 py-2
      bg-primary/5
      shadow-[0_0_12px_2px] shadow-primary/20
      hover:bg-primary/10
      hover:border-primary/70
      hover:shadow-[0_0_20px_4px] hover:shadow-primary/30
      active:scale-95 active:shadow-[0_0_8px_1px] active:shadow-primary/20
      transition-all duration-300
    "
        >
          <MailIcon className="size-4" />
          Let's work together
        </a>
      </Button>
    </motion.div>
  );
}

export function FeatureCard({ feature, className, ...props }) {
  return (
    <div
      className={cn("relative overflow-hidden bg-background p-6", className)}
      {...props}
    >
      <div className="mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 size-full">
        <GridPattern
          className="absolute inset-0 size-full stroke-foreground/20"
          height={40}
          width={40}
          x={20}
        />
      </div>
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
        <div className="[&_svg]:size-6 [&_svg]:text-primary/75">
          {feature.icon}
        </div>
      </div>
      <h3 className="mt-10 text-sm md:text-base">{feature.title}</h3>
      <p className="relative z-20 mt-2 font-light text-muted-foreground text-xs">
        {feature.description}
      </p>
    </div>
  );
}

const features = [
  {
    title: "Frontend Development",
    icon: <CodeIcon />,
    description:
      "Building fast, responsive, and polished web interfaces using React, Next.js, and Tailwind CSS — with a sharp eye for detail and UX.",
  },
  {
    title: "Backend Integration",
    icon: <DatabaseIcon />,
    description:
      "Connecting frontends to real data using Supabase and Strapi — auth, databases, APIs, and CMS setups handled end to end.",
  },
  {
    title: "UI/UX Design",
    icon: <PenToolIcon />,
    description:
      "When there's no designer on the team, I step in — wireframes, component design, and full visual direction using Figma.",
  },
  {
    title: "Technical Consultation",
    icon: <MessageSquareIcon />,
    description:
      "Not sure which stack to pick? I help you think through architecture, tooling, and key decisions before writing a single line of code.",
  },
  {
    title: "Freelance Projects",
    icon: <BriefcaseIcon />,
    description:
      "Available for short and long-term freelance engagements — from landing pages to full web applications, prototype to production.",
  },
  {
    title: "Collaboration",
    icon: <UsersIcon />,
    description:
      "Open to team augmentation, open source contributions, and joint ventures for longer-term or ongoing engagements.",
  },
];
