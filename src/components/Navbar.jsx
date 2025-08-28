import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../theme/ThemeProvides";
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

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState({
    loggedIn: true,
    name: "Arunava Banerjee",
    avatar: "https://github.com/arunava2018.png", // fallback if no image
  });

  return (
    <nav className="relative top-0 left-0 w-full z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-600 dark:text-yellow-400"
        >
          PrepMate
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
      

          {!user.loggedIn ? (
            <>
              <Link to="/auth/login" className="hover:text-yellow-600 dark:hover:text-yellow-400">
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
                <button className="focus:outline-none">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-bold">Hi. {user.name}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    // signout logic here
                    setUser({ loggedIn: false });
                  }}
                  className="text-red-500 focus:text-red-500 cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Theme toggle */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-neutral-200 dark:border-neutral-700 hover:scale-105 transition"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-6 py-4 space-y-4"
          >
            <a
              href="#features"
              className="block hover:text-yellow-600 dark:hover:text-yellow-400 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#faq"
              className="block hover:text-yellow-600 dark:hover:text-yellow-400 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>

            {!user.loggedIn ? (
              <>
                <Link
                  to="/auth/login"
                  className="block hover:text-yellow-600 dark:hover:text-yellow-400"
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
              <div className="space-y-2">
                <p className="font-medium text-neutral-700 dark:text-neutral-300">
                  {user.name}
                </p>
                <Link
                  to="/dashboard"
                  className="block hover:text-yellow-600 dark:hover:text-yellow-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block hover:text-yellow-600 dark:hover:text-yellow-400"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setUser({ loggedIn: false });
                    setMenuOpen(false);
                  }}
                  className="block text-red-500 hover:text-red-600"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Theme toggle */}
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition w-full justify-center"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
