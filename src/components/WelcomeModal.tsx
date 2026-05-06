"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, MousePointerClick, ArrowRight, Sparkles } from "lucide-react";

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-3xl p-4 md:p-12 overflow-y-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="glass-panel max-w-xl w-full my-auto p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] relative bg-[#0a101f]/80 flex flex-col"
                    >
                        {/* Premium Decor Elements */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-t-[3rem]" />
                        
                        {/* Floating Badge (Adjusted to stay inside padding) */}
                        <div className="flex justify-center mb-6 md:mb-8 mt-2">
                             <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 shadow-xl shadow-cyan-500/20 whitespace-nowrap flex items-center justify-center"
                            >
                                <Sparkles className="w-3 h-3 mr-2" />
                                Experience the Future
                            </motion.div>
                        </div>

                        <div className="relative z-10 text-center md:text-left flex-1">
                            <h2 className="text-3xl md:text-5xl font-outfit font-black text-white mb-4 md:mb-6 tracking-tight leading-[1.1]">
                                Welcome to <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Dev Archipelago</span>
                            </h2>
                            
                            <p className="text-white/40 mb-8 md:mb-12 leading-relaxed font-sans text-sm md:text-lg max-w-sm mx-auto md:mx-0">
                                Your immersive 3D gateway to mastering the modern tech stack. Navigate, explore, and conquer the digital ocean.
                            </p>

                            <div className="grid gap-6 md:gap-8 mb-8 md:mb-12 text-left">
                                <div className="flex items-center gap-4 md:gap-6 group">
                                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                                        <Compass className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-outfit font-bold text-lg md:text-xl mb-1">Navigate the Ocean</h3>
                                        <p className="text-white/30 text-xs md:text-sm font-sans leading-snug">Drag to orbit the camera and discover islands.</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 md:gap-6 group">
                                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-purple-400 shrink-0">
                                        <MousePointerClick className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-outfit font-bold text-lg md:text-xl mb-1">Focus & Dive</h3>
                                        <p className="text-white/30 text-xs md:text-sm font-sans leading-snug">Click islands to reveal specific learning paths.</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="group w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white font-outfit font-black tracking-[0.2em] md:tracking-[0.3em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 md:gap-4 shadow-[0_20px_40px_-10px_rgba(6,182,212,0.4)] shrink-0"
                            >
                                Start Exploring
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>

                        {/* Subtle background glow */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
