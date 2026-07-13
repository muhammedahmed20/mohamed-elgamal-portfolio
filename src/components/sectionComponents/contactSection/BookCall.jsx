"use client";

import { useEffect, useState } from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Clock, CheckCircle, CalendarDays } from "lucide-react";
import { SiGooglemeet } from "react-icons/si";
import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";
import BookCallForm from "./BookCallForm";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

const SLOTS_PER_DAY = 37;

// دالة مستقلة تحسب ISO timestamps لأي يوم (مش بس اليوم المختار)
function getUtcSlotsForDate(targetDate) {
  const start = new Date(targetDate);
  start.setHours(9, 0, 0, 0);

  const slots = [];
  for (let i = 0; i < SLOTS_PER_DAY; i++) {
    const utcDate = new Date(start.getTime() + i * 30 * 60 * 1000);
    slots.push(utcDate.toISOString());
  }
  return slots;
}

export default function BookCall() {
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState(new Date());
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [now, setNow] = useState(null);
  const [timeZone, setTimeZone] = useState("UTC");
  const [mounted, setMounted] = useState(false);

  const [bookedTimes, setBookedTimes] = useState(new Set());
  const [fullyBookedDates, setFullyBookedDates] = useState([]);

  const timeZones = Intl.supportedValuesOf("timeZone");

  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date(date);
    start.setHours(9, 0, 0, 0);

    for (let i = 0; i < SLOTS_PER_DAY; i++) {
      const utcDate = new Date(start.getTime() + i * 30 * 60 * 1000);
      const iso = utcDate.toISOString();
      const localTime = formatInTimeZone(utcDate, timeZone, "hh:mm a");
      const isBooked = bookedTimes.has(iso);
      slots.push({
        label: localTime,
        utc: iso,
        disabled: (now ? utcDate < now : false) || bookedTimes.has(iso),
      });
    }
    return slots;
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setNow(new Date());
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);

    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // جلب حجوزات اليوم المختار عشان نعمل disable للسلوتات
  useEffect(() => {
    if (!mounted) return;

    async function fetchBookings() {
      const { data, error } = await supabase
        .from("call_bookings")
        .select("starts_at")
        .neq("meeting_status", "cancelled");

      if (error) {
        console.error(error);
        return;
      }

      setBookedTimes(
        new Set(data.map((b) => new Date(b.starts_at).toISOString())),
      );
    }

    fetchBookings();
  }, [mounted, supabase]);

  // جلب حجوزات الشهر المعروض عشان نحدد الأيام المتحجزة بالكامل
  useEffect(() => {
    if (!mounted) return;

    async function fetchMonthBookings() {
      const monthStart = new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth(),
        1,
        0,
        0,
        0,
        0,
      );
      const monthEnd = new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );

      const { data, error } = await supabase
        .from("call_bookings")
        .select("starts_at")
        .neq("meeting_status", "cancelled")
        .gte("starts_at", monthStart.toISOString())
        .lte("starts_at", monthEnd.toISOString());

      if (error) {
        console.error("Error fetching month bookings:", error);
        return;
      }

      const byDay = new Map();
      (data || []).forEach((b) => {
        const d = new Date(b.starts_at);
        const key = d.toDateString();
        if (!byDay.has(key)) byDay.set(key, new Set());
        byDay.get(key).add(d.toISOString());
      });

      const fullDays = [];
      byDay.forEach((isoSet, key) => {
        const dayDate = new Date(key);
        const expectedSlots = getUtcSlotsForDate(dayDate);
        const isFull = expectedSlots.every((iso) => isoSet.has(iso));
        if (isFull) fullDays.push(dayDate);
      });

      setFullyBookedDates(fullDays);
    }

    fetchMonthBookings();
  }, [visibleMonth, mounted, supabase]);

  if (!mounted) {
    return null;
  }

  const timeSlots = generateTimeSlots();

  function handleSelectTime(slot) {
    setSelectedTime(slot);
  }

  function handleConfirm() {
    setStep(2);
  }

  function isDateFullyBooked(day) {
    return fullyBookedDates.some(
      (d) => d.toDateString() === day.toDateString(),
    );
  }

  return (
    <Card className="mx-auto w-full max-w-4xl overflow-hidden p-0">
      <CardContent className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] p-0">
        {/* Meeting Info */}
        <div className="flex flex-col gap-2 border-b p-6 text-left md:border-b-0 md:border-r">
          <Avatar>
            <AvatarImage src="/pic.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <h2 className="text-base font-medium">Aayush Bharti</h2>
          <p className="mt-1.5 text-[13px] text-muted-foreground">
            30 min meeting
          </p>

          {selectedTime && (
            <>
              <div className="flex items-center gap-2 text-[12px]">
                <CalendarDays className="h-4 w-4" />
                {format(date, "EEEE, MMMM d, yyyy")}
              </div>

              <div className="flex items-center gap-2 text-[12px]">
                <Clock className="h-4 w-4" />
                {selectedTime.label}
              </div>
            </>
          )}

          <Badge
            variant="secondary"
            className="mt-3.5 gap-1 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            Requires confirmation
          </Badge>

          <div className="mt-4 space-y-2.5 text-[13px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              30m
            </div>
            <div className="flex items-center gap-2">
              <SiGooglemeet className="h-4 w-4" />
              Google Meet
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs text-muted-foreground">Time zone</label>
            <Select value={timeZone} onValueChange={setTimeZone}>
              <SelectTrigger className="mt-1.5 w-full text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {timeZones.map((zone) => (
                  <SelectItem key={zone} value={zone}>
                    {zone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {step === 1 ? (
          <>
            {/* Calendar */}
            <div className="flex justify-center border-r p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                month={visibleMonth}
                onMonthChange={setVisibleMonth}
                numberOfMonths={1}
                captionLayout="dropdown"
                disabled={(day) => isDateFullyBooked(day)}
                className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                formatters={{
                  formatMonthDropdown: (date) =>
                    date.toLocaleString("default", {
                      month: "long",
                    }),
                }}
                components={{
                  DayButton: ({ children, modifiers, day, ...props }) => (
                    <CalendarDayButton
                      day={day}
                      modifiers={modifiers}
                      {...props}
                    >
                      {children}
                    </CalendarDayButton>
                  ),
                }}
              />
            </div>

            {/* Time Slots */}
            <div className="flex flex-col">
              <div className="border-b p-4 text-[13px] text-muted-foreground">
                {format(date, "EEE, d MMM")}
              </div>

              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-2 gap-2 p-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.utc}
                      size="sm"
                      variant={
                        selectedTime?.utc === slot.utc ? "default" : "outline"
                      }
                      disabled={slot.disabled}
                      onClick={() => handleSelectTime(slot)}
                      className="text-[13px]"
                    >
                      {slot.label}
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              {selectedTime && (
                <div className="border-t p-3">
                  <Button
                    className="w-full text-[13px]"
                    onClick={handleConfirm}
                  >
                    Confirm {selectedTime.label}
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="col-span-2 p-6">
            <BookCallForm
              date={date}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              setDate={setDate}
              timeZone={timeZone}
              setStep={setStep}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
