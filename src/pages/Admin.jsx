import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlState } from "@/context";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FilePlus, BookOpen, ListPlus, Shield } from "lucide-react";
import Loader from "@/components/Loader";

export default function AdminDashboard() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      title: "Add Question",
      desc: "Create new questions with subject & subtopic mapping.",
      path: "/admin/addQuestion",
      icon: <FilePlus className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/10",
      borderColor: "hover:border-yellow-200 dark:hover:border-yellow-800",
    },
    {
      title: "Add Subject",
      desc: "Introduce a new subject with its description.",
      path: "/admin/addSubject",
      icon: <BookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "hover:border-blue-200 dark:hover:border-blue-800",
    },
    {
      title: "Add Subtopic",
      desc: "Organize subjects by adding structured subtopics.",
      path: "/admin/addSubtopic",
      icon: <ListPlus className="w-6 h-6 text-green-500 dark:text-green-400" />,
      bgColor: "bg-green-50 dark:bg-green-900/10",
      borderColor: "hover:border-green-200 dark:hover:border-green-800",
    },
  ];

  const handleNavigate = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 3000); 
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      {/* Enhanced Header */}
      <motion.div 
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Hello, {user?.name || "Admin"}
          </h1>
        </div>
        <motion.span 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-4 py-2 rounded-full shadow-lg font-medium"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Admin Panel
        </motion.span>
      </motion.div>

      {/* Enhanced Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.4 }}
            whileHover={{ 
              scale: 1.02,
              y: -4,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate(card.path)}
            className="cursor-pointer group"
          >
            <Card className={`h-full shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${card.borderColor} overflow-hidden`}>
              <div className={`absolute inset-0 ${card.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardHeader className="relative z-10 p-6">
                <div className="flex items-start gap-4 mb-3">
                  <motion.div
                    className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {card.icon}
                  </motion.div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-gray-800 dark:group-hover:text-gray-50 transition-colors duration-300">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                      {card.desc}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Subtle action indicator */}
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Click to continue →
                  </span>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
