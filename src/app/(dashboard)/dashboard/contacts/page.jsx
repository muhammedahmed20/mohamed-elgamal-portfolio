"use client";

import { useEffect, useState } from "react";
import { SidebarInset } from "@/components/ui/sidebar";

import ContactDetails from "./contact-details";
import ContactList from "./contact-list";

import { createClient } from "@/lib/supabase/client";

export default function ContactsPage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function getMessages() {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("SUPABASE ERROR:", error);
        return;
      }

      setMessages(data ?? []);
      setSelectedMessage(null);
      setLoading(false);
    }

    getMessages();

const channel = supabase
  .channel("contact_messages_realtime")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "contact_messages",
    },
    (payload) => {
      console.log("REALTIME:", payload);

      if (payload.eventType === "INSERT") {
        setMessages((prev) => [
          payload.new,
          ...prev,
        ]);
      }

      if (payload.eventType === "UPDATE") {
        setMessages((prev) =>
          prev.map((item) =>
            item.id === payload.new.id
              ? payload.new
              : item
          )
        );

        if (selectedMessage?.id === payload.new.id) {
          setSelectedMessage(payload.new);
        }
      }

      if (payload.eventType === "DELETE") {
        setMessages((prev) =>
          prev.filter(
            (item) => item.id !== payload.old.id
          )
        );
      }
    }
  )
  .subscribe((status) => {
    console.log("REALTIME STATUS:", status);
  });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSelectMessage = async (message) => {
  const updatedMessage = {
    ...message,
    read: true,
  };

  // عرض الرسالة فورًا
  setSelectedMessage(updatedMessage);

  // تحديث الليست فورًا
  setMessages((prev) =>
    prev.map((item) =>
      item.id === message.id
        ? updatedMessage
        : item
    )
  );

  // تحديث الداتا بيز
  if (!message.read) {
    const { error } = await supabase
      .from("contact_messages")
      .update({
        read: true,
      })
      .eq("id", message.id);

    if (error) {
      console.log(error);
    }
  }
};

  if (loading) {
    return (
      <SidebarInset className="flex h-screen items-center justify-center">
        Loading...
      </SidebarInset>
    );
  }

  return (
    <SidebarInset className="h-screen overflow-hidden">
      <div className="flex h-full overflow-hidden">
        <ContactList
          messages={messages}
          selectedMessage={selectedMessage}
          onSelect={handleSelectMessage}
        />

        <ContactDetails message={selectedMessage} setSelectedMessage={setSelectedMessage}/>
      </div>
    </SidebarInset>
  );
}
