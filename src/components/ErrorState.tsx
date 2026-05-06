"use client";

import { motion } from "framer-motion";
import { RefreshCcw, WifiOff } from "lucide-react";

export default function ErrorState() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-6 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-8 p-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400"
            >
                <WifiOff className="w-12 h-12" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-outfit font-black mb-4 tracking-tight">The Ocean is Stormy</h1>
            <p className="text-white/40 max-w-md mb-10 leading-relaxed font-sans text-lg">
                We couldn't connect to the roadmap database. Please check your connection or verify the database status.
            </p>
            
            <button 
                onClick={() => window.location.reload()} 
                className="group px-10 py-4 rounded-2xl bg-white/5 border border-white/10 font-outfit font-black tracking-widest uppercase hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-3 active:scale-95"
            >
                <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Retry Connection
            </button>
        </div>
    );
}
