import Scene from "@/components/Scene";
import UIOverlay from "@/components/UIOverlay";
import WelcomeModal from "@/components/WelcomeModal";
import { connectToDatabase } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import { Suspense } from "react";

export const metadata = {
  title: "Dev Archipelago | 3D Learning Roadmap",
  description: "Navigate your way through the digital ocean of web, android, unity, and AI development with an interactive 3D learning roadmap.",
};

export default async function Home() {
  try {
    await connectToDatabase();

    // Use a mock userId for the MVP
    const userId = "guest_user";
    let progress = await UserProgress.findOne({ userId });

    const requiredDomains = ["web", "android", "unity", "ai"];

    if (!progress) {
      progress = await UserProgress.create({
        userId,
        completedNodes: [],
        unlockedDomains: requiredDomains, // MVP: Everything unlocked by default
      });
    } else {
      // Migrate legacy IDs if they exist in the DB
      let modified = false;
      
      // Cleanup old _dev suffix IDs
      progress.unlockedDomains = progress.unlockedDomains.map((d: string) => {
        const clean = d.replace("_dev", "").replace("_games", "").replace("_data", "");
        if (clean !== d) modified = true;
        return clean;
      });

      // Ensure all domains exist
      requiredDomains.forEach(domain => {
        if (!progress.unlockedDomains.includes(domain)) {
          progress.unlockedDomains.push(domain);
          modified = true;
        }
      });
      
      if (modified) await progress.save();
    }

    // Serialize mongoose document
    const unlockedDomains = JSON.parse(JSON.stringify(progress.unlockedDomains));
    const completedNodes = JSON.parse(JSON.stringify(progress.completedNodes));

    return (
      <main className="relative w-full h-screen overflow-hidden text-neutral-50 font-sans selection:bg-cyan-500/30">
        <WelcomeModal />

        {/* 3D Scene Layer */}
        <Suspense fallback={<LoadingScreen />}>
          <Scene unlockedDomains={unlockedDomains} />
        </Suspense>

        {/* 2D UI Overlay Layer */}
        <UIOverlay completedNodes={completedNodes} />

        {/* Header / Brand */}
        <div className="absolute top-8 left-8 z-40 pointer-events-none md:top-12 md:left-12">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-4xl font-outfit font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] tracking-[0.2em] uppercase leading-none filter drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              Dev Archipelago
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-cyan-500/30" />
              <p className="text-white/30 font-black tracking-[0.3em] text-[9px] uppercase">
                The Interactive Learning Ocean
              </p>
            </div>
          </div>
        </div>

        {/* Helper Instructions (Mobile Hide) */}
        <div className="absolute bottom-10 left-10 z-40 hidden md:block">
           <div className="flex gap-4">
              <kbd className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md text-[10px] font-black text-white/30 uppercase tracking-[0.25em]">Orbit: Drag</kbd>
              <kbd className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md text-[10px] font-black text-white/30 uppercase tracking-[0.25em]">Focus: Click Island</kbd>
           </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Critical Failure in Home:", error);
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-6 text-center">
        <h1 className="text-4xl font-black mb-4">The Ocean is Stormy</h1>
        <p className="text-white/60 max-w-md mb-8">We couldn't connect to the roadmap database. Please check your connection or try again later.</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 font-bold hover:bg-white/20 transition">Retry Connection</button>
      </div>
    );
  }
}

function LoadingScreen() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#020617] z-[200]">
      <div className="w-20 h-20 border-2 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin mb-8" />
      <div className="flex flex-col items-center gap-2">
        <p className="text-cyan-500 font-outfit font-black tracking-[0.5em] uppercase text-[10px] animate-pulse">Summoning Islands</p>
        <p className="text-white/10 text-[9px] uppercase tracking-[0.3em]">Initializing 3D Ocean</p>
      </div>
    </div>
  );
}
