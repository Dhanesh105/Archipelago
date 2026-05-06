// src/components/Symbols.tsx
import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";

export const ReactAtom = () => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (groupRef.current) groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    });
    return (
        <group ref={groupRef} scale={1.2}>
            <mesh>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#61dbfb" emissive="#61dbfb" emissiveIntensity={0.5} />
            </mesh>
            {[[0, 0, 0], [Math.PI / 3, 0, 0], [-Math.PI / 3, 0, 0]].map((rotation, i) => (
                <mesh key={i} rotation={rotation as [number, number, number]}>
                    <torusGeometry args={[1, 0.04, 16, 100]} />
                    <meshStandardMaterial color="#61dbfb" emissive="#61dbfb" emissiveIntensity={0.8} transparent opacity={0.6} />
                </mesh>
            ))}
        </group>
    );
};

export const AndroidBot = () => (
    <group scale={1.2} position={[0, -0.2, 0]}>
        <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.7, 32]} />
            <meshStandardMaterial color="#3DDC84" emissive="#1a5e39" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
            <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#3DDC84" emissive="#1a5e39" />
        </mesh>
        <mesh position={[-0.2, 0.9, 0.4]}><sphereGeometry args={[0.06]} /><meshBasicMaterial color="#ffffff" /></mesh>
        <mesh position={[0.2, 0.9, 0.4]}><sphereGeometry args={[0.06]} /><meshBasicMaterial color="#ffffff" /></mesh>
    </group>
);

export const UnityLogoCube = () => (
    <group scale={1.2}>
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} roughness={0.2} />
            <Edges scale={1.05} threshold={15} color="#000000" />
        </mesh>
    </group>
);

export const CyberBrain = () => {
    const shellRef = useRef<THREE.Mesh>(null);
    useFrame(() => { if (shellRef.current) shellRef.current.rotation.y += 0.005; });
    return (
        <group scale={1.5}>
            <mesh ref={shellRef}>
                <icosahedronGeometry args={[0.8, 1]} />
                <meshStandardMaterial color="#9d00ff" emissive="#4b0082" emissiveIntensity={0.8} wireframe />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.35, 32, 32]} />
                <meshStandardMaterial color="#00f3ff" emissive="#008b8b" emissiveIntensity={1} />
            </mesh>
        </group>
    );
};