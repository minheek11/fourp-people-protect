import { NavLink as RouterNavLink } from "react-router-dom";
import { Shield } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/protect", label: "Protect" },
  { to: "/firewalls", label: "Firewalls" },
  { to: "/approval", label: "Approval" },
  { to: "/dashboard", label: "Dashboard" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-tight text-foreground">4P: For People</h1>
              <p className="text-xs text-muted-foreground tracking-wide">People • Prevent • Protect • Preserve</p>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <RouterNavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </RouterNavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
