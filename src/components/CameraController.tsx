"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useCameraStore } from "@/store/useCameraStore";
import { Vector3, PerspectiveCamera } from "three";
import roadmaps from "@/data/roadmaps.json";
import { OrbitControls } from "@react-three/drei";
import { getDomainPosition } from "@/lib/layout";
import { RoadmapsData } from "@/types/roadmap";

export default function CameraController() {
    const { camera, size } = useThree();
    const { selectedDomain, selectedLevelId } = useCameraStore();
    const orbitRef = useRef<any>(null);

    const currentTarget = useRef(new Vector3(0, 0, 0));
    const basePosition = useRef(new Vector3(0, 20, 30));

    const roadmapsData = roadmaps as unknown as RoadmapsData;

    // Determine FOV based on aspect ratio (mobile responsive)
    useEffect(() => {
        const isMobile = size.width < 768;
        const persCamera = camera as PerspectiveCamera;
        persCamera.fov = isMobile ? 80 : 45; // Wider FOV for mobile to see context
        persCamera.updateProjectionMatrix();

        // Modify default world position based on screen
        if (!selectedDomain) {
            basePosition.current.set(0, isMobile ? 35 : 20, isMobile ? 55 : 30);
        }
    }, [size.width, camera, selectedDomain]);

    useEffect(() => {
        const isMobile = size.width < 768;

        if (selectedDomain) {
            const domainKey = selectedDomain.replace("_dev", "").replace("_games", "").replace("_data", "");
            const [dx, dy, dz] = getDomainPosition(domainKey, isMobile);
            
            let tx = dx;
            let ty = dy;
            let tz = dz;

            if (selectedLevelId) {
                const domain = roadmapsData[domainKey];
                const level = domain?.islands.find(l => l.id === selectedLevelId);
                if (level) {
                    tx += level.coordinates.x;
                    ty += level.coordinates.y;
                    tz += level.coordinates.z;
                }
            }

            const zoomDist = isMobile ? (selectedLevelId ? 22 : 30) : (selectedLevelId ? 14 : 20);
            
            // USER REQUEST: Center the island. 
            // On Desktop, shift camera to the right to move the island visually left (centering it in the non-UI space)
            let xOffset = 0;
            if (!isMobile) {
                xOffset = 8; // Slightly reduced to avoid pushing the island too far left
            }

            gsap.to(basePosition.current, {
                x: tx + xOffset,
                y: ty + (isMobile ? 18 : 12),
                z: tz + zoomDist,
                duration: 2,
                ease: "power3.inOut"
            });

            gsap.to(currentTarget.current, {
                x: tx, y: ty, z: tz,
                duration: 2,
                ease: "power3.inOut"
            });

        } else {
            const isMobile = size.width < 768;

            gsap.to(basePosition.current, {
                x: 0,
                y: isMobile ? 35 : 20,
                z: isMobile ? 55 : 30,
                duration: 2,
                ease: "power3.inOut"
            });

            gsap.to(currentTarget.current, {
                x: 0, y: 0, z: 0,
                duration: 2,
                ease: "power3.inOut"
            });
        }
    }, [selectedDomain, selectedLevelId, roadmapsData, size.width]);

    useFrame((state, delta) => {
        const parallaxIntensity = selectedDomain ? 0.2 : 1.5;
        const parallaxX = state.pointer.x * parallaxIntensity;
        const parallaxY = state.pointer.y * parallaxIntensity;

        const finalPosition = new Vector3(
            basePosition.current.x + parallaxX,
            basePosition.current.y - parallaxY * 0.5,
            basePosition.current.z + parallaxY
        );

        if (orbitRef.current) {
            orbitRef.current.target.lerp(currentTarget.current, delta * 4);
            
            const lerpSpeed = gsap.isTweening(basePosition.current) ? 4 : 2;
            camera.position.lerp(finalPosition, delta * lerpSpeed);
            
            orbitRef.current.update();
        }
    });

    return (
        <OrbitControls
            ref={orbitRef}
            enableDamping={true}
            dampingFactor={0.05}
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={120}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2 - 0.1}
        />
    );
}
