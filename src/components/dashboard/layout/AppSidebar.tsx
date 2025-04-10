import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from '@/components/ui/sidebar'
  import { NavGroup } from '@/components/dashboard/layout/NavGroup'
  import { NavUser } from '@/components/dashboard/layout/NavUser'
  import { TeamSwitcher } from '@/components/dashboard/layout/TeamSwitcher'
  import { sidebarData } from '@/data/SidebarData'
import { NavGroup as NavGroupType } from '@/types/dashboard_types'
  
  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
      <Sidebar collapsible='icon' variant='floating' {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={sidebarData.teams} />
        </SidebarHeader>
        <SidebarContent>
          {sidebarData.navGroups.map((props:NavGroupType) => (
            <NavGroup key={props.title} {...props} />
          ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={sidebarData.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }
  