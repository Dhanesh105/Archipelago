"use client";

import { useMemo, useState, useRef } from "react";
import { Color } from "three";
import { useFrame } from "@react-three/fiber";
import { useCameraStore } from "@/store/useCameraStore";
import { Float, Text } from "@react-three/drei";
import { motion } from "framer-motion-3d";

interface LevelIslandProps {
    id: string;
    position: [number, number, number];
    color: string;
    isUnlocked: boolean;
    title: string;
    domainId: string;
}

export default function LevelIsland({ id, position, color, isUnlocked, title, domainId }: LevelIslandProps) {
    const { selectedDomain } = useCameraStore();
    const [hovered, setHovered] = useState(false);
    const textRef = useRef<any>(null);

    const baseColor = useMemo(() => new Color(color), [color]);
    const lockedColor = useMemo(() => new Color("#444444"), []);

    useFrame(({ camera }) => {
        if (textRef.current) {
            textRef.current.quaternion.copy(camera.quaternion);
        }
    });

    // Only show this island if its parent domain is currently selected in Island View
    const isVisible = selectedDomain === domainId;

    if (!isVisible) return null;

    return (
        <motion.group
            position={position}
            initial={{ scale: 0, y: position[1] - 5 }}
            animate={{ scale: 1, y: position[1] }}
            exit={{ scale: 0, y: position[1] - 5 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
        >
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                <group>
                    <Text
                        ref={textRef}
                        position={[0, 2, 0]}
                        fontSize={0.4}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.02}
                        outlineColor="#000000"
                    >
                        {title}
                    </Text>

                    <motion.mesh
                        animate={{ scale: hovered && isUnlocked ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onPointerOver={(e: any) => {
                            e.stopPropagation();
                            if (isUnlocked) {
                                setHovered(true);
                                document.body.style.cursor = "pointer";
                            }
                        }}
                        onPointerOut={(e: any) => {
                            e.stopPropagation();
                            if (isUnlocked) {
                                setHovered(false);
                                document.body.style.cursor = "auto";
                            }
                        }}
                        castShadow
                        receiveShadow
                    >
                        {/* Level shapes look like smaller geometric stones */}
                        <dodecahedronGeometry args={[1, 0]} />

                        <meshPhysicalMaterial
                            color={isUnlocked ? baseColor : lockedColor}
                            emissive={isUnlocked ? baseColor : new Color(0x000000)}
                            emissiveIntensity={hovered && isUnlocked ? 1.0 : 0.3}
                            roughness={0}
                            transmission={1}
                            thickness={1}
                            transparent
                            opacity={1}
                        />
                    </motion.mesh>
                </group>
            </Float>
        </motion.group>
    );
}
