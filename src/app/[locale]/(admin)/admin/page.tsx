/* import { useState } from 'react'; */
"use client";
import OverviewTab from "@/features/admin/OverviewTab";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* const TABS = ["Overview", "Projects", "Chat", "Products", "Posts"] as const;
type Tab = (typeof TABS)[number]; */

export default function AdminPage() {
  //eslint-disable-next-line
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      //eslint-disable-next-line
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/");
        return; 
      }
     

      setUser(data.user);
      setLoading(false);
    }

    fetchUser();
  }, [router]);

  if(loading) {
    return <div className="p-8 text-center">Loading...</div>
  }
  return  (
    <div>
      {/* <p>{session?.user?.name}</p>
        <Image src={session?.user?.image!} alt={session?.user?.name!} width={72} height={72}/> */}
      <OverviewTab />
    </div>
  );
}
