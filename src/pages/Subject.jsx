import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Subject() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("questions")
          .select("*")
          .eq("subject_id", id);

        if (error) throw error;
        setQuestions(data || []);
      } catch (err) {
        console.error("Error fetching questions:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-neutral-500" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      {questions.length === 0 ? (
        <p className="text-center text-neutral-500 dark:text-neutral-400">
          No questions found for this subject.
        </p>
      ) : (
        questions.map((q) => (
          <Card key={q.id} className="shadow-md">
            <CardContent className="p-5 space-y-3">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {q.question_text}
              </h2>

              <ReactMarkdown
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
                  code: ({ inline, ...props }) =>
                    inline ? (
                      <code
                        className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-mono"
                        {...props}
                      />
                    ) : (
                      <pre className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-x-auto text-sm">
                        <code {...props} />
                      </pre>
                    ),

                  // ✅ Table rendering
                  table: ({ node, ...props }) => (
                    <table
                      className="w-full border border-neutral-300 dark:border-neutral-700 border-collapse my-4"
                      {...props}
                    />
                  ),
                  thead: ({ node, ...props }) => (
                    <thead
                      className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                      {...props}
                    />
                  ),
                  tbody: ({ node, ...props }) => <tbody {...props} />,
                  tr: ({ node, ...props }) => (
                    <tr
                      className="border-b border-neutral-300 dark:border-neutral-700 last:border-0"
                      {...props}
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="px-3 py-2 text-left font-semibold border border-neutral-300 dark:border-neutral-700"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="px-3 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                      {...props}
                    />
                  ),
                }}
              >
                {q.answer_text}
              </ReactMarkdown>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
