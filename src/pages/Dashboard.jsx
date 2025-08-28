// Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Server, Database, Network, Workflow, Cpu, Code2, Terminal, Lock, Cloud, GitBranch } from "lucide-react";

const subjects = [
  { 
    id: 1, 
    name: "Operating Systems", 
    questionCount: 30, 
    icon: Server, 
    footer: "Master process scheduling, memory mgmt & concurrency." 
  },
  { 
    id: 2, 
    name: "DBMS", 
    questionCount: 25, 
    icon: Database, 
    footer: "SQL, normalization & transactions made simple." 
  },
  { 
    id: 3, 
    name: "Computer Networks", 
    questionCount: 28, 
    icon: Network, 
    footer: "Protocols, routing & OSI layers explained." 
  },
  { 
    id: 4, 
    name: "Algorithms", 
    questionCount: 32, 
    icon: Workflow, 
    footer: "DSA patterns & problem-solving strategies." 
  },
  { 
    id: 5, 
    name: "Computer Architecture", 
    questionCount: 20, 
    icon: Cpu, 
    footer: "Understand CPU pipelines & instruction sets." 
  },
  { 
    id: 6, 
    name: "Programming Languages", 
    questionCount: 22, 
    icon: Code2, 
    footer: "Dive into paradigms, compilers & interpreters." 
  },
  { 
    id: 7, 
    name: "Software Engineering", 
    questionCount: 18, 
    icon: Terminal, 
    footer: "SDLC, design patterns & agile principles." 
  },
  { 
    id: 8, 
    name: "Cyber Security", 
    questionCount: 26, 
    icon: Lock, 
    footer: "Explore cryptography & security practices." 
  },
  { 
    id: 9, 
    name: "Cloud Computing", 
    questionCount: 24, 
    icon: Cloud, 
    footer: "Virtualization, scaling & modern infra." 
  },
  { 
    id: 10, 
    name: "Version Control (Git)", 
    questionCount: 15, 
    icon: GitBranch, 
    footer: "Branching, merging & collaboration essentials." 
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects.map((subj) => (
          <Card
            key={subj.id}
            onClick={() => navigate(`/subject/${subj.id}`)}
            className="cursor-pointer group transition transform hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="flex flex-col items-center relative">
              <subj.icon className="w-12 h-12 text-yellow-600 mb-2 group-hover:rotate-6 transition" />
              <CardTitle className="text-xl font-semibold text-center">
                {subj.name}
              </CardTitle>

              {/* Stylish Question Count Badge */}
              <div className="absolute top-2 right-2">
                <span className="text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full shadow-md group-hover:scale-110 transition">
                  {subj.questionCount} Qs
                </span>
              </div>
            </CardHeader>

            <CardContent className="text-center text-gray-600 dark:text-gray-400">
              {subj.footer}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
