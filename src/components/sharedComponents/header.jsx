"use client";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/sharedComponents/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/sharedComponents/mobile-nav";
import { ModeToggle } from "../publicConponents/ModeToggle";
import { ScrollProgress } from "../ui/scroll-progress";
import Link from "next/link";
import Image from "next/image";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
        "border-border bg-background/95 backdrop-blur-3xl supports-backdrop-filter:bg-background/50":
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
        >
          {/* اللوجو الغامق (يظهر فقط في الـ Light Mode) */}
          <Image
            src="/black-logo.webp"
            alt="اسم الشركة - الغامق"
            width={60}
            height={50} 
            className="block dark:hidden" 
          />

          {/* اللوجو الفاتح (يظهر فقط في الـ Dark Mode) */}
          <Image
            src="/white-logo.webp" 
            alt="اسم الشركة - الفاتح"
            width={60}
            height={50}
            className="hidden dark:block"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 md:flex text-muted-foreground">
          {navLinks.map((link) => (
            <Button asChild key={link.label} size="sm" variant="ghost">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}

          <ModeToggle />
        </div>

        {/* Mobile */}
        <MobileNav />
      </nav>

      <ScrollProgress />
    </header>
  );
}
