import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-muted px-4 py-2 text-muted-foreground">
      <Link
        href="mailto:m.ahmed01113@gmail.com"
        className="transition hover:text-foreground"
      >
        <Mail className="h-4 w-4" />
      </Link>

      <Link
        href="https://www.linkedin.com/in/mohamed-ahmed-486650224"
        target="_blank"
        rel="noopener noreferrer"
        className="transition hover:text-foreground"
      >
        <BsLinkedin className="h-4 w-4" />
      </Link>

      <Link
        href="https://github.com/muhammedahmed20"
        target="_blank"
        rel="noopener noreferrer"
        className="transition hover:text-foreground"
      >
        <BsGithub className="h-4 w-4" />
      </Link>
      <Link
        href="https://wa.me/201012570502"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground transition-colors hover:text-green-500"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="h-5 w-5" />
      </Link>
    </div>
  );
}
