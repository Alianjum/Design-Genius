import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Heart, LayoutDashboard, Users, Mail, LogOut, Shield } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function DashboardLayout({ children, isAdmin = false }: DashboardLayoutProps) {
  const [location, setLocation] = useLocation();

  const userNavItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Referrals", href: "/dashboard/referrals", icon: <Users className="h-5 w-5" /> },
    { label: "Email Invitations", href: "/dashboard/email", icon: <Mail className="h-5 w-5" /> },
  ];

  const adminNavItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
    { label: "Email Invitations", href: "/admin/email", icon: <Mail className="h-5 w-5" /> },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/admin") {
      return location === href;
    }
    return location.startsWith(href);
  };

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-semibold">Help the Group</span>
              {isAdmin && (
                <span className="ml-auto flex h-5 items-center rounded bg-primary/10 px-1.5 text-xs font-medium text-primary">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </span>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                      >
                        <Link href={item.href}>
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-sidebar-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="flex h-14 items-center justify-between gap-4 border-b px-4">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
