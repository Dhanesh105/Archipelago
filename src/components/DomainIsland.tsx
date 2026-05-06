"use client";

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Text, MeshWobbleMaterial } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useCameraStore } from "@/store/useCameraStore";
import { ReactAtom, AndroidBot, UnityLogoCube, CyberBrain } from "./Symbols";

interface DomainIslandProps {
    domainId: string;
    position: [number, number, number];
    color: string;
    isUnlocked: boolean;
    title: string;
}

export default function DomainIsland({ domainId, position, color, isUnlocked, title }: DomainIslandProps) {
    const { setSelectedDomain, selectedDomain, setSelectedLevelId } = useCameraStore();
    const [hovered, setHovered] = useState(false);
    const textRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    const isSelected = selectedDomain === domainId;
    const isHidden = selectedDomain !== null && !isSelected;

    useFrame(({ camera, clock }) => {
        if (textRef.current) textRef.current.quaternion.copy(camera.quaternion);
        if (ringRef.current) {
            ringRef.current.rotation.z = clock.elapsedTime * 0.5;
            ringRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2) * 0.05);
        }
    });

    const handleSelect = (e: any) => {
        e.stopPropagation();
        if (isUnlocked && !isHidden) {
            setSelectedDomain(domainId);
            setSelectedLevelId(null);
        }
    };

    return (
        <motion.group
            position={position}
            animate={{ 
                y: isHidden ? -40 : 0, 
                scale: isHidden ? 0.01 : 1,
                opacity: isHidden ? 0 : 1 
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            onClick={handleSelect}
            onPointerOver={() => { if (!isHidden) setHovered(true); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group>
                    {/* Base Island Body */}
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[4, 3.5, 1.5, 6]} />
                        <meshPhysicalMaterial
                            color={isUnlocked ? color : "#111"}
                            transmission={0.4}
                            thickness={2}
                            roughness={0.2}
                            metalness={0.8}
                            emissive={isUnlocked ? color : "#000"}
                            emissiveIntensity={hovered ? 1.2 : 0.4}
                        />
                    </mesh>

                    {/* Advanced Glow Ring */}
                    {isUnlocked && (
                        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
                            <ringGeometry args={[4.2, 4.5, 6]} />
                            <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.3} side={THREE.DoubleSide} />
                        </mesh>
                    )}

                    {/* Floating Label */}
                    <Text 
                        ref={textRef as any} 
                        position={[0, 6.5, 0]} 
                        fontSize={0.8} 
                        color="white"
                        anchorY="middle"
                    >
                        {title.toUpperCase()}
                        <meshBasicMaterial color="white" />
                    </Text>

                    {/* Central Symbol */}
                    {(isUnlocked || hovered) && (
                        <group position={[0, 3, 0]} scale={1.2}>
                            {domainId === "web" && <ReactAtom />}
                            {domainId === "android" && <AndroidBot />}
                            {domainId === "unity" && <UnityLogoCube />}
                            {domainId === "ai" && <CyberBrain />}
                        </group>
                    )}

                    {/* Locked State Shield */}
                    {!isUnlocked && !hovered && (
                        <mesh position={[0, 2, 0]}>
                            <sphereGeometry args={[4.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                            <MeshWobbleMaterial 
                                color="#222" 
                                factor={0.1} 
                                speed={1} 
                                transparent 
                                opacity={0.6} 
                                wireframe
                            />
                        </mesh>
                    )}
                </group>
            </Float>
        </motion.group>
    );
}