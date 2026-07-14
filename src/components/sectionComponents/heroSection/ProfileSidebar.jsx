"use client";

import Image from "next/image";
import { LuGithub } from "react-icons/lu";
import { FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function ProfileSidebar() {
  const router = useRouter();
  const timerRef = useRef(null);

  const handlePointerDown = () => {
    timerRef.current = setTimeout(() => {
      router.push("/dashboard");
    }, 2000); // ثانيتين
  };

  const handlePointerUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="flex flex-row lg:flex-col items-center gap-2 lg:gap-6 self-start lg:self-auto"
    >
      {/* Avatar */}
      <div className="p-0.5 rounded-full bg-background hover:bg-primary transition">
        <div className="relative w-10 h-10 lg:w-15 lg:h-15 overflow-hidden rounded-full">
          <Image
            src="/myPic.jpg"
            alt="avatar"
            fill
            sizes="(max-width: 1024px) 40px, 60px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div className="flex items-center justify-center lg:h-24 lg:w-auto w-24 h-auto">
        <h1
          className="text-[10px] lg:text-xs tracking-widest lg:rotate-90 rotate-0 whitespace-nowrap"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          mohamed elgamal
        </h1>
      </div>

      {/* Line */}
      <div className="w-20 md:w-120 lg:w-px h-px lg:h-68 bg-primary/40 transition-all duration-300 ease-in" />

      {/* Icons */}
      <div className="flex flex-row lg:flex-col gap-4 text-muted-foreground">
        <LuGithub
          size={18}
          className="cursor-pointer hover:text-primary transition"
        />
        <FiLinkedin
          size={18}
          className="cursor-pointer hover:text-primary transition"
        />
      </div>
    </motion.div>
  );
}
