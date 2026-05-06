export interface RoadmapNode {
    task: string;
    resource_link: string;
    type: "Video" | "Article" | "Documentation" | "Project";
    difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface RoadmapLevel {
    id: string;
    title: string;
    coordinates: {
        x: number;
        y: number;
        z: number;
    };
    hex_color: string;
    model_type: string;
    nodes: RoadmapNode[];
}

export interface DomainRoadmap {
    title: string;
    theme: string;
    islands: RoadmapLevel[];
}

export type RoadmapsData = Record<string, DomainRoadmap>;
