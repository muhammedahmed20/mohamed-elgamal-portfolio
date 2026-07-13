"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { callSchema } from "@/lib/validations/project-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BookCallForm({
  setSelectedTime,
  selectedTime,
  timeZone,
  setStep,
  setDate,
}) {
  const supabase = createClient();

  const form = useForm({
    resolver: zodResolver(callSchema),
    mode: "onChange",

    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = form;

  console.log(errors);

  const onSubmit = async (values) => {
    const loading = toast.loading("Booking your call...");

    const { error } = await supabase.from("call_bookings").insert({
      name: values.name,
      email: values.email,
      topic: values.topic,
      message: values.message,

      starts_at: selectedTime.utc,
      time_zone: timeZone,
    });

    if (error) {
      toast.error("Failed to book your call. Please try again.", {
        id: loading,
      });
    }

    toast.success("Your call has been booked successfully!", {
      id: loading,
    });

    form.reset();
    setSelectedTime(null);
    setDate(new Date());
    setStep(1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
      className="flex flex-col gap-5"
    >
      <div className="p-6 flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="name" className="uppercase text-[12px]">
            Name
          </FieldLabel>

          <Input
            id="name"
            {...register("name")}
            placeholder="Enter your name"
            className="py-5"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="uppercase text-[12px]">
            Email
          </FieldLabel>

          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="name@example.com"
            className="py-5"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="topic" className="uppercase text-[12px]">
            What is this meeting about?
          </FieldLabel>

          <Input
            id="topic"
            {...register("topic")}
            placeholder="Tell me briefly about your project or what you'd like to discuss..."
            className="py-5"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="message" className="uppercase text-[12px]">
            Additional notes
          </FieldLabel>

          <Textarea
            id="message"
            {...register("message")}
            placeholder="Add any details, questions, or special requests..."
          />
        </Field>

        <div className="grid grid-cols-4 gap-3">
          <Button
            variant="secondary"
            className="py-5 col-span-1"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="py-5 col-span-3"
          >
            {isSubmitting ? "Booking..." : "Book Call"}
            <MoveRight />
          </Button>
        </div>
      </div>
    </form>
  );
}
