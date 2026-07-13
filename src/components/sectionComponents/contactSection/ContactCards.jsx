import { Card } from "@/components/ui/card";
import { CircleCheckBig, Clock, Mail, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a
        href="https://wa.me/201012570502"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Card className="p-6 border-border hover:ring-1 hover:ring-green-500 transition-all flex flex-col items-start cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center mb-.5">
            <FaWhatsapp className="w-5 h-5 text-green-600" />
          </div>

          <h3 className="text-xs uppercase tracking-wide font-medium text-muted-foreground ">
            WhatsApp
          </h3>

          <p className="text-[15px] font-medium">+20 101 257 0502</p>
        </Card>
      </a>

      <a href="mailto:m.ahmed01113@gmail.com" className="block">
        <Card className="p-6 border-border hover:ring-1 hover:ring-cyan-500 transition-all flex flex-col items-start cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-.5">
            <Mail className="w-5 h-5 text-cyan-500" />
          </div>

          <h3 className="text-xs uppercase tracking-wide font-medium text-muted-foreground ">
            Email
          </h3>

          <p className="text-[15px] font-medium">m.ahmed01113@gmail.com</p>
        </Card>
      </a>

      <Card className="relative p-4 border border-green-500 flex flex-col items-start text-left overflow-visible bg-green-200/10">
        <span className="absolute -top-2.5 left-5 inline-flex items-center gap-2 bg-green-500 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Available now
        </span>

        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center  mt-1">
          <CircleCheckBig className="w-5 h-5 text-green-500" />
        </div>

        <h3 className="text-xs uppercase tracking-wide font-medium text-muted-foreground self-start">
          Availability
        </h3>

        <p className="text-[15px] font-medium self-start">
          Open for freelance projects
        </p>
      </Card>
    </div>
  );
}
