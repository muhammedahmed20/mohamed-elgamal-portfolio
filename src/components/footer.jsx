import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <Link
          href="/"
          className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50 mb-10"
        >
          {/* اللوجو الغامق (يظهر فقط في الـ Light Mode) */}
          <Image
            src="/black-logo.webp"
            alt="اسم الشركة - الغامق"
            width={70}
            height={50}
            className="block dark:hidden"
          />

          {/* اللوجو الفاتح (يظهر فقط في الـ Dark Mode) */}
          <Image
            src="/white-logo.webp"
            alt="اسم الشركة - الفاتح"
            width={70}
            height={50}
            className="hidden dark:block"
          />
        </Link>
        <Separator />
        <div className="flex flex-col-reverse items-center justify-between gap-5 border-t py-8 text-sm sm:flex-row">
          <span className="text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Mohamed Elgamal{" "}
            </Link>
            . Building modern web experiences.
          </span>

          <div className="flex items-center gap-4">
            <Link
              href="https://wa.me/201012570502"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-green-500"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/mohamed-ahmed-486650224"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-[#0A66C2]"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>

            <Link
              href="https://github.com/muhammedahmed20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
