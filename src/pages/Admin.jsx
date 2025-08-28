import { subjects } from "@/subjects";
import subjectSubtopics from "@/subjectSubtopic";
import React, { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    subject: "",
    subtopic: "",
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    setForm({ subject: "", subtopic: "", question: "", answer: "" });
  };

  const availableSubtopics = subjectSubtopics[form.subject] || [];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-lg 
      bg-white dark:bg-black dark:border-gray-800">
      
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Add New Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subject + Subtopic in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subject Dropdown */}
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
              Subject
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg 
                bg-gray-50 dark:bg-gray-900 
                text-gray-900 dark:text-gray-100 
                border-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.name}>
                  {subj.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subtopic Dropdown */}
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
              Subtopic
            </label>
            <select
              name="subtopic"
              value={form.subtopic}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg 
                bg-gray-50 dark:bg-gray-900 
                text-gray-900 dark:text-gray-100 
                border-gray-300 dark:border-gray-700
                focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
                disabled:bg-gray-100 dark:disabled:bg-gray-800
                disabled:text-gray-400 dark:disabled:text-gray-600"
              required
              disabled={!form.subject}
            >
              <option value="">Select Subtopic</option>
              {availableSubtopics.map((topic, idx) => (
                <option key={idx} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Question */}
        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Question
          </label>
          <textarea
            name="question"
            placeholder="Write your question..."
            value={form.question}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg 
              bg-gray-50 dark:bg-gray-900 
              text-gray-900 dark:text-gray-100 
              border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            rows="3"
            required
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Answer
          </label>
          <textarea
            name="answer"
            placeholder="Write the answer..."
            value={form.answer}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg 
              bg-gray-50 dark:bg-gray-900 
              text-gray-900 dark:text-gray-100 
              border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            rows="3"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Save Question
        </button>
      </form>
    </div>
  );
}
