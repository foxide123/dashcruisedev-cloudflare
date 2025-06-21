'use client';
import { createAdminClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PrivateAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  //eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);
  //eslint-disable-next-line
  const router = useRouter();
  //eslint-disable-next-line
  const supabase = createAdminClient();

/*   useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session }, error
        } = await supabase.auth.getSession();
        if (!session) {
          console.error("No session:", error);
          router.replace("/");
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying authentication:", error);
        router.replace("/");
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        console.error("No session");
        router.replace("/");
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router]);
 */
  if (isLoading) {
    return (
      <>
        <style>
          {`.loader {
            height: 60px;
            aspect-ratio: 1;
            border: 3px solid #524656;
            border-top: none;
            position: relative;
            }
            .loader:before {
            content: "";
            position: absolute;
            width: 30%;
            aspect-ratio: 1;
            border-radius: 50%;
            background: #CF4647;
            animation: 
                l5-0 .5s cubic-bezier(0,800,1,800) infinite -.25s,
                l5-1 .5s linear infinite alternate;
            }
            @keyframes l5-0 {
            0%,2% {bottom: 0%}
            98%,to {bottom:.1%}
            }
            @keyframes l5-1 {
            0%,8%  {left: 0%}
            92%,to {left: 70%}
        }`}
        </style>
        <div className="flex flex-col w-screen h-screen items-center justify-center gap-10">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
