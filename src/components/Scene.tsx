"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
    ContactShadows,
    MeshReflectorMaterial,
    Environment,
    Stars
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- Local Components ---
import DomainIsland from "./DomainIsland";
import LevelIsland from "./LevelIsland";
import { LearningPath } from "./LearningPath";
import CameraController from "./CameraController";
import { CentralHub } from "./CentralHub";
import { NeuralLine } from "./NeuralLine";
import { CelestialRewards } from "./CelestialRewards";

// --- Store & Data ---
import { useCameraStore } from "@/store/useCameraStore";
import roadmaps from "@/data/roadmaps.json";
import { RoadmapsData } from "@/types/roadmap";

export default function Scene({ unlockedDomains = [] }: { unlockedDomains: string[] }) {
    const { selectedDomain, setSelectedDomain, setSelectedLevelId } = useCameraStore();
    const roadmapsData = roadmaps as unknown as RoadmapsData;

    // These positions MUST match layout.ts
    const islands = [
        { id: "web", pos: [18, 0, 18] as [number, number, number], color: "#61dbfb", title: "Web Development" },
        { id: "android", pos: [-18, 0, 18] as [number, number, number], color: "#3DDC84", title: "Android Development" },
        { id: "unity", pos: [18, 0, -18] as [number, number, number], color: "#ffffff", title: "Unity Games" },
        { id: "ai", pos: [-18, 0, -18] as [number, number, number], color: "#9d00ff", title: "AI & Data Science" },
    ];

    const handleBackgroundClick = () => {
        setSelectedDomain(null);
        setSelectedLevelId(null);
    };

    return (
        <div className="w-full h-screen absolute top-0 left-0 bg-[#020617] overflow-hidden">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 40, 60], fov: 45 }}>
                <Suspense fallback={null}>
                    <CameraController />
                    <fog attach="fog" args={["#020617", 10, 120]} />
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
                    <pointLight position={[-10, 10, -10]} intensity={1} color="#444" />
                    
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {!selectedDomain && (
                        <>
                            <CentralHub />
                            {islands.map((i) => <NeuralLine key={i.id} end={i.pos} color={i.color} />)}
                        </>
                    )}

                    <CelestialRewards />

                    {/* Floor / Ocean Surface */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} onClick={handleBackgroundClick}>
                        <planeGeometry args={[400, 400]} />
                        <MeshReflectorMaterial 
                            blur={[300, 100]} 
                            resolution={512}
                            mixBlur={1} 
                            mixStrength={50} 
                            roughness={1} 
                            depthScale={1} 
                            color="#050505" 
                            metalness={0.9} 
                            mirror={0.5} 
                        />
                    </mesh>

                    <ContactShadows position={[0, -1.1, 0]} opacity={0.4} scale={80} blur={2.5} />

                    {islands.map((island) => {
                        const isSelected = selectedDomain === island.id;
                        const domainData = roadmapsData[island.id];

                        return (
                            <group key={island.id} position={island.pos}>
                                <DomainIsland
                                    domainId={island.id}
                                    title={island.title}
                                    position={[0, 0, 0]}
                                    color={island.color}
                                    isUnlocked={unlockedDomains.includes(island.id)}
                                />

                                {isSelected && domainData && (
                                    <group>
                                        <LearningPath levels={domainData.islands} color={island.color} />
                                        {domainData.islands.map((level) => (
                                            <LevelIsland
                                                key={level.id}
                                                id={level.id}
                                                title={level.title}
                                                position={[level.coordinates.x, level.coordinates.y, level.coordinates.z]}
                                                color={level.hex_color || island.color}
                                                isUnlocked={unlockedDomains.includes(island.id)}
                                            />
                                        ))}
                                    </group>
                                )}
                            </group>
                        );
                    })}

                    <EffectComposer enableNormalPass={false}>
                        <Bloom luminanceThreshold={1} mipmapBlur intensity={1} radius={0.3} />
                    </EffectComposer>

                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
}