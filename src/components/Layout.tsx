import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  List, 
  LogOut, 
  User,
  Settings
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export const Layout = ({ children, showNav = true }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // For now just redirect to login
    navigate("/login");
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: FileText, label: "Submit Issue", path: "/submit" },
    { icon: List, label: "My Issues", path: "/issues" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {showNav && (
        <header className="bg-card border-b shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-primary">CarePortal</h1>
                
                <nav className="hidden md:flex space-x-6">
                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={location.pathname === item.path ? "default" : "ghost"}
                      onClick={() => navigate(item.path)}
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  ))}
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">John Doe</span>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="md:hidden mt-4 flex space-x-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className="flex-1"
                >
                  <item.icon className="h-4 w-4" />
                </Button>
              ))}
            </nav>
          </div>
        </header>
      )}
      
      <main className={showNav ? "pt-0" : ""}>
        {children}
      </main>
    </div>
  );
};