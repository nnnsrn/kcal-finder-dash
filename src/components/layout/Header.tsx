import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Zap } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CalorieVision
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/detect" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/detect') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Detection
          </Link>
          <Link 
            to="/calculator" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/calculator') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Calculator
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/detect">
              <Zap className="h-4 w-4 mr-2" />
              Try Now
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;