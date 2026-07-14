import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import StatusSelectors from "@/components/StatusSelectors";
import { CalendarClock, Earth } from "lucide-react";
import CallNotes from "@/components/CallNotes";

export default async function InterviewPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("call_bookings")
    .select(
      `
      *,
      call_booking_notes (
        id,
        note,
        created_at
      )
    `,
    )
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-3">
      <Card className="rounded-none border-border bg-card px-6 py-5">
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-start gap-5">
            {/* Date */}
            <div className="flex w-16 shrink-0 flex-col items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="flex w-full items-center justify-center bg-primary py-1.5 text-xs font-semibold uppercase text-primary-foreground">
                {new Date(data.starts_at).toLocaleString("en-US", {
                  weekday: "short",
                })}
              </div>

              <div className="flex h-11 w-full items-center justify-center text-xl font-bold text-foreground">
                {new Date(data.starts_at).getDate()}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3">
              <div className="text-lg font-semibold text-foreground">
                {new Date(data.starts_at).toLocaleString("en-US", {
                  timeStyle: "short",
                })}

                <span className="mx-2 text-muted-foreground">-</span>

                {new Date(
                  new Date(data.starts_at).getTime() + 30 * 60 * 1000,
                ).toLocaleString("en-US", {
                  timeStyle: "short",
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-md bg-muted px-2 py-1">
                  ID: #{data.id.slice(0, 4)}
                </span>

                <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                  <Earth size={14} />

                  {data.time_zone}
                </span>

                <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                  <CalendarClock size={14} />
                  30 min
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <StatusSelectors
              initialTicketStatus={data.ticket_status}
              initialMeetingStatus={data.meeting_status}
              ticketId={id}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 px-4 lg:grid-cols-3">
        {/* Notes */}

        <div className="lg:col-span-2">
          <CallNotes bookingId={data.id} notes={data.call_booking_notes} />
        </div>

        {/* Information */}

        <div className="space-y-6">
          <Card className="rounded-2xl border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Meeting Information
                </h3>

                <p className="text-sm text-muted-foreground">
                  Details about this call booking
                </p>
              </div>

              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {data.meeting_status}
              </div>
            </div>

            {/* User */}

            <div className="mb-6 flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {data.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold text-card-foreground">
                  {data.name}
                </p>

                <p className="text-sm text-muted-foreground">{data.email}</p>
              </div>
            </div>

            {/* Details */}

            <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
              {[
                ["Topic", data.topic || "No topic"],
                ["Scheduled", new Date(data.starts_at).toLocaleString()],
                ["Time Zone", data.time_zone],
                ["Ticket Status", data.ticket_status],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-muted/40 p-4"
                >
                  <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
                    {title}
                  </p>

                  <p className="font-medium text-card-foreground">{value}</p>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-border" />

            {/* Activity */}

            <div>
              <h3 className="mb-6 text-lg font-semibold text-card-foreground">
                Activity
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />

                    <span className="h-full w-px bg-border" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      Meeting created
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(data.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      Current status: {data.meeting_status}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Last updated recently
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
