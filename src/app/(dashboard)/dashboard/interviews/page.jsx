"use client";

import { MoreHorizontalIcon, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    async function getInterviews() {
      const { data, error } = await supabase
        .from("call_bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("SUPABASE ERROR:", error);
        return;
      }

      setInterviews(data ?? []);
    }

    getInterviews();

    const channel = supabase
      .channel("call_bookings_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "call_bookings",
        },
        (payload) => {
          console.log("Realtime change:", payload);

          if (payload.eventType === "INSERT") {
            setInterviews((prev) => [payload.new, ...prev]);
          }

          if (payload.eventType === "UPDATE") {
            setInterviews((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item,
              ),
            );
          }

          if (payload.eventType === "DELETE") {
            setInterviews((prev) =>
              prev.filter((item) => item.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>

          <p className="text-muted-foreground">
            Manage and track all scheduled interviews.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Interview
        </Button>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>Interview List</CardTitle>
          <CardDescription>
            View candidates and their interview status.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {interviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell className="font-medium">
                    {interview.name}
                  </TableCell>

                  <TableCell>{interview.email}</TableCell>
                  <TableCell>{interview.topic}</TableCell>

                  <TableCell>
                    {new Date(interview.starts_at).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        interview.status === "Completed"
                          ? "secondary"
                          : interview.status === "Cancelled"
                            ? "destructive"
                            : "default"
                      }
                    >
                      {interview.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/dashboard/interviews/${interview.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>Edit</DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
