export const getDomainPosition = (domainId: string, isMobile: boolean): [number, number, number] => {
    if (isMobile) {
        // Vertical stack for mobile
        const yOffsets: Record<string, number> = {
            web: 20,
            android: 8,
            unity: -4,
            ai: -16
        };
        return [0, yOffsets[domainId] || 0, 0];
    } else {
        // Grid/Circle layout for desktop
        // MUST MATCH positions in Scene.tsx
        const pos: Record<string, [number, number, number]> = {
            web: [18, 0, 18],
            android: [-18, 0, 18],
            unity: [18, 0, -18],
            ai: [-18, 0, -18]
        };
        return pos[domainId] || [0, 0, 0];
    }
};
