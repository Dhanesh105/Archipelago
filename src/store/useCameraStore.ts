import { create } from 'zustand';

interface CameraState {
    selectedDomain: string | null;
    selectedLevelId: string | null;
    setSelectedDomain: (domain: string | null) => void;
    setSelectedLevelId: (levelId: string | null) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
    selectedDomain: null,
    selectedLevelId: null,
    setSelectedDomain: (domain) => set({ 
        selectedDomain: domain, 
        selectedLevelId: null // Reset level when domain changes
    }),
    setSelectedLevelId: (levelId) => set({ selectedLevelId: levelId }),
}));
