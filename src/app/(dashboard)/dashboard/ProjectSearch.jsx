"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProjectSearch() {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("search") || "");

  function handleChange(e) {
    const text = e.target.value;

    setValue(text);

    const query = new URLSearchParams(params);

    if (text) {
      query.set("search", text);
    } else {
      query.delete("search");
    }

    router.replace(`?${query.toString()}`);
  }

  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input className="pl-10" placeholder="Search projects..." 
      value={value}
      onChange={handleChange}/>
    </div>
  );
}