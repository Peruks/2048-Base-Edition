export interface TileData {
    id: string;
    value: number;
}

export type Grid = (TileData | null)[][];
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface GameState {
    grid: Grid;
    score: number;
    bestScore: number;
    gameOver: boolean;
    won: boolean;
}
