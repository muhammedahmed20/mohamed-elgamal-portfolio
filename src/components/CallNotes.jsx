"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

function NoteDate({ date }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      new Date(date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    );
  }, [date]);

  return <>{value}</>;
}

export default function CallNotes({ bookingId, notes }) {
  const [supabase] = useState(() => createClient());

  const [items, setItems] = useState(notes || []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      note: "",
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel(`call-notes-${bookingId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "call_booking_notes",
          filter: `call_booking_id=eq.${bookingId}`,
        },
        (payload) => {
          setItems((prev) => {
            const exists = prev.some((item) => item.id === payload.new.id);

            if (exists) return prev;

            return [payload.new, ...prev];
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, supabase]);

  async function onSubmit(values) {
    const loading = toast.loading("Adding note...");

    const { error } = await supabase.from("call_booking_notes").insert({
      call_booking_id: bookingId,
      note: values.note,
    });

    if (error) {
      toast.error(error.message, {
        id: loading,
      });

      return;
    }

    reset();

    toast.success("Note added", {
      id: loading,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="flex flex-col items-end gap-3 rounded-xl border border-border bg-card p-5">
          <Textarea
            {...register("note", {
              required: true,
            })}
            placeholder="Write a note..."
            className="bg-background"
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post note"}
          </Button>
        </Card>
      </form>

      <Card className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">
          Notes
        </h3>

        <div className="space-y-3">
          {items.length ? (
            items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-border bg-muted/40 p-4"
              >
                <p className="text-sm text-card-foreground">{item.note}</p>

                <p className="mt-2 text-xs text-muted-foreground">
                  <NoteDate date={item.created_at} />
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No notes available</p>
          )}
        </div>
      </Card>
    </div>
  );
}
