"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const INITIAL_VISIBLE = 6;

export default function TechSection() {
  const { resolvedTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const techStack = [
    { id: 1, name: "HTML", image: "/html.webp" },
    { id: 2, name: "CSS", image: "/css.webp" },
    { id: 3, name: "JavaScript", image: "/js.webp" },
    { id: 4, name: "React", image: "/react.webp" },
    { id: 5, name: "Tailwind CSS", image: "/tailwind.webp" },
    { id: 6, name: "Bootstrap", image: "/bootstrap.webp" },
    { id: 7, name: "Zustand", image: "/zustand.webp" },
    { id: 8, name: "Next.js", image: "/next.webp" },
    { id: 9, name: "shadcn/ui", image: "/shadcn.webp" },
    { id: 10, name: "Material UI", image: "/mui.webp" },
    { id: 11, name: "Git", image: "/git.webp" },
    { id: 12, name: "GitHub", image: "/github.webp" },
    { id: 13, name: "Postman", image: "/postman.webp" },
    { id: 14, name: "Vite", image: "/vite.webp" },
    { id: 15, name: "npm", image: "/npm.webp" },
    { id: 16, name: "Figma", image: "/figma.webp" },
    { id: 17, name: "Supabase", image: "/supabase.webp" },
    { id: 18, name: "Strapi", image: "/strapi.webp" },
    { id: 19, name: "Vercel", image: isDark ? "/vercel.png" : "/vercel.webp" },
    { id: 20, name: "VS Code", image: "/vscode.webp" },
    { id: 21, name: "GSAP", image: "/gsap.webp" },
    { id: 22, name: "Axios", image: "/axios.webp" },
    { id: 23, name: "Framer Motion", image: "/motion.webp" },
    { id: 24, name: "Three.js", image: "/threejs.webp" },
  ];

  const visibleTech = expanded
    ? techStack
    : techStack.slice(0, INITIAL_VISIBLE);

  return (
    <section className="flex flex-col items-center py-6 md:py-8 lg:pb-20 px-4">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="flex flex-col gap-4"
        >
          <h4 className="capitalize text-[14px] text-primary">Tech Stack</h4>
          <h1 className="capitalize text-[36px] text-foreground font-black leading-none">
            Technologies I Use
          </h1>
          <h2 className="w-full md:w-7/12 text-text-secondary">
            The technologies and tools I prefer to work with. I focus on modern
            web development, type safety, and scalable architectures.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {visibleTech.map((tech) => (
            <div
              key={tech.id}
              className="
                relative flex justify-center items-center
                aspect-square rounded p-2 border
                dark:border-border border-secondary-foreground/20
                dark:bg-white/5 bg-black/5
                backdrop-blur-3xl
                group
                hover:bg-primary/10 hover:border-primary/30
                active:bg-primary/10 active:border-primary/30
                focus-within:bg-primary/10 focus-within:border-primary/30
                transition-all duration-300 ease-in-out
              "
              tabIndex={0}
            >
              <h3 className="absolute top-2 left-2 text-[8px] font-bold">
                {String(tech.id).padStart(2, "0")}
              </h3>

              <div
                className="
                w-3 h-3 absolute top-px left-px border-t border-l
                dark:border-border border-secondary-foreground/20
                opacity-0
                group-hover:opacity-100
                group-active:opacity-100
                group-focus:opacity-100
                duration-200 ease-in-out
              "
              />
              <div
                className="
                w-3 h-3 absolute bottom-px right-px border-b border-r
                dark:border-border border-secondary-foreground/20
                opacity-0
                group-hover:opacity-100
                group-active:opacity-100
                group-focus:opacity-100
                duration-200 ease-in-out
              "
              />

              <div className="flex flex-col items-center gap-2">
                <Image
                  loading="eager"
                  src={tech.image}
                  alt={tech.name}
                  width={55}
                  height={55}
                  className="
                    object-contain h-8 w-8 md:h-10 md:w-10
                    grayscale
                    group-hover:grayscale-0
                    group-active:grayscale-0
                    group-focus:grayscale-0
                    transition-all duration-300
                  "
                />
                <h2 className="text-[9px] md:text-[10px] text-center">
                  {tech.name}
                </h2>
              </div>
            </div>
          ))}
        </motion.div>

        {techStack.length > INITIAL_VISIBLE && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="
              self-center flex items-center gap-2
              text-[13px] font-medium text-primary
              border border-primary/40
              rounded-full px-5 py-2
              bg-primary/5
              shadow-[0_0_12px_2px] shadow-primary/20
              hover:bg-primary/10
              hover:border-primary/70
              hover:shadow-[0_0_20px_4px] hover:shadow-primary/30
              active:scale-95 active:shadow-[0_0_8px_1px] active:shadow-primary/20
              transition-all duration-300
            "
          >
            {expanded
              ? "Show Less"
              : `Show More (${techStack.length - INITIAL_VISIBLE}+)`}
            <span
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
