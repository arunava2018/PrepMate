// SubjectPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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

// Dummy questions (later will fetch from Supabase)
const dummyQuestions = {
  1: [
    {
      tag: "Scheduling",
      questions: [
        {
          id: 101,
          question: "Explain Round Robin Scheduling.",
          answer: "Round Robin is a preemptive scheduling algorithm...",
        },
        {
          id: 102,
          question: "What is FCFS Scheduling?",
          answer: "First Come First Serve is a non-preemptive scheduling...",
        },
      ],
    },
  ],
  2: [
    {
      tag: "SQL",
      questions: [
        {
          id: 201,
          question: "What is normalization?",
          answer: "Normalization is the process of organizing data...",
        },
      ],
    },
  ],
};

const SubjectPage = () => {
  const { id } = useParams();
  const subjectId = parseInt(id);
  const subject = subjects[subjectId];

  return (
    <div className="p-6">
      {/* Subject Header */}
      <div className="flex items-center gap-3 mb-6">
        <subject.icon className="w-10 h-10 text-yellow-600" />
        <h1 className="text-3xl font-bold">{subject.name}</h1>
      </div>

      {/* Accordion */}
      {dummyQuestions[subjectId] ? (
        <Accordion type="single" collapsible>
          {dummyQuestions[subjectId].map((group, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{group.tag}</AccordionTrigger>
              <AccordionContent>
                {group.questions.map((q) => (
                  <div
                    key={q.id}
                    className="mb-4 p-4 border rounded-lg dark:border-neutral-700"
                  >
                    <p className="font-medium">{q.question}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {q.answer}
                    </p>
                    <Button
                      className="mt-2"
                      size="sm"
                      onClick={() => alert("Marked as read")}
                    >
                      Mark as Read
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p>No questions available yet.</p>
      )}
    </div>
  );
};

export default SubjectPage;
