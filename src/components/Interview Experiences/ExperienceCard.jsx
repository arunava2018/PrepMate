import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { 
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { 
  Calendar, 
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
  User
} from "lucide-react";
import { getUserById } from "@/db/apiAuth";

function ExperienceCard({ experience, index }) {
  const [userName, setUserName] = useState("");
  const {
    id,
    role,
    content,
    created_at,
    linkedin_url,
    github_url,
    usersProfile,
    user_id
  } = experience;

  useEffect(() => {
    getUserById(user_id).then((res) => {
      setUserName(res?.name || "Anonymous User");
    }).catch(() => {
      setUserName("Anonymous User");
    });
  }, [user_id]);

  // Custom components for ReactMarkdown
  const markdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-md !mt-4 !mb-4"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code 
          className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-amber-700 dark:text-amber-300" 
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-3 border-b border-amber-200 dark:border-gray-700 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-3 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-3 text-gray-700 dark:text-gray-300 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-3 text-gray-700 dark:text-gray-300 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber-400 bg-amber-50 dark:bg-amber-900/20 pl-4 py-2 my-3 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 underline"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-3">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-200 dark:border-gray-700 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 text-left font-semibold text-gray-800 dark:text-gray-200 text-sm">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 text-sm">
        {children}
      </td>
    ),
  };

  return (
    <AccordionItem
      value={`${id}-${index}`}
      className="border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
    >
      <AccordionTrigger className="px-5 py-4 hover:no-underline group hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-t-lg">
        <div className="flex items-start justify-between w-full gap-4">
          {/* Left Side: Experience Number, User Name, and Role */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold flex-shrink-0">
              {index + 1}
            </div>
            <div className="min-w-0 flex-1 text-left">
              {/* User Name - Primary */}
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="truncate" title={userName}>
                  {userName || "Loading..."}
                </span>
              </h3>
              
              {/* Role - Secondary */}
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Briefcase className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span className="truncate" title={role || "Position Not Specified"}>
                  {role || "Position Not Specified"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-5 pb-5">
        <div className="pt-2 space-y-4">
          {/* Experience Content */}
          {content ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="italic text-gray-500 dark:text-gray-400 text-center py-4">
              No details provided for this experience.
            </p>
          )}

          {/* Links */}
          {(linkedin_url || github_url) && (
            <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              {linkedin_url && (
                <a
                  href={linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {github_url && (
                <a
                  href={github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default ExperienceCard;
