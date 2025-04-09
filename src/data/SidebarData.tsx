import {
    IconBarrierBlock,
    IconBrowserCheck,
    IconBug,
    IconChecklist,
    IconError404,
    IconHelp,
    IconLayoutDashboard,
    IconLock,
    IconLockAccess,
    IconMessages,
    IconNotification,
    IconPackages,
    IconPalette,
    IconServerOff,
    IconSettings,
    IconTool,
    IconUserCog,
    IconUserOff,
    IconUsers,
    IconArticle,
    IconBellRinging2
  } from '@tabler/icons-react'
  import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
  import { type SidebarData } from '@/types/dashboard_types'
  
  export const sidebarData: SidebarData = {
    user: {
      name: 'satnaing',
      email: 'satnaingdev@gmail.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'Shadcn Admin',
        logo: Command,
        plan: 'Vite + ShadcnUI',
      },
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
    ],
    navGroups: [
      {
        title: 'General',
        items: [
          {
            title: 'Dashboard',
            url: '/dashboard',
            icon: IconLayoutDashboard,
          },
          {
            title: 'Articles',
            url: '/dashboard/articles',
            icon: IconArticle,
          },
          {
            title: 'Tasks',
            url: '/dashboard/tasks',
            icon: IconChecklist,
          },
          {
            title: 'Chats',
            url: '/dashboard/chats',
            badge: '3',
            icon: IconMessages,
          },
          {
            title: "Notifications",
            url: "/dashboard/notifications",
            badge: '2',
            icon: IconBellRinging2
          }
        ],
      },
      {
        title: 'Your Pages',
        items: [
          {
            title: 'Home Pages',
            url: "",
            icon: IconLockAccess
          },
          {
            title: 'Errors',
            icon: IconBug,
            items: [
              {
                title: 'Unauthorized',
                url: '/401',
                icon: IconLock,
              },
              {
                title: 'Forbidden',
                url: '/403',
                icon: IconUserOff,
              },
              {
                title: 'Not Found',
                url: '/404',
                icon: IconError404,
              },
              {
                title: 'Internal Server Error',
                url: '/500',
                icon: IconServerOff,
              },
              {
                title: 'Maintenance Error',
                url: '/503',
                icon: IconBarrierBlock,
              },
            ],
          },
        ],
      },
      {
        title: 'Other',
        items: [
          {
            title: 'Settings',
            icon: IconSettings,
            items: [
              {
                title: 'Profile',
                url: '/settings',
                icon: IconUserCog,
              },
              {
                title: 'Account',
                url: '/settings/account',
                icon: IconTool,
              },
              {
                title: 'Appearance',
                url: '/settings/appearance',
                icon: IconPalette,
              },
              {
                title: 'Notifications',
                url: '/settings/notifications',
                icon: IconNotification,
              },
              {
                title: 'Display',
                url: '/settings/display',
                icon: IconBrowserCheck,
              },
            ],
          },
          {
            title: 'Help Center',
            url: '/help-center',
            icon: IconHelp,
          },
        ],
      },
    ],
  }
  