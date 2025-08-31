import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlState } from "@/context";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FilePlus, BookOpen, ListPlus } from "lucide-react";
import Loader from "@/components/Loader"; // your loader component

export default function AdminDashboard() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // <-- loader state

  const cards = [
    {
      title: "Add Question",
      desc: "Create new questions with subject & subtopic mapping.",
      path: "/admin/addQuestion",
      icon: <FilePlus className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
    },
    {
      title: "Add Subject",
      desc: "Introduce a new subject with its description.",
      path: "/admin/addSubject",
      icon: <BookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
    },
    {
      title: "Add Subtopic",
      desc: "Organize subjects by adding structured subtopics.",
      path: "/admin/addSubtopic",
      icon: <ListPlus className="w-6 h-6 text-green-500 dark:text-green-400" />,
    },
  ];

  const handleNavigate = (path) => {
  setLoading(true); // start loader
  setTimeout(() => {
    navigate(path);
  }, 3000); // 100ms delay
};

  // Show loader while navigating
  if (loading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Hello, {user?.name || "Admin"}
        </h1>
        <span className="bg-red-400 w-fit text-white text-sm px-3 py-1 rounded-full shadow">
          Admin
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigate(card.path)} // <-- use handler
            className="cursor-pointer"
          >
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {card.icon}
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">
                    {card.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {card.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
