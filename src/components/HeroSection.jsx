import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-yellow-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      {/* Heading */}
      <h1 className="w-full text-4xl sm:text-6xl font-extrabold text-neutral-900 dark:text-white mb-6">
        {!typingDone ? (
          <TypeAnimation
            sequence={[
              "Ace Your Next Interview 🚀",
              1500,
              "Revise Smarter, Not Harder 💡",
              1500,
              "Your one stop interview preparation solution📚",
              () => setTypingDone(true), // when typing is finished
            ]}
            wrapper="span"
            speed={60}
            cursor={true}
            repeat={0}
          />
        ) : (
          <span>Your one stop interview preparation solution📚</span>
        )}
      </h1>

      {/* Subheading fades in immediately (not waiting for typingDone) */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-2xl text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8"
      >
        PrepMate helps you organize and revise Computer Science concepts with
        ease. Create your own question bank and never miss a beat in your
        interview prep.
      </motion.p>

      {/* Buttons fade in slightly later */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex gap-4"
      >
        <Link to="/dashboard">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-lg">
            Explore
          </Button>
        </Link>
        <Link to="#features">
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
