"use client"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/sharedComponents/logo"
import { useScroll } from "@/hooks/use-scroll"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/sharedComponents/mobile-nav"
import { ModeToggle } from "../publicConponents/ModeToggle"
import { ScrollProgress } from "../ui/scroll-progress"
import Link from "next/link"

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Tools", href: "#tools" },
  { label: "Games", href: "#games" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const scrolled = useScroll(10)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-transparent border-b",
        {
          "border-border bg-background/95 backdrop-blur-3xl supports-backdrop-filter:bg-background/50":
            scrolled,
        }
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        
        {/* Logo */}
        <Link
          href="#"
          className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
        >
          <Logo className="h-4" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 md:flex text-muted-foreground">
          {navLinks.map((link) => (
            <Button
              asChild
              key={link.label}
              size="sm"
              variant="ghost"
            >
              <Link href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}

          <ModeToggle />
        </div>

        {/* Mobile */}
        <MobileNav />
      </nav>

      <ScrollProgress />
    </header>
  )
}