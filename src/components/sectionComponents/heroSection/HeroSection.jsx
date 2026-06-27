import { RiArrowDownSLine } from "react-icons/ri";
import HeroCard from "./HeroCard";
import HeroIntro from "./HeroIntro";
import ProfileSidebar from "./ProfileSidebar";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center py-6 md:py-8 lg:pb-20 px-4">
      <div className="mx-auto w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex flex-col lg:flex-row w-full lg:w-8/12 items-center lg:items-start gap-8">
          <ProfileSidebar />
          <HeroIntro />
        </div>
        <HeroCard />
      </div>
      <RiArrowDownSLine
        size={30}
        className="text-foreground/30 mt-20 animate-bounce"
      />
    </section>
  );
}
