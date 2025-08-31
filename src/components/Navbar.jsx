import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, LogOut, User, Settings, Shield } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { loading, fn: fnLogOut } = useFetch(signout);

  const handleLogout = async () => {
    await fnLogOut();
    fetchUser();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300
      bg-white/85 dark:bg-neutral-900/85 border-b border-neutral-200/50 dark:border-neutral-700/50 ${
        scrolled ? "shadow-lg bg-white/95 dark:bg-neutral-900/95" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
          >
            PrepMate
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                <Link
                  to="/auth/login"
                  className="hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors font-medium"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/auth/signup">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-200">
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  className="focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 rounded-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="transition-all duration-200 hover:shadow-md">
                    {user?.profile_photo ? (
                      <AvatarImage src={user.profile_photo} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 font-semibold">
                        {user?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {user?.profile_photo ? (
                        <AvatarImage src={user.profile_photo} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-sm">
                          {user?.name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md">
                    <Settings className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md">
                      <Shield className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-yellow-600 dark:text-yellow-400 font-medium">Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center gap-2 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 cursor-pointer px-3 py-2 rounded-md"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  {loading ? "Signing out..." : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <motion.button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {isDark ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} className="text-neutral-600" />
              )}
            </motion.div>
          </motion.button>
        </div>
        <motion.button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
          onClick={() => setMenuOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </motion.button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 px-6 py-6 space-y-4"
          >
            {!isAuthenticated ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/auth/login"
                    className="block hover:text-yellow-600 dark:hover:text-yellow-400 font-medium transition-colors py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/auth/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-md">
                      Sign Up
                    </Button>
                  </Link>
                </motion.div>
              </>
            ) : (
              <motion.div
                className="space-y-3 border-t border-neutral-200 dark:border-neutral-700 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 pb-3">
                  <Avatar className="h-10 w-10">
                    {user?.profile_photo ? (
                      <AvatarImage src={user.profile_photo} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300">
                        {user?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{user?.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.email}</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors py-2 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors py-2 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Profile
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors py-2 font-medium text-yellow-600 dark:text-yellow-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center gap-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors py-2 font-medium disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  {loading ? "Signing out..." : "Sign Out"}
                </button>
              </motion.div>
            )}

            {/* Enhanced Mobile Theme toggle */}
            <motion.button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all w-full font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun size={18} className="text-yellow-500" />
                ) : (
                  <Moon size={18} className="text-neutral-600" />
                )}
              </motion.div>
              <span>{isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
