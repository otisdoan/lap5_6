"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Todos from "@/components/Todos";
import Footer from "@/components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function Home() {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const checkUserAndSaveProfile = async () => {
      try {
        const { data: authData, error } = await supabase.auth.getUser();
        console.log("Auth data:", authData);

        if (!authData.user) {
          router.push("/login");
          return;
        }
        
        const userEmail = authData.user.email;
          
        const { data: existingProfile} = await supabase
          .from("profiles")
          .select("*")
          .eq("email", userEmail)
          .maybeSingle();

        if (!existingProfile) {
          const { data, error: insertError } = await supabase
            .from("profiles")
            .insert({
              email: userEmail,
            })
        }
        setIsUser(true);
      } catch (error) {
        console.log(error)
      }
    };

    checkUserAndSaveProfile();
  }, [router]);

  if (!isUser) return null;

  return (
    <>
      <Header />
      <Todos />
      <Footer />
    </>
  );
}