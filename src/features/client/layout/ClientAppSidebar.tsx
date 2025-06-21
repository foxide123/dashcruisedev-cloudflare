import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/dashboard/layout/NavGroup";
import { NavUser } from "@/components/dashboard/layout/NavUser";
/* import { TeamSwitcher } from "@/components/dashboard/layout/TeamSwitcher"; */
import { sidebarData } from "@/data/client/ClientSidebarData";
import { NavGroup as NavGroupType } from "@/types/dashboard_types";

export function ClientAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      {/*  <SidebarHeader>
          <TeamSwitcher teams={sidebarData.teams} />
        </SidebarHeader> */}

      <SidebarHeader>
        <div className="grid flex-1 text-left leading-tight text-xl pl-2">
          <span className="truncate font-semibold">Nitra Solutions</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props: NavGroupType) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
