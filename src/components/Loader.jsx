import { motion } from "framer-motion";

export default function Loader() {
  const colors = ["bg-yellow-400", "bg-blue-400", "bg-green-400", "bg-red-400"];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-gray-900 z-50">
      <div className="flex gap-4">
        {colors.map((color, idx) => (
          <motion.div
            key={idx}
            className={`w-5 h-5 rounded-full ${color}`}
            animate={{
              y: ["0%", "-50%", "0%"], // bounce effect
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 0.1,
              delay: idx * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
