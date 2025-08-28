// RequireAuth.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UrlState } from "@/context";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function RequireAuth({ children }) {
  const { user } = UrlState();
  const isAuthenticated = !!user?.id;

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => setRedirect(true), 2500); // 2.5s delay
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    if (redirect) return <Navigate to="/auth/login" replace />;
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You must be logged in to access this page. Redirecting to login...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return children;
}
