// src/components/Subject/SubtopicAccordion.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Circle } from "lucide-react";
import QuestionItem from "./QuestionItem";

const accordionVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  open: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
};

export default function SubtopicAccordion({
  subtopic,
  index,
  questions,
  openSubtopic,
  setOpenSubtopic,
  progressData,
  setProgressData,
  subjectId,
  user,
}) {
  return (
    <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <motion.button
        onClick={() => setOpenSubtopic(openSubtopic === subtopic.id ? null : subtopic.id)}
        className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center text-yellow-700 dark:text-yellow-300 font-bold text-sm">
            {index + 1}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{subtopic.name}</h3>
        </div>
        <motion.div animate={{ rotate: openSubtopic === subtopic.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {openSubtopic === subtopic.id && (
          <motion.div variants={accordionVariants} initial="closed" animate="open" exit="closed" className="overflow-hidden px-6 pb-6">
            {questions.length ? (
              <div className="space-y-3">
                {questions.map((q) => (
                  <QuestionItem
                    key={q.id}
                    question={q}
                    progressData={progressData}
                    setProgressData={setProgressData}
                    subjectId={subjectId}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 p-4 text-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                No questions available for this subtopic.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
