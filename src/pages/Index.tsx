import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  TrendingUp, 
  Briefcase,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Import our pages
import Dashboard from '@/components/Dashboard';
import Portfolio from '@/components/Portfolio';
import Screener from '@/components/Screener';
import Stocks from '@/components/Stocks';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileHidden, setMobileHidden] = useState(window.innerWidth < 1024);
  const [activePage, setActivePage] = useState('portfolio');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMobileHidden(true);
      } else {
        setMobileHidden(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobile = () => {
    setMobileHidden(!mobileHidden);
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    if (window.innerWidth < 1024) {
      setMobileHidden(true);
    }
  };

  return (
    <div className="app-container flex min-h-screen">
      {/* Sidebar */}
      <div 
        className={cn(
          "sidebar w-[250px] border-r border-border transition-all duration-300 overflow-hidden z-30 bg-background fixed h-screen",
          sidebarCollapsed && "w-16",
          mobileHidden && "transform -translate-x-full"
        )}
      >
        <div className="sidebar-header flex items-center justify-between h-16 px-4 border-b border-border">
          {!sidebarCollapsed && <h2 className="sidebar-title text-xl font-semibold">StockWise</h2>}
          <button 
            className="toggle-btn text-muted-foreground p-2 rounded-md transition-colors hover:bg-secondary hover:text-foreground"
            onClick={toggleSidebar}
          >
            <ChevronLeft className={cn("transition-transform duration-300", sidebarCollapsed && "rotate-180")} size={20} />
          </button>
        </div>
        
        <nav className="sidebar-nav flex flex-col gap-1 p-2">
          <Link 
            to="#dashboard" 
            className={cn(
              "sidebar-item flex items-center gap-3 py-2 px-3 text-muted-foreground rounded-md transition-colors hover:text-foreground",
              activePage === 'dashboard' && "bg-secondary text-foreground"
            )}
            onClick={() => handleNavigation('dashboard')}
          >
            <LayoutDashboard size={20} />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </Link>
          
          <Link 
            to="#screener" 
            className={cn(
              "sidebar-item flex items-center gap-3 py-2 px-3 text-muted-foreground rounded-md transition-colors hover:text-foreground",
              activePage === 'screener' && "bg-secondary text-foreground"
            )}
            onClick={() => handleNavigation('screener')}
          >
            <Search size={20} />
            {!sidebarCollapsed && <span>Screener</span>}
          </Link>
          
          <Link 
            to="#stocks" 
            className={cn(
              "sidebar-item flex items-center gap-3 py-2 px-3 text-muted-foreground rounded-md transition-colors hover:text-foreground",
              activePage === 'stocks' && "bg-secondary text-foreground"
            )}
            onClick={() => handleNavigation('stocks')}
          >
            <TrendingUp size={20} />
            {!sidebarCollapsed && <span>Stocks</span>}
          </Link>
          
          <Link 
            to="#portfolio" 
            className={cn(
              "sidebar-item flex items-center gap-3 py-2 px-3 text-muted-foreground rounded-md transition-colors hover:text-foreground",
              activePage === 'portfolio' && "bg-secondary text-foreground"
            )}
            onClick={() => handleNavigation('portfolio')}
          >
            <Briefcase size={20} />
            {!sidebarCollapsed && <span>Portfolio</span>}
          </Link>
        </nav>
      </div>
      
      {/* Main content */}
      <div className={cn(
        "main-content flex-1 overflow-x-hidden transition-all duration-300",
        !sidebarCollapsed && !mobileHidden && "ml-[250px]",
        sidebarCollapsed && !mobileHidden && "ml-16"
      )}>
        {/* Page content */}
        <div className="max-w-7xl mx-auto px-6 py-6 animate-fadeIn">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'screener' && <Screener />}
          {activePage === 'stocks' && <Stocks />}
          {activePage === 'portfolio' && <Portfolio />}
        </div>
      </div>
      
      {/* Mobile toggle */}
      <div className="mobile-toggle fixed bottom-4 right-4 z-50 md:hidden">
        <button 
          className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
          onClick={toggleMobile}
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Index;
