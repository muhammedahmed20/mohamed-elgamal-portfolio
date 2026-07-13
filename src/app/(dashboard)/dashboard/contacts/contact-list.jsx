"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default function ContactList({
  messages = [],
  selectedMessage,
  onSelect,
}) {
  return (
    <div className="flex h-screen w-85 flex-col border-r bg-background">
      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-9" />
        </div>
      </div>

      <ScrollArea className="h-full">
        {messages.map((message) => (
          <button
            key={message.id}
            onClick={() => onSelect(message)}
            className={`w-full border-b p-4 text-left transition hover:bg-muted ${
              selectedMessage?.id === message.id ? "bg-muted" : ""
            }`}
          >
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

              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-medium">{message.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {!message.read ? (
                      <Badge>New</Badge>
                    ) : (
                      new Date(message.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    )}
                  </p>
                </div>

                <p className="truncate text-xs text-muted-foreground">
                  {message.email}
                </p>

                <p className="mt-1 truncate text-sm font-medium">
                  {message.topic}
                </p>

                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {message.message}
                </p>
              </div>
            </div>
          </button>
        ))}
      </ScrollArea>
    </div>
  );
}
