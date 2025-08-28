import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Subject from "./pages/Subject";
import { ThemeProvider } from "./theme/Themeprovides";
import Dashboard from "./pages/Dashboard";
import Addquestion from "./pages/Addquestion";

const router = createBrowserRouter([
  {
    element: <AppLayout />, // ✅ Wraps Header + Footer
    children: [
      { path: "/", element: <Landing /> },
      { path: "/auth/:mode", element: <Auth /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/add-question", element: <Addquestion /> },
      { path: "/subject/:id", element: <Subject /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
