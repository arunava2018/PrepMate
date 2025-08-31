import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../theme/Themeprovides";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UrlState } from "../context";
import { signout } from "@/db/apiAuth";
import useFetch from "@/hooks/useFetch";
import { isAdminUser } from "@/db/apiAdmin";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, fetchUser } = UrlState();
  const isAuthenticated = !!user?.id;

  // Check if user is admin
  useEffect(() => {
    if (!user?.id) return;

    const checkAdmin = async () => {
      const admin = await isAdminUser(user?.id);
      setIsAdmin(admin);
    };

    checkAdmin();
  }, [user]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { loading, fn: fnLogOut } = useFetch(signout);

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 backdrop-blur-md transition-colors 
      bg-white/80 dark:bg-neutral-900/80 ${scrolled ? "shadow-lg" : "shadow-sm"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 hover:scale-105 transition-transform"
        >
          PrepMate
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/auth/login"
                className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                Login
              </Link>
              <Link to="/auth/signup">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-4">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="transition-transform">
                    {user?.profile_photo ? (
                      <AvatarImage src={user.profile_photo} alt={user.name} />
                    ) : (
                      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    )}
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-bold">Hi, {user?.name}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors rounded-md">
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors rounded-md">
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors rounded-md">
                    <Link to="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    fnLogOut().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                  className="text-red-500 focus:text-red-500 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 transition-colors rounded-md"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Theme toggle */}
          <motion.button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-6 py-4 space-y-4"
          >
            <a
              href="#features"
              className="block hover:text-yellow-600 dark:hover:text-yellow-400 font-medium transition-transform hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#faq"
              className="block hover:text-yellow-600 dark:hover:text-yellow-400 font-medium transition-transform hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  className="block hover:text-yellow-600 dark:hover:text-yellow-400 transition-transform hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link to="/auth/signup" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="space-y-2 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                <p className="font-medium text-neutral-700 dark:text-neutral-300">
                  {user?.name}
                </p>
                <Link
                  to="/dashboard"
                  className="block hover:text-yellow-600 dark:hover:text-yellow-400 transition-transform hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block hover:text-yellow-600 dark:hover:text-yellow-400 transition-transform hover:scale-105"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    fnLogOut().then(() => {
                      fetchUser();
                      navigate("/");
                      setMenuOpen(false);
                    });
                  }}
                  className="block text-red-500 hover:text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Theme toggle */}
            <motion.button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition w-full justify-center"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
