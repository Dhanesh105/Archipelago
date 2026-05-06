import Scene from "@/components/Scene";
import UIOverlay from "@/components/UIOverlay";
import WelcomeModal from "@/components/WelcomeModal";
import ErrorState from "@/components/ErrorState";
import { connectToDatabase } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dev Archipelago | 3D Learning Roadmap",
  description: "Navigate your way through the digital ocean of web, android, unity, and AI development with an interactive 3D learning roadmap.",
};

export default async function Home() {
  try {
    await connectToDatabase();

    const userId = "guest_user";
    let progress = await UserProgress.findOne({ userId });

    const requiredDomains = ["web", "android", "unity", "ai"];

    if (!progress) {
      progress = await UserProgress.create({
        userId,
        completedNodes: [],
        unlockedDomains: requiredDomains,
      });
    } else {
      let modified = false;
      progress.unlockedDomains = progress.unlockedDomains.map((d: string) => {
        const clean = d.replace("_dev", "").replace("_games", "").replace("_data", "");
        if (clean !== d) modified = true;
        return clean;
      });

      requiredDomains.forEach(domain => {
        if (!progress.unlockedDomains.includes(domain)) {
          progress.unlockedDomains.push(domain);
          modified = true;
        }
      });
      
      if (modified) await progress.save();
    }

    const unlockedDomains = JSON.parse(JSON.stringify(progress.unlockedDomains));
    const completedNodes = JSON.parse(JSON.stringify(progress.completedNodes));

    return (
      <main className="relative w-full h-screen overflow-hidden text-neutral-50 font-sans selection:bg-cyan-500/30">
        <WelcomeModal />

        <Suspense fallback={<LoadingScreen />}>
          <Scene unlockedDomains={unlockedDomains} />
        </Suspense>

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
    return <ErrorState />;
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
