// src/components/Subject/QuestionItem.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Circle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { markQuestionAsRead, unmarkQuestion, getProgress } from "@/db/apiProgress";
import { useState } from "react";

const accordionVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  open: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
};

export default function QuestionItem({ question, progressData, setProgressData, subjectId, user }) {
  const [open, setOpen] = useState(false);
  const isRead = progressData.completed_questions.includes(question.id);

  const handleMark = async () => {
    if (!user) return;
    const success = await markQuestionAsRead(user.id, subjectId, question.id);
    if (success) {
      const data = await getProgress(user.id, subjectId);
      setProgressData(data);
      setOpen(false);
    }
  };

  const handleUnmark = async () => {
    if (!user) return;
    const success = await unmarkQuestion(user.id, subjectId, question.id);
    if (success) {
      const data = await getProgress(user.id, subjectId);
      setProgressData(data);
    }
  };

  return (
    <motion.div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm">
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 text-left flex items-center justify-between transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          {isRead ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-400" />}
          <span className="font-medium text-gray-800 dark:text-gray-200 pr-4">{question.question_text}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div variants={accordionVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden px-5 pb-5">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
                components={{
                  p: ({ node, ...props }) => <p className="leading-relaxed text-gray-700 dark:text-gray-300 mb-4" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold text-yellow-600 dark:text-yellow-400" {...props} />,
                  em: ({ node, ...props }) => <em className="italic text-gray-600 dark:text-gray-400" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4 bg-yellow-50 dark:bg-yellow-900/20 py-2 rounded-r-lg" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                  code: ({ inline, className, children, ...props }) =>
                    inline ? (
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="p-4 bg-gray-900 rounded-lg overflow-x-auto text-sm my-4">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-semibold" {...props} />,
                  tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-200 dark:divide-gray-600" {...props} />,
                  tr: ({ node, ...props }) => <tr className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-700/40 dark:odd:bg-gray-800/40" {...props} />,
                  th: ({ node, ...props }) => <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-600" {...props} />,
                  td: ({ node, ...props }) => <td className="px-4 py-2 border border-gray-300 dark:border-gray-600" {...props} />,
                  img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-lg my-4 mx-auto shadow-sm" {...props} />,
                }}
              >
                {question.answer_text}
              </ReactMarkdown>

              <div className="flex items-center gap-4 mt-4">
                {!isRead ? (
                  <motion.button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded cursor-pointer" onClick={handleMark}>
                    <CheckCircle className="w-4 h-4" /> Mark as Read
                  </motion.button>
                ) : (
                  <motion.button className="flex items-center gap-2 border border-gray-400 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={handleUnmark}>
                    <CheckCircle className="w-4 h-4 text-green-500" /> Unmark
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
