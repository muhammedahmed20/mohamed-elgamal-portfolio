"use client";

import {
  Archive,
  MailCheck,
  Trash2,
  User,
  Mail,
  Phone,
  Calendar,
  X,
  RefreshCcwIcon,
  MessagesSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default function ContactDetails({ message, setSelectedMessage }) {
  if (!message) {
    return (
      <Empty className="h-full bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessagesSquare />
          </EmptyMedia>
          <EmptyTitle>No Message Selected</EmptyTitle>

          <EmptyDescription className="max-w-xs text-pretty">
            Select a message from the list to view its details.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex h-[calc(100vh-48px)] flex-1 flex-col">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-1">
          <h2 className="text-2xl font-bold">{message.topic}</h2>

          <div className="mt-2 flex items-center gap-2">
            {message.read ? (
              <Badge variant="secondary">Read</Badge>
            ) : (
              <Badge>Unread</Badge>
            )}
          </div>
        </div>

        <div className="flex flex-row-reverse items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedMessage(null)}
          >
            <X className="h-4 w-4" />
          </Button>

          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>
                {message.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{message.name}</p>

              <Card className="gap-0 rounded-[5px] p-1">
                <p className="text-[12px]">{message.email}</p>
                <p className="text-[12px]">{message.phone}</p>
              </Card>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[12px]">
            <Calendar className="h-4 w-4 text-muted-foreground" />

            <p className="font-medium">
              {new Date(message.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <h3 className="mb-4 text-lg font-semibold">Message</h3>

          <div className="rounded-lg border bg-muted/30 p-5">
            <p className="whitespace-pre-wrap leading-7">{message.message}</p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
