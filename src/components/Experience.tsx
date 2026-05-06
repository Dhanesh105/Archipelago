"use client";

import React from "react";
import { Stars, OrbitControls, ContactShadows } from "@react-three/drei";
import DomainIsland from "./DomainIsland";
import { NeuralLine } from "./NeuralLine";
import { CentralHub } from "./CentralHub";
import { CelestialRewards } from "./CelestialRewards";
import { useCameraStore } from "@/store/useCameraStore";

export default function Experience({ unlockedDomains = [] }: { unlockedDomains: string[] }) {
    const { selectedDomain } = useCameraStore();

    // STRICT DEFINITION: These are the only 4 islands that will ever exist.
    const islandData = [
        { id: "web_dev", pos: [18, 0, 18] as [number, number, number], color: "#61dbfb", title: "Web Development" },
        { id: "android_dev", pos: [-18, 0, 18] as [number, number, number], color: "#3DDC84", title: "Android Development" },
        { id: "unity_games", pos: [18, 0, -18] as [number, number, number], color: "#ffffff", title: "Unity Games" },
        { id: "ai_data", pos: [-18, 0, -18] as [number, number, number], color: "#9d00ff", title: "AI & Data Science" },
    ];

    return (
        <>
            <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 15, 10]} intensity={2} castShadow />
            <OrbitControls enableDamping dampingFactor={0.05} minDistance={10} maxDistance={60} />

            {/* Hub and Lines: Hidden when an island is zoomed in for focus */}
            {!selectedDomain && (
                <>
                    <CentralHub />
                    {islandData.map((island) => (
                        <NeuralLine key={`line-${island.id}`} end={island.pos} color={island.color} />
                    ))}
                </>
            )}

            <CelestialRewards />

            {/* Rendering the islands exactly once */}
            {islandData.map((island) => (
                <DomainIsland
                    key={island.id}
                    domainId={island.id}
                    position={island.pos}
                    color={island.color}
                    isUnlocked={unlockedDomains.includes(island.id)}
                    title={island.title}
                />
            ))}

            <ContactShadows position={[0, -1.1, 0]} opacity={0.4} scale={60} blur={2.5} />
        </>
    );
}