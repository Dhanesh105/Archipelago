"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

export const LearningPath = ({ levels, color }: { levels: any[]; color: string }) => {
    const linePath = useMemo(() => {
        // Start the path from the center of the domain island (local [0,0,0])
        const points = [new THREE.Vector3(0, 0, 0)];

        levels.forEach((lvl) => {
            points.push(new THREE.Vector3(lvl.coordinates.x, lvl.coordinates.y, lvl.coordinates.z));
        });

        if (points.length < 2) return null;
        return new THREE.CatmullRomCurve3(points);
    }, [levels]);

    if (!linePath) return null;

    return (
        <mesh>
            <tubeGeometry args={[linePath, 64, 0.04, 8, false]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
                transparent
                opacity={0.3}
            />
        </mesh>
    );
};