import { create } from "zustand";

interface AppState {
    selectedDomain: string | null;
    completedNodes: string[];
    isRewardActive: boolean;
    setSelectedDomain: (id: string | null) => void;
    setCompletedNodes: (nodes: string[]) => void;
    triggerReward: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedDomain: null,
    completedNodes: [],
    isRewardActive: false,
    setSelectedDomain: (id) => set({ selectedDomain: id }),
    setCompletedNodes: (nodes) => set({ completedNodes: nodes }),
    triggerReward: () => {
        set({ isRewardActive: true });
        setTimeout(() => set({ isRewardActive: false }), 5000); // 5s celebration
    },
}));