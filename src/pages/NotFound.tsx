
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NotFound = () => {
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    toast({
      title: "Page not found",
      description: `The page at ${location.pathname} doesn't exist.`,
      variant: "destructive",
    });
  }, [location.pathname, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-6">
            <AlertTriangle className="h-20 w-20 text-red-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. The URL <span className="font-mono bg-muted px-2 py-1 rounded text-sm">{location.pathname}</span> doesn't exist.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 pt-6">
          <Button asChild className="w-full gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Please check the URL or navigate to one of the available pages from the navigation menu.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
