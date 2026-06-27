"use client";

import { HiDownload } from "react-icons/hi";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";

export default function HeroCard() {
  
  return (
    <motion.div
    initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    className="flex flex-col gap-4 w-65 rounded-xl bg-surface p-6 shadow-sm border border-border/40 rotate-3 hover:rotate-0 active:rotate-0 foucs:rotate-0 transition-all duration-300">
      <div className="flex items-center gap-2">
        <div className="relative flex size-3 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 animate-ping" />

          <span className="relative inline-flex size-2 rounded-full bg-primary" />
        </div>

        <p className="text-[10px] lg:text-xs font-medium uppercase tracking-wide text-primary whitespace-nowrap">
          available
        </p>
      </div>
      <p className="text-[10px] lg:text-xs font-medium uppercase tracking-wide text-text-secondary whitespace-nowrap">
        open to work
      </p>
      <h1 className="text-[40px] tracking-tight font-black text-foreground leading-none">
        <span className="block">Hire</span>
        <span className="block">Me.</span>
      </h1>
      <ul className="space-y-2">
        {[
          "Freelance projects",
          "Consulting & advisory",
          "Side collab & OSS",
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <div className="h-px w-full bg-border/40" />
      <div className="w-full flex justify-center items-center">
        <Button
          asChild
          className="rounded-full py-5 w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground active:bg-primary foucs:bg-primary active:text-primary-foreground foucs:text-primary-foreground transition-all duration-200 ease-out"
        >
          <a
            href="/Mohamed-Elgamal-CV.pdf"
            download
            className="flex items-center justify-center gap-2"
          >
            <HiDownload />
            Download CV
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
