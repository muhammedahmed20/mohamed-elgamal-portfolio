import { CalendarDays, Mail } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsIcons({ setActiveTab }) {
  return (
    <Tabs defaultValue="call">
      <TabsList className="p-2">
        <TabsTrigger
          value="call"
          className="px-5 py-3 gap-2"
          onClick={()=>setActiveTab("call")}
        >
          <CalendarDays className="h-5 w-5" />
          Book a Call
        </TabsTrigger>

        <TabsTrigger
          value="message"
          className="px-5 py-3 gap-2"
          onClick={()=>setActiveTab("message")}
        >
          <Mail className="h-5 w-5" />
          Send Message
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}