// src/components/CelestialRewards.tsx
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/store/useAppStore";

export const CelestialRewards = () => {
    // Accessing the global state to trigger the reward visuals
    const isRewardActive = useAppStore((state) => state.isRewardActive);
    const meteors = useRef<THREE.Points>(null);

    // Initializing 80 meteor positions once to optimize performance
    const meteorCount = 80;
    const positions = useMemo(() => {
        const p = new Float32Array(meteorCount * 3);
        for (let i = 0; i < meteorCount; i++) {
            p[i * 3] = (Math.random() - 0.5) * 100;    // X
            p[i * 3 + 1] = 40 + Math.random() * 20;   // Y (Start height)
            p[i * 3 + 2] = (Math.random() - 0.5) * 100; // Z
        }
        return p;
    }, []);

    useFrame(() => {
        if (meteors.current && isRewardActive) {
            const attr = meteors.current.geometry.attributes.position;
            const arr = attr.array as Float32Array;

            for (let i = 0; i < meteorCount; i++) {
                // Diagonal falling motion logic
                arr[i * 3 + 1] -= 1.2; // Fall speed
                arr[i * 3] += 0.4;     // Slight horizontal drift

                // Reset meteor to the top once it falls out of view
                if (arr[i * 3 + 1] < -10) {
                    arr[i * 3 + 1] = 50;
                }
            }
            // Notify Three.js that the position data has changed
            attr.needsUpdate = true;
        }
    });

    // The reward system only renders particles when active to save GPU memory
    return isRewardActive ? (
        <points ref={meteors}>
            <bufferGeometry>
                {/* FIX: Passing the Float32Array and itemSize (3 for X,Y,Z) via 'args' 
                  This resolves the TypeScript 'Property args is missing' error.
                */}
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#00f3ff"
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    ) : null;
};