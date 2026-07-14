"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const TICKET_STATUSES = [
  { value: "open", label: "Open", color: "blue" },
  { value: "in_progress", label: "In Progress", color: "yellow" },
  { value: "pending", label: "Pending/Waiting", color: "orange" },
  { value: "resolved", label: "Resolved", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "slate" },
];


const MEETING_STATUSES = [
  { value: "scheduled", label: "Scheduled", color: "blue" },
  { value: "completed", label: "Completed", color: "green" },
  { value: "no_show", label: "No Show", color: "orange" },
  { value: "cancelled", label: "Cancelled", color: "red" },
];


const STATUS_COLORS = {
  blue:
    "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300",

  yellow:
    "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-300",

  orange:
    "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300",

  green:
    "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300",

  slate:
    "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",

  red:
    "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300",
};


export default function StatusSelectors({
  initialTicketStatus,
  initialMeetingStatus,
  ticketId,
}) {

  const supabase = createClient();


  const [ticketStatus, setTicketStatus] = useState(
    initialTicketStatus || "open"
  );


  const [meetingStatus, setMeetingStatus] = useState(
    initialMeetingStatus || "scheduled"
  );



  const currentTicketColor =
    TICKET_STATUSES.find(
      (status) => status.value === ticketStatus
    )?.color || "slate";


  const currentMeetingColor =
    MEETING_STATUSES.find(
      (status) => status.value === meetingStatus
    )?.color || "slate";



  async function updateStatus(
    column,
    value,
    setter,
    oldValue
  ) {

    setter(value);


    const loading = toast.loading(
      "Updating status..."
    );


    const { error } = await supabase
      .from("call_bookings")
      .update({
        [column]: value,
      })
      .eq("id", ticketId);



    if (error) {

      setter(oldValue);


      toast.error(error.message, {
        id: loading,
      });


      return;
    }



    toast.success(
      "Status updated successfully",
      {
        id: loading,
      }
    );
  }




  function handleTicketChange(value) {

    updateStatus(
      "ticket_status",
      value,
      setTicketStatus,
      ticketStatus
    );

  }



  function handleMeetingChange(value) {

    updateStatus(
      "meeting_status",
      value,
      setMeetingStatus,
      meetingStatus
    );

  }



  return (
    <div className="flex flex-col gap-2">


      {/* Ticket Status */}

      <Select
        value={ticketStatus}
        onValueChange={handleTicketChange}
      >

        <SelectTrigger
          className={`w-[160px] text-[13px] transition-colors ${
            STATUS_COLORS[currentTicketColor]
          }`}
        >

          <SelectValue />

        </SelectTrigger>


        <SelectContent>

          {TICKET_STATUSES.map((status) => (

            <SelectItem
              key={status.value}
              value={status.value}
            >
              {status.label}
            </SelectItem>

          ))}

        </SelectContent>


      </Select>





      {/* Meeting Status */}

      <Select
        value={meetingStatus}
        onValueChange={handleMeetingChange}
      >

        <SelectTrigger
          className={`w-[160px] text-[13px] transition-colors ${
            STATUS_COLORS[currentMeetingColor]
          }`}
        >

          <SelectValue />

        </SelectTrigger>



        <SelectContent>

          {MEETING_STATUSES.map((status) => (

            <SelectItem
              key={status.value}
              value={status.value}
            >
              {status.label}
            </SelectItem>

          ))}


        </SelectContent>


      </Select>


    </div>
  );
}