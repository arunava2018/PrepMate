// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSubjects } from "@/db/apiSubjects";
import useFetch from "@/hooks/useFetch";

// lucide-react icons
import {
  Server,
  Database,
  Network,
  Workflow,
  Cpu,
  Code2,
  Terminal,
  Lock,
  Cloud,
  GitBranch,
  Book,
} from "lucide-react";

// map string from DB -> actual icon component
const iconMap = {
  server: Server,
  database: Database,
  network: Network,
  workflow: Workflow,
  cpu: Cpu,
  code2: Code2,
  terminal: Terminal,
  lock: Lock,
  cloud: Cloud,
  gitbranch: GitBranch,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, loading, error, fn: fnSubjects } = useFetch(getSubjects);

  useEffect(() => {
    fnSubjects();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((subj) => {
          // subj.icon will be like "server", "database" etc.
          const Icon = iconMap[subj.icon?.toLowerCase()] || Book;

          return (
            <Card
              key={subj.id}
              onClick={() => navigate(`/subject/${subj.id}`)}
              className="cursor-pointer group transition transform hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="flex flex-col items-center relative">
                <Icon className="w-12 h-12 text-yellow-600 mb-2 group-hover:rotate-6 transition" />
                <CardTitle className="text-xl font-semibold text-center">
                  {subj.name}
                </CardTitle>

                {/* Stylish Question Count Badge */}
                <div className="absolute top-2 right-2">
                  <span className="text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full shadow-md group-hover:scale-110 transition">
                    {subj.question_count} Qs
                  </span>
                </div>
              </CardHeader>

              {/* Subject Description (footer) */}
              <CardContent className="text-center text-gray-600 dark:text-gray-400">
                {subj.description || "No description available."}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
