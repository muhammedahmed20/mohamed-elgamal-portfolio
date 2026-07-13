import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import StatusSelectors from "@/components/StatusSelectors"; // تأكد من مسار الاستيراد الصحيح

export default async function InterviewPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("call_bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <div>
      <Card className="px-6 rounded-none">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {data.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{data.name}</p>
              <div className="gap-0 rounded-[5px] p-1">
                <p className="text-[12px]">{data.email}</p>
                <p className="text-[12px]">{data.phone}</p>
              </div>
            </div>
          </div>
          
          {/* استدعاء مكون القوائم هنا وتمرير الحالات الافتراضية */}
          <StatusSelectors 
            initialTicketStatus={data.ticket_status} 
            initialMeetingStatus={data.meeting_status} 
            ticketId={id} 
          />
        </div>
      </Card>
      
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <p>{data.topic}</p>
      <p>{data.starts_at}</p>
    </div>
  );
}