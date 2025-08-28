import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is PrepMate?",
    answer:
      "PrepMate is your personal Computer Science Q&A bank where you can store, organize, and revise interview questions quickly.",
  },
  {
    question: "Can I add my own questions?",
    answer:
      "Yes! You can add your own questions and answers, including formatted text, images, and code snippets for better revision.",
  },
  {
    question: "Do I need to pay to use PrepMate?",
    answer:
      "No, the core features are free. In future, we may introduce premium features like cloud backup and flashcards.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. Your questions and answers are tied to your account, and only you can access them.",
  },
  {
    question: "Can I access PrepMate on mobile?",
    answer:
      "Yes, the web app is fully responsive and works smoothly on mobile, tablet, and desktop.",
  },
  {
    question: "Will there be preloaded questions?",
    answer:
      "Yes, we provide a set of common interview questions for each CS subject to get you started. You can edit or add more anytime.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-20 bg-neutral-50 dark:bg-neutral-900 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-neutral-600 dark:text-neutral-400 mt-2">
          Everything you need to know about PrepMate
        </p>

        {/* Grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
