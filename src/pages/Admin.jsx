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
    { title: "Add Question", desc: "Create new questions with subject & subtopic mapping.", path: "/admin/addQuestion", icon: <FilePlus className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />, bgColor: "bg-yellow-50 dark:bg-yellow-900/10", borderColor: "hover:border-yellow-200 dark:hover:border-yellow-800" },
    { title: "Add Subject", desc: "Introduce a new subject with its description.", path: "/admin/addSubject", icon: <BookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />, bgColor: "bg-blue-50 dark:bg-blue-900/10", borderColor: "hover:border-blue-200 dark:hover:border-blue-800" },
    { title: "Add Subtopic", desc: "Organize subjects by adding structured subtopics.", path: "/admin/addSubtopic", icon: <ListPlus className="w-6 h-6 text-green-500 dark:text-green-400" />, bgColor: "bg-green-50 dark:bg-green-900/10", borderColor: "hover:border-green-200 dark:hover:border-green-800" },
  ];

  const handleNavigate = (path) => {
    setLoading(true);
    navigate(path); // Navigate immediately to avoid long timeout
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      {/* Header */}
      <motion.div className="flex items-center gap-4 mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Hello, {user?.name || "Admin"}</h1>
        </div>
        <motion.span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm px-4 py-2 rounded-full shadow-lg font-medium" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          Admin Panel
        </motion.span>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15, duration: 0.4 }} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => handleNavigate(card.path)} className="cursor-pointer">
            <Card className={`h-full shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${card.borderColor}`}>
              <CardHeader className="p-6 flex flex-col gap-4">
                <motion.div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 inline-block" whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                  {card.icon}
                </motion.div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{card.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">{card.desc}</CardDescription>
                </div>
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">Click to continue →</span>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
