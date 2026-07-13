import { BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { Mail } from "lucide-react";

export default function SocialIcons() {
  return (
 <div className="flex items-center gap-4 rounded-lg bg-muted px-4 py-2 text-muted-foreground">
            <a
              href="mailto:your-email@example.com"
              className="transition hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>

            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              <BsLinkedin className="h-4 w-4" />
            </a>

            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              <BsGithub className="h-4 w-4" />
            </a>

            <a
              href="https://x.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              <BsTwitterX className="h-4 w-4" />
            </a>
          </div>
  )
}
