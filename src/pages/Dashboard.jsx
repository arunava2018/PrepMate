import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSubjects } from "@/db/apiSubjects";
import { getProgress } from "@/db/apiProgress";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/Loader";
import { getIcon } from "@/utils/iconmap";
import { motion } from "framer-motion";
import { UrlState } from "@/context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = UrlState();
  const {
    data: subjects,
    loading,
    error,
    fn: fnSubjects,
  } = useFetch(getSubjects);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    fnSubjects();
  }, []);

  useEffect(() => {
    if (!user || !subjects?.length) return;

    const fetchProgress = async () => {
      const newMap = {};
      await Promise.all(
        subjects.map(async (subj) => {
          const data = await getProgress(user.id, subj.id);
          newMap[subj.id] = data?.progress || 0;
        })
      );
      setProgressMap(newMap);
    };

    fetchProgress();
  }, [user, subjects]);

  const slugify = (text) =>
    text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .trim();

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects?.map((subj) => {
          const Icon = getIcon(subj.icon);
          const progress = progressMap[subj.id] || 0;

          return (
            <Card
              key={subj.id}
              onClick={() =>
                navigate(`/subject/${slugify(subj.name)}/${subj.id}`)
              }
              className="cursor-pointer group transition transform hover:scale-105 hover:shadow-xl rounded-2xl"
            >
              <CardHeader className="flex flex-col items-center relative py-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full shadow-md mb-3">
                  <Icon className="w-10 h-10 text-yellow-600 dark:text-yellow-300" />
                </div>
                <CardTitle className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
                  {subj.name}
                </CardTitle>

                <div className="absolute top-4 right-4">
                  <span className="text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full shadow-md">
                    {subj.question_count} Qs
                  </span>
                </div>
              </CardHeader>

              <CardContent className="text-center text-gray-600 dark:text-gray-400">
                <p className="mb-3">
                  {subj.description || "No description available."}
                </p>

                {/* Progress Bar */}
                <div className="w-full flex flex-col gap-1">
                  <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <span>Progress</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
                    <motion.div
                      className="bg-yellow-500 h-5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
