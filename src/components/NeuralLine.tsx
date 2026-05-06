// src/components/NeuralLine.tsx
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface NeuralLineProps {
    end: [number, number, number];
    color: string;
}

export const NeuralLine = ({ end, color }: NeuralLineProps) => {
    const points = useMemo(() => [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(end[0] * 0.5, 2, end[2] * 0.5),
        new THREE.Vector3(...end)
    ], [end]);

    const curve = new THREE.CatmullRomCurve3(points);
    const lineRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (lineRef.current) {
            const mat = lineRef.current.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.5;
        }
    });

    return (
        <mesh ref={lineRef}>
            <tubeGeometry args={[curve, 64, 0.02, 8, false]} />
            <meshStandardMaterial color={color} emissive={color} transparent opacity={0.3} />
        </mesh>
    );
};