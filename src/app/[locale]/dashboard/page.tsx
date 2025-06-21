import OverviewTab from "@/features/client/OverviewTab";

export default function DashboardPage() {
  console.log("NOde environment:", process.env.NODE_ENV);
  return (
    <div>
      {/* <p>{session?.user?.name}</p>
               <Image src={session?.user?.image!} alt={session?.user?.name!} width={72} height={72}/> */}
      <OverviewTab />
    </div>
  );
}
