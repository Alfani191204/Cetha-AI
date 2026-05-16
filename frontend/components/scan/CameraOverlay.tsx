"use client";

import { motion } from "framer-motion";

export default function CameraOverlay({ isScanning }: { isScanning: boolean }) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
      {/* Transparent bounding box (Receipt Area) with darkened surroundings */}
      <div className="relative w-4/5 max-w-sm aspect-[3/4] bg-transparent border-2 border-white/30 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] overflow-hidden">
        
        {/* Corner markers (AR Style) */}
        <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-2xl" />

        {/* Laser scanning animation */}
        {isScanning && (
          <motion.div
            className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_4px_#1A365D]"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        )}
      </div>

      {/* Instruction Text */}
      <div className="absolute top-[12%] left-0 right-0 text-center px-4">
        <div className="inline-block bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
          Tempatkan nota di dalam bingkai
        </div>
      </div>
    </div>
  );
}
