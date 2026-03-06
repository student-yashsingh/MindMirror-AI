import { motion } from "framer-motion";

export default function JournalCard({entry}){

  const emotionColors={
    happy:"text-green-400",
    sad:"text-blue-400",
    stressed:"text-red-400",
    neutral:"text-gray-400"
  };

  return(

    <motion.div
      whileHover={{scale:1.05}}
      className="bg-gradient-to-br from-white/5 to-white/0
      border border-white/10
      backdrop-blur-xl
      p-6 rounded-xl"
    >

      <p className="text-gray-400 text-sm mb-2">
        {new Date(entry.created_at).toLocaleDateString()}
      </p>

      <p className="text-sm mb-4 text-gray-200 line-clamp-4">
        {entry.text}
      </p>

      <div className="flex justify-between text-sm">

        <span className={`capitalize ${emotionColors[entry.emotion]}`}>
          {entry.emotion}
        </span>

        <span className="text-gray-400">
          Intensity: {entry.intensity}
        </span>

      </div>

    </motion.div>
  );
}