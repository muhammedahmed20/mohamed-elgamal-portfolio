import { IoMdArrowForward } from "react-icons/io";
import { Button } from "../../ui/button";

export default function HeroIntro() {
  return (
    <div className="flex flex-col items-start gap-5 lg:gap-6">
  {/* Status badge */}
  <div className="flex justify-center items-center gap-2 bg-primary/30 border border-primary rounded-full py-1.5 px-3">
    <div className="relative flex size-2.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary/40 animate-ping" />

          <span className="relative inline-flex size-1.75 rounded-full bg-primary" />
        </div>

    <h1 className="text-[10px] lg:text-[12px] text-primary uppercase font-medium whitespace-nowrap">
      Open for freelance & collab
    </h1>
  </div>

  {/* Intro */}
  <h4 className="text-text-secondary text-[15px] lg:text-[18px]">
    Hi, I&apos;m{" "}
    <span className="text-text-inverse">Mohamed Elgamal</span> —
  </h4>

  {/* Main title */}
  <h1 className="text-[52px] leading-[0.95] md:text-[90px] lg:text-[120px] tracking-tight font-black text-primary wrap-break-word">
    Front-end{" "}
    <span className="text-accent-foreground">Developer.</span>
  </h1>

  {/* Description */}
  <h3 className="text-sm lg:text-lg text-text-secondary leading-relaxed max-w-162.5">
    Frontend developer focused on building clean, responsive, and
    user-friendly interfaces. I enjoy turning ideas into smooth digital
    experiences and always love exploring creative UI solutions and modern
    frontend tools.
  </h3>

  {/* Buttons */}
  <div className="flex flex-col md:flex-row w-full md:w-auto gap-3 md:gap-4">
    <Button className="group rounded-full px-6 py-6 flex justify-center items-center hover:bg-primary/90 w-full md:w-auto">
      <h3 className="text-[14px]">Get in touch</h3>

      <IoMdArrowForward className="animate-bounce-x ml-1" />
    </Button>

    <Button
      variant="outline"
      className="rounded-full px-6 py-6 border-text-secondary hover:border-primary hover:text-primary w-full md:w-auto"
    >
      <h3 className="text-[14px]">View my work</h3>
    </Button>
  </div>
</div>
  );
}
