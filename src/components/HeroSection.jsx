import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6
      bg-gradient-to-r from-yellow-50 via-yellow-100 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900
      animate-gradient-slow overflow-hidden"
    >
      {/* Light mode blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 dark:hidden animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full opacity-20 dark:hidden animate-pulse-slow"></div>

      {/* Dark mode blobs */}
      <div className="absolute top-12 left-8 w-32 h-32 bg-neutral-700 rounded-full opacity-20 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>
      <div className="absolute bottom-24 right-16 w-48 h-48 bg-neutral-600 rounded-full opacity-15 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>

      {/* Heading */}
      <h1 className="w-full text-4xl sm:text-6xl font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight relative z-10">
        {!typingDone ? (
          <TypeAnimation
            sequence={[
              "Ace Your Next Interview 🚀",
              1500,
              "Revise Smarter, Not Harder 💡",
              1500,
              "Curated CS Question Bank 📚",
              () => setTypingDone(true),
            ]}
            wrapper="span"
            speed={60}
            cursor={true}
            repeat={0}
          />
        ) : (
          <span>Curated CS Question Bank 📚</span>
        )}
      </h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-2xl text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8 relative z-10"
      >
        PrepMate offers a structured collection of curated core <span className="font-bold">Computer Fundamentals</span> questions,
        organized by subjects and subtopics — helping you focus on what really
        matters for interviews and exams.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex gap-4 relative z-10"
      >
        <Link to="/dashboard">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition">
            Explore our Content
          </Button>
        </Link>
        <Link to="/features">
          <Button
            variant="outline"
            className="border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-neutral-800 px-6 py-3 rounded-full text-lg"
          >
            Learn More
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
