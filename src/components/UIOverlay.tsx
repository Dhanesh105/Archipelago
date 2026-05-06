"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCameraStore } from "@/store/useCameraStore";
import roadmaps from "@/data/roadmaps.json";
import { X, CheckCircle, Circle, Play, FileText, BookOpen, ExternalLink, ChevronRight, Layers } from "lucide-react";
import { RoadmapsData, RoadmapLevel, DomainRoadmap } from "@/types/roadmap";

interface UIOverlayProps {
    completedNodes: string[];
}

export default function UIOverlay({ completedNodes }: UIOverlayProps) {
    const { selectedDomain, setSelectedDomain, selectedLevelId, setSelectedLevelId } = useCameraStore();

    const roadmapsData = roadmaps as unknown as RoadmapsData;
    let currentIsland: RoadmapLevel | null = null;
    let currentDomain: DomainRoadmap | null = null;

    if (selectedDomain) {
        const domainKey = selectedDomain.replace("_dev", "").replace("_games", "").replace("_data", "");
        const domain = roadmapsData[domainKey];
        
        if (domain) {
            currentDomain = domain;
            if (selectedLevelId) {
                currentIsland = domain.islands.find(lvl => lvl.id === selectedLevelId) || domain.islands[0];
            } else {
                currentIsland = domain.islands[0];
            }
        }
    }

    const getTypeIcon = (type: string, themeColor: string) => {
        if (type === "Video") return <Play className={`w-5 h-5 ${themeColor}`} />;
        if (type === "Article") return <FileText className={`w-5 h-5 ${themeColor}`} />;
        if (type === "Documentation") return <BookOpen className={`w-5 h-5 ${themeColor}`} />;
        return <Circle className="w-5 h-5 text-gray-400" />;
    };

    return (
        <AnimatePresence>
            {currentIsland && currentDomain && (
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 25 }}
                    className="fixed top-0 right-0 w-full md:w-[460px] h-full z-[80] md:p-6 flex flex-col pointer-events-none"
                >
                    <div className="glass-panel w-full h-full flex flex-col pointer-events-auto relative overflow-hidden md:rounded-[3rem] border-l md:border border-white/10 bg-[#0a101f]/95 backdrop-blur-3xl shadow-[-20px_0_60px_rgba(0,0,0,0.6)]">
                        
                        {/* Premium Header Accent */}
                        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent ${currentDomain.theme} opacity-50`} />
                        
                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setSelectedDomain(null);
                                setSelectedLevelId(null);
                            }}
                            className="absolute top-8 right-8 md:top-10 md:right-10 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group z-20"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6 text-white/30 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
                        </button>

                        {/* Header Section - shrink-0 to prevent padding compression */}
                        <div className="p-8 md:p-14 pt-20 md:pt-24 shrink-0">
                            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${currentDomain.theme}`}>
                                    <Layers className="w-4 h-4" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/40`}>
                                    {currentDomain.title}
                                </span>
                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white/10" />
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em]">Curriculum</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-5xl font-outfit font-black text-white tracking-tight leading-tight mb-4">
                                {currentIsland.title}
                            </h2>
                            <p className="text-white/30 font-sans text-sm md:text-base leading-relaxed max-w-sm">
                                Navigate through the following milestones to conquer this section.
                            </p>
                        </div>

                        {/* Content List - Scrollable */}
                        <div className="flex-1 flex flex-col gap-4 md:gap-5 overflow-y-auto px-8 md:px-12 pb-12 custom-scrollbar">
                            {currentIsland.nodes.map((node, index) => {
                                const isCompleted = completedNodes.includes(node.task);
                                return (
                                    <motion.a
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        key={node.task}
                                        href={node.resource_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group relative flex items-center gap-4 md:gap-6 p-5 md:p-7 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                                    >
                                        <div className="flex-shrink-0">
                                            {isCompleted ? (
                                                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20">
                                                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                                                </div>
                                            ) : (
                                                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all border border-white/5">
                                                    {getTypeIcon(node.type, currentDomain.theme)}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-3 mb-1 md:mb-2">
                                                <h3 className="font-outfit font-bold text-lg md:text-xl text-white group-hover:text-cyan-300 transition-colors truncate">
                                                    {node.task}
                                                </h3>
                                                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white/10 group-hover:text-white/40 transition-all" />
                                            </div>
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-white/30 group-hover:text-white/50 transition-colors`}>
                                                    {node.difficulty}
                                                </span>
                                                <div className="w-1 h-1 rounded-full bg-white/10" />
                                                <span className="text-[10px] font-bold text-white/15 uppercase tracking-[0.2em] md:tracking-[0.3em]">{node.type}</span>
                                            </div>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Progress Footer - shrink-0 */}
                        <div className="p-8 md:p-10 border-t border-white/5 bg-black/40 shrink-0">
                             <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em]">Island Progress</span>
                                <span className="text-[10px] font-bold text-white/40">{completedNodes.length} Completed</span>
                             </div>
                             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "0%" }}
                                    className={`h-full bg-gradient-to-r from-cyan-500 to-blue-600`}
                                />
                             </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
