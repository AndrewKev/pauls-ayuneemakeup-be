import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Package2 } from "lucide-react"

const navMain = [
  {
    title: "Menu",
    url: "#",
    items: [
      {
        title: "Products",
        url: "/products",
        isActive: false,
      },
      {
        title: "News",
        url: "/news",
        isActive: false,
      },
    ],
  },
];

interface AppSidebarProps {
  children: React.ReactNode
  activePage: string
}

export function AppSidebar({ children, activePage }: AppSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/" className="flex items-center gap-2 font-semibold">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Package2 className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Admin Dashboard</span>
                    <span className="text-xs text-muted-foreground">Manage your content</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <div className="p-4 text-xs text-muted-foreground">© 2025 Ayunee Makeup</div>
        </SidebarFooter>
      </Sidebar>
      <main className="w-screen">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-5" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{activePage}</h1>
            </div>
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}
