"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function Login() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data.session) {
        toast.error("Session was not created");
        return;
      }

      toast.success("Welcome back 👋");

      router.replace("/dashboard");

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/70">
      <div
        className="
        relative
        w-full
        max-w-sm
        overflow-hidden
        rounded-xl
        border
        bg-card
        px-8
        py-8
        shadow-lg
        "
      >
        <div
          className="
          absolute
          inset-0
          -top-px
          -left-px
          z-0
          "
          style={{
            backgroundImage: `
            linear-gradient(
              to right,
              color-mix(in srgb, var(--card-foreground) 8%, transparent) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              color-mix(in srgb, var(--card-foreground) 8%, transparent) 1px,
              transparent 1px
            )
            `,
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />

        <div className="relative isolate flex flex-col items-center">
          <Link
            href="/"
            className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50 mb-10"
          >
            {/* اللوجو الغامق (يظهر فقط في الـ Light Mode) */}
            <Image
              src="/black-logo.webp"
              alt="اسم الشركة - الغامق"
              width={100}
              height={50}
              className="block dark:hidden"
            />

            {/* اللوجو الفاتح (يظهر فقط في الـ Dark Mode) */}
            <Image
              src="/white-logo.webp"
              alt="اسم الشركة - الفاتح"
              width={100}
              height={50}
              className="hidden dark:block"
            />
          </Link>


          <form
            className="w-full space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>

                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    disabled={loading}
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>

                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                  />

                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Continue with Email"}
            </Button>
          </form>

          <Link
            href="#"
            className="
            mt-5
            text-sm
            text-muted-foreground
            underline
            "
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
