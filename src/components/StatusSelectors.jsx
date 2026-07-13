"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// الحالات الجديدة المختصرة للتيكت
const TICKET_STATUSES = [
  { value: "open", label: "Open", color: "blue" },
  { value: "in_progress", label: "In Progress", color: "yellow" },
  { value: "pending", label: "Pending/Waiting", color: "orange" },
  { value: "resolved", label: "Resolved", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "slate" },
];

// الحالات الجديدة المختصرة للميتينج
const MEETING_STATUSES = [
  { value: "scheduled", label: "Scheduled", color: "blue" },
  { value: "completed", label: "Completed", color: "green" },
  { value: "no_show", label: "No Show", color: "orange" },
  { value: "cancelled", label: "Cancelled", color: "red" },
];

// الألوان المستخدمة فقط (تم إزالة الألوان الزائدة لتخفيف الكود)
const STATUS_COLORS = {
  blue: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300 dark:hover:bg-blue-900/50",
  yellow: "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-900 dark:bg-yellow-950/50 dark:text-yellow-300 dark:hover:bg-yellow-900/50",
  orange: "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-orange-900/50",
  green: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300 dark:hover:bg-green-900/50",
  slate: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800",
  red: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-900/50",
};

export default function StatusSelectors({
  initialTicketStatus,
  initialMeetingStatus,
  ticketId, // هنستخدمه لاحقاً لما نعمل دوال التحديث في قاعدة البيانات
}) {
  // إضافة Fallback في حال كانت القيمة جاية فاضية
  const [ticketStatus, setTicketStatus] = useState(initialTicketStatus || "open");
  const [meetingStatus, setMeetingStatus] = useState(initialMeetingStatus || "scheduled");

  const currentTicketColor = TICKET_STATUSES.find((s) => s.value === ticketStatus)?.color || "slate";
  const currentMeetingColor = MEETING_STATUSES.find((s) => s.value === meetingStatus)?.color || "slate";

  const handleTicketChange = async (value) => {
    setTicketStatus(value);
    // TODO: Update Supabase logic here
  };

  const handleMeetingChange = async (value) => {
    setMeetingStatus(value);
    // TODO: Update Supabase logic here
  };

  return (
    <div className="flex flex-col gap-2">
      <Select value={ticketStatus} onValueChange={handleTicketChange}>
        <SelectTrigger
          className={`w-[160px] text-[13px] transition-colors duration-200 ${STATUS_COLORS[currentTicketColor]}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TICKET_STATUSES.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={meetingStatus} onValueChange={handleMeetingChange}>
        <SelectTrigger
          className={`w-[160px] text-[13px] transition-colors duration-200 ${STATUS_COLORS[currentMeetingColor]}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {MEETING_STATUSES.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}