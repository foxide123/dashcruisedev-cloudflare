import OverviewTab from "@/features/client/OverviewTab";

export default function DashboardPage() {
  return (
    <div>
      {/* <p>{session?.user?.name}</p>
               <Image src={session?.user?.image!} alt={session?.user?.name!} width={72} height={72}/> */}
      <OverviewTab />
    </div>
  );
}
