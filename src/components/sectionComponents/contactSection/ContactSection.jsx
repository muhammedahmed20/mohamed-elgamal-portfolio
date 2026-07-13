"use client";

import { TabsIcons } from "./TabsIcons";
import SocialIcons from "./SocialIcons";
import SendMessageForm from "./SendMessageForm";
import { Card } from "@/components/ui/card";
import ContactCards from "./ContactCards";
import { useState } from "react";
import BookCall from "./BookCall";


export default function ContactSection() {
  const [activeTab, setActiveTab] = useState("call");

  return (
    <section className="w-full p-4">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Get In Touch
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Have a project in mind or want to collaborate? Feel free to reach
            out through any of these channels.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-10">
          <TabsIcons setActiveTab={setActiveTab} />
          <SocialIcons />
        </div>

        {activeTab === "message" && (
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <SendMessageForm />
            </Card>

            <ContactCards />
          </div>
        )}

        {activeTab === "call" && (
          <BookCall/>
        )}
      </div>
    </section>
  );
}
