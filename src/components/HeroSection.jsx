import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <section
      className="
        relative min-h-screen flex flex-col justify-center items-center text-center px-6
        bg-gradient-to-r from-yellow-50 via-yellow-100 to-white
        dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900
        animate-gradient-slow overflow-hidden
      "
    >
      {/* Light mode blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 dark:hidden animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full opacity-20 dark:hidden animate-pulse-slow"></div>

      {/* Dark mode blobs */}
      <div className="absolute top-12 left-8 w-32 h-32 bg-neutral-700 rounded-full opacity-20 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>
      <div className="absolute bottom-24 right-16 w-48 h-48 bg-neutral-600 rounded-full opacity-15 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>

      {/* Heading */}
      <h1
        className="
          w-full text-4xl sm:text-6xl font-extrabold text-neutral-900 dark:text-white
          mb-6 leading-tight relative z-10
        "
      >
        {!typingDone ? (
          <TypeAnimation
            sequence={[
              "Land Your Dream Tech Job Faster 🚀",
              1500,
              "Boost Your Interview Success Rate 💡",
              1500,
              "PrepMate: Your Ultimate CS Interview Companion 📚",
              () => setTypingDone(true),
            ]}
            wrapper="span"
            speed={60}
            cursor={true}
            repeat={0}
          />
        ) : (
          <span>PrepMate: Your Ultimate CS Interview Companion 📚</span>
        )}
      </h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-2xl text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-12 relative z-10"
      >
        Unlock your full potential with PrepMate — the expertly curated collection of core Computer Science questions, smartly organized for efficient revision.  
        Whether you're a beginner or aiming for a top tech role, PrepMate saves you time, sharpens your skills, and builds interview confidence so you can{" "}
        <span className="font-bold">stand out</span> and <span className="font-bold">succeed</span>.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-col sm:flex-row gap-6 relative z-10"
      >
        <Link to="/dashboard">
          <Button
            className="
              bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full text-xl font-semibold
              shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 active:translate-y-0
              flex items-center justify-center gap-2
            "
            aria-label="Explore our content"
          >
            Explore Our Content
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </Link>

        <Link to="/features">
          <Button
            variant="outline"
            className="
              border-yellow-600 text-yellow-600 dark:text-yellow-400 px-8 py-4 rounded-full text-xl font-semibold
              shadow-md hover:shadow-lg hover:bg-yellow-50 dark:hover:bg-neutral-800 transition
            "
            aria-label="Learn more about PrepMate features"
          >
            Learn More
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
