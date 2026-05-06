// src/components/CentralHub.tsx
import React from "react";
import { Text } from "@react-three/drei";

export const CentralHub = () => (
    <group position={[0, 0, 0]}>
        <mesh receiveShadow>
            <cylinderGeometry args={[2.5, 2.8, 0.6, 32]} />
            <meshPhysicalMaterial color="#111" roughness={0.1} transmission={0.2} thickness={1} />
        </mesh>

        {/* The Central Hub Label */}
        <Text
            position={[0, 2.5, 0]}
            fontSize={0.4}
            color="#00ffff"
            anchorX="center"
        >
            HAPPY CODING
            <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} />
        </Text>

        <group position={[0, 0.6, 0]}>
            <mesh><boxGeometry args={[1.5, 0.1, 0.9]} /><meshStandardMaterial color="#222" /></mesh>
            <mesh position={[0, 0.4, -0.3]} rotation={[-0.5, 0, 0]}>
                <boxGeometry args={[0.8, 0.5, 0.05]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} />
            </mesh>
        </group>
    </group>
);