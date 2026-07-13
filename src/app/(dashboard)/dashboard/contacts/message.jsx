import { createClient } from "@/lib/supabase/server";
import ContactsPage from "./ContactsPage";


export default async function Page() {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("MESSAGES:", messages);
  console.log("ERROR:", error);
  console.log("COUNT:", messages?.length);

  return <ContactsPage messages={messages ?? []} />;
}