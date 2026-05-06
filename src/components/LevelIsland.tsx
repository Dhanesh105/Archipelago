"use client";

import React, { useRef, useState } from "react";
import { Text, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCameraStore } from "@/store/useCameraStore";

interface LevelIslandProps {
    id: string;
    title: string;
    position: [number, number, number];
    color: string;
    isUnlocked: boolean;
}

export default function LevelIsland({ id, title, position, color, isUnlocked }: LevelIslandProps) {
    const ref = useRef<THREE.Mesh>(null);
    const { setSelectedLevelId, selectedLevelId } = useCameraStore();
    const [hovered, setHovered] = useState(false);

    const isSelected = selectedLevelId === id;

    // Gentle scale animation to make nodes "live"
    useFrame((state) => {
        if (ref.current) {
            const baseScale = isSelected ? 1.3 : 1;
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05;
            ref.current.scale.setScalar(baseScale + pulse);
        }
    });

    return (
        <Float speed={4} rotationIntensity={0.2}>
            <group 
                position={position}
                onClick={(e) => {
                    e.stopPropagation();
                    if (isUnlocked) setSelectedLevelId(id);
                }}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
            >
                <mesh ref={ref}>
                    <sphereGeometry args={[0.7, 32, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={(isUnlocked || hovered) ? 2 : 0.2}
                        transparent
                        opacity={isUnlocked ? 1 : 0.4}
                    />
                </mesh>

                <Text
                    position={[0, 1.4, 0]}
                    fontSize={0.4}
                    color="white"
                    outlineColor="black"
                    outlineWidth={0.01}
                    anchorX="center"
                    fontWeight="bold"
                >
                    {title}
                </Text>

                {isSelected && (
                    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.9, 1.1, 32]} />
                        <meshBasicMaterial color={color} transparent opacity={0.5} />
                    </mesh>
                )}
            </group>
        </Float>
    );
}