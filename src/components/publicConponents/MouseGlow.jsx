"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function MouseGlow() {
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 blur-2xl transition duration-150"
      style={{
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
        background: isDark
          ? `radial-gradient(
              500px circle at var(--x) var(--y),
              oklch(0.546 0.215 262.9 / 0.35) 0%,
              oklch(0.546 0.215 262.9 / 0.20) 30%,
              transparent 75%
            )`
          : `radial-gradient(
              500px circle at var(--x) var(--y),
              oklch(0.7 0.15 262.9 / 0.20) 0%,
              oklch(0.7 0.15 262.9 / 0.10) 30%,
              transparent 75%
            )`,
      }}
    />
  )
}