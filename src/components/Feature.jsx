import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Pencil, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      title: "Curated Q&A Bank",
      desc: "Start with popular interview questions across OS, DBMS, CN and more.",
    },
    {
      icon: <Pencil className="w-8 h-8 text-yellow-500" />,
      title: "Fully Customizable",
      desc: "Add, edit, and organize your own questions with code snippets & images.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Quick Revision",
      desc: "Access your personal question bank anytime for fast preparation.",
    },
  ];

  return (
    <section id="features" className="px-10 py-20 bg-white dark:bg-[#1A1A1A]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-yellow-400">
        Why Choose PrepMate?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <Card key={idx} className="shadow-lg border-none rounded-2xl hover:scale-105 transition">
            <CardHeader className="flex flex-col items-center">
              {f.icon}
              <CardTitle className="mt-4">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600 dark:text-gray-300">
              {f.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
