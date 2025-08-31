import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const { loading, fn: fnSubjects } = useFetch(getSubjectById);

  // get subject by id
  useEffect(() => {
    fnSubjects(id).then((res) => {
      setSubject(res);
    });
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-7 text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
        <Icon className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
        {subject.name}
      </h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-3" />
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {completedQ} / {totalQ} completed
        </p>
      </div>

      {/* Accordion for subtopics */}
      <Accordion type="single" collapsible className="space-y-4">
        {subtopics.map((sub) => (
          <AccordionItem key={sub.id} value={sub.id}>
            <AccordionTrigger className="font-semibold text-lg">
              {sub.name}
            </AccordionTrigger>
            <AccordionContent>
              {questions[sub.id]?.length ? (
                <div className="space-y-4">
                  {questions[sub.id].map((q) => (
                    <div
                      key={q.id}
                      className="p-4 border rounded-lg dark:border-neutral-700"
                    >
                      {/* Question */}
                      <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                        {q.question_text}
                      </p>

                      {/* React Markdown */}
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[
                          rehypeRaw,
                          [
                            rehypeHighlight,
                            { detect: true, ignoreMissing: true },
                          ],
                        ]}
                        components={{
                          p: ({ node, ...props }) => (
                            <p
                              className="leading-relaxed text-neutral-700 dark:text-neutral-300 mt-2"
                              {...props}
                            />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-semibold text-yellow-600 dark:text-yellow-400"
                              {...props}
                            />
                          ),
                          em: ({ node, ...props }) => (
                            <em
                              className="italic text-neutral-600 dark:text-neutral-400"
                              {...props}
                            />
                          ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-yellow-500 pl-4 italic text-neutral-700 dark:text-neutral-300 mt-3"
                              {...props}
                            />
                          ),
                          a: ({ node, ...props }) => (
                            <a
                              className="text-yellow-600 dark:text-yellow-400 underline hover:opacity-80"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300 mt-2"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal list-inside space-y-1 text-neutral-700 dark:text-neutral-300 mt-2"
                              {...props}
                            />
                          ),
                          code: ({ inline, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            return inline ? (
                              <code
                                className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-mono"
                                {...props}
                              >
                                {children}
                              </code>
                            ) : (
                              <pre className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-x-auto text-sm">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </pre>
                            );
                          },
                          table: ({ node, ...props }) => (
                            <table
                              className="table-auto border-collapse border border-neutral-400 dark:border-neutral-600 my-3"
                              {...props}
                            />
                          ),
                          th: ({ node, ...props }) => (
                            <th
                              className="border border-neutral-400 dark:border-neutral-600 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-left"
                              {...props}
                            />
                          ),
                          td: ({ node, ...props }) => (
                            <td
                              className="border border-neutral-400 dark:border-neutral-600 px-3 py-1"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {q.answer_text}
                      </ReactMarkdown>

                      {/* Mark complete button */}
                      <Button
                        size="sm"
                        variant={completed.has(q.id) ? "secondary" : "outline"}
                        className="mt-3 cursor-pointer"
                        onClick={() => {
                          setCompleted((prev) => {
                            const next = new Set(prev);
                            next.has(q.id) ? next.delete(q.id) : next.add(q.id);
                            return next;
                          });
                        }}
                      >
                        {completed.has(q.id) ? "Completed" : "Mark as Complete"}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500">
                  No questions available.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Subject;
