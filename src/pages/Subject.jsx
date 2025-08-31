import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import { getSubjectById } from "@/db/apiSubjects";
import { fetchSubtopics } from "@/db/apiSubtopic";
import { fetchQuestions } from "@/db/apiQuestion";
import Loader from "@/components/Loader";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, CheckCircle, Circle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getIcon } from "@/utils/iconmap";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "highlightjs-line-numbers.js";
import "@/styles/hljs-line-numbers.css";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

function Subject() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [questions, setQuestions] = useState({});
  const [completed, setCompleted] = useState(new Set());
  const [openSubtopic, setOpenSubtopic] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const { loading, fn: fnSubjects } = useFetch(getSubjectById);

  // get subject by id
  useEffect(() => {
    fnSubjects(id).then((res) => setSubject(res));
  }, [id]);

  // fetch subtopics
  useEffect(() => {
    if (!subject) return;
    fetchSubtopics({ subject: subject.name }).then(setSubtopics);
  }, [subject]);

  // fetch questions for each subtopic
  useEffect(() => {
    if (!subtopics.length) return;

    const fetchAll = async () => {
      const allQ = {};
      for (let st of subtopics) {
        allQ[st.id] = await fetchQuestions(st.id);
      }
      setQuestions(allQ);
    };
    fetchAll();
  }, [subtopics]);

  // re-run highlighting + line numbers when questions update
  useEffect(() => {
    hljs.highlightAll();
    document.querySelectorAll("pre code").forEach((block) => {
      try {
        hljs.lineNumbersBlock(block);
      } catch (e) {
        console.warn("Line numbers skipped:", e);
      }
    });
  }, [questions]);

  if (loading) return <Loader />;
  if (!subject) return <p>Loading or subject not found</p>;
  
  const Icon = getIcon(subject.icon);

  // progress calculation
  const totalQ = Object.values(questions).flat().length;
  const completedQ = completed.size;
  const progress = totalQ ? (completedQ / totalQ) * 100 : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const accordionVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="max-w-5xl mx-auto px-6 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg"
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {subject.name}
          </h1>
        </div>

        {/* Enhanced Progress Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Learning Progress
            </h2>
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 mb-2 bg-gray-200 dark:bg-gray-700" 
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {completedQ} of {totalQ} questions completed
          </p>
        </div>
      </motion.div>

      {/* Enhanced Accordion */}
      <motion.div variants={itemVariants} className="space-y-4">
        {subtopics.map((sub, index) => (
          <motion.div
            key={sub.id}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Subtopic Header - Removed dark mode hover */}
            <motion.button
              onClick={() => setOpenSubtopic(openSubtopic === sub.id ? null : sub.id)}
              className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center text-yellow-700 dark:text-yellow-300 font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {sub.name}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: openSubtopic   === sub.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </motion.button>

            {/* Subtopic Content */}
            <AnimatePresence>
              {openSubtopic === sub.id && (
                <motion.div
                  variants={accordionVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    {questions[sub.id]?.length ? (
                      <div className="space-y-3">
                        {questions[sub.id].map((q) => (
                          <motion.div
                            key={q.id}
                            className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {/* Question Header - Removed dark mode hover */}
                            <motion.button
                              onClick={() => setOpenQuestion(openQuestion === q.id ? null : q.id)}
                              className="w-full px-5 py-4 text-left flex items-center justify-between transition-colors duration-200"
                            >
                              <div className="flex items-center gap-3">
                                {completed.has(q.id) ? (
                                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                                <span className="font-medium text-gray-800 dark:text-gray-200 pr-4">
                                  {q.question_text}
                                </span>
                              </div>
                              <motion.div
                                animate={{ rotate: openQuestion === q.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                              </motion.div>
                            </motion.button>

                            {/* Question Content */}
                            <AnimatePresence>
                              {openQuestion === q.id && (
                                <motion.div
                                  variants={accordionVariants}
                                  initial="closed"
                                  animate="open"
                                  exit="closed"
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 pb-5">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
                                      <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[
                                          rehypeRaw,
                                          [rehypeHighlight, { detect: true, ignoreMissing: true }],
                                        ]}
                                        components={{
                                          p: ({ node, ...props }) => (
                                            <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4" {...props} />
                                          ),
                                          strong: ({ node, ...props }) => (
                                            <strong className="font-semibold text-yellow-600 dark:text-yellow-400" {...props} />
                                          ),
                                          em: ({ node, ...props }) => (
                                            <em className="italic text-gray-600 dark:text-gray-400" {...props} />
                                          ),
                                          blockquote: ({ node, ...props }) => (
                                            <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4 bg-yellow-50 dark:bg-yellow-900/20 py-2 rounded-r-lg" {...props} />
                                          ),
                                          a: ({ node, ...props }) => (
                                            <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                                          ),
                                          ul: ({ node, ...props }) => (
                                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4" {...props} />
                                          ),
                                          ol: ({ node, ...props }) => (
                                            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4" {...props} />
                                          ),
                                          code: ({ inline, className, children, ...props }) => {
                                            return inline ? (
                                              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>
                                                {children}
                                              </code>
                                            ) : (
                                              <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto text-sm my-4">
                                                <code className={className} {...props}>
                                                  {children}
                                                </code>
                                              </pre>
                                            );
                                          },
                                          table: ({ node, ...props }) => (
                                            <div className="overflow-x-auto my-4">
                                              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props} />
                                            </div>
                                          ),
                                          th: ({ node, ...props }) => (
                                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-left font-semibold" {...props} />
                                          ),
                                          td: ({ node, ...props }) => (
                                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2" {...props} />
                                          ),
                                          img: ({ node, ...props }) => (
                                            <img className="max-w-full h-auto rounded-lg my-4 mx-auto shadow-sm" {...props} />
                                          ),
                                        }}
                                      >
                                        {q.answer_text}
                                      </ReactMarkdown>

                                      {/* Enhanced Complete Button */}
                                      <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Button
                                          size="sm"
                                          variant={completed.has(q.id) ? "default" : "outline"}
                                          className={`mt-4 transition-all duration-300 cursor-pointer ${
                                            completed.has(q.id)
                                              ? "bg-green-500 hover:bg-green-600 text-white shadow-md"
                                              : "border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white dark:border-green-400"
                                          }`}
                                          onClick={() => {
                                            setCompleted((prev) => {
                                              const next = new Set(prev);
                                              next.has(q.id) ? next.delete(q.id) : next.add(q.id);
                                              return next;
                                            });
                                          }}
                                        >
                                          {completed.has(q.id) ? (
                                            <span className="flex items-center gap-2">
                                              <CheckCircle className="w-4 h-4" />
                                              Completed
                                            </span>
                                          ) : (
                                            <span className="flex items-center gap-2">
                                              <Circle className="w-4 h-4" />
                                              Mark as Complete
                                            </span>
                                          )}
                                        </Button>
                                      </motion.div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 p-4 text-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                        No questions available for this subtopic.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Subject;
