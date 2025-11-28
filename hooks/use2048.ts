import { useState, useEffect, useCallback } from "react";
import { Grid, Direction } from "../lib/types";
import { createEmptyGrid, spawnTile, moveGrid, checkGameOver, checkWin } from "../lib/game";

const STORAGE_KEY = "2048-base-state-v2"; // Changed key to avoid conflict with old format
const HIGH_SCORE_KEY = "2048-base-highscore";

export function use2048() {
    const [grid, setGrid] = useState<Grid>(createEmptyGrid());
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [hasWonOnce, setHasWonOnce] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const startNewGame = useCallback(() => {
        let newGrid = createEmptyGrid();
        newGrid = spawnTile(newGrid);
        newGrid = spawnTile(newGrid);
        setGrid(newGrid);
        setScore(0);
        setGameOver(false);
        setWon(false);
        setHasWonOnce(false);
    }, []);

    // Helper to validate grid structure
    const isValidGrid = (g: any): g is Grid => {
        if (!Array.isArray(g) || g.length !== 4) return false;
        return g.every((row) =>
            Array.isArray(row) &&
            row.length === 4 &&
            row.every((tile) =>
                tile === null ||
                (typeof tile === "object" && typeof tile.id === "string" && typeof tile.value === "number")
            )
        );
    };

    // Load state
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const savedBest = localStorage.getItem(HIGH_SCORE_KEY);
            if (savedBest) setBestScore(parseInt(savedBest, 10));

            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                const parsed = JSON.parse(savedState);
                if (isValidGrid(parsed.grid)) {
                    setGrid(parsed.grid);
                    setScore(parsed.score || 0);
                    setGameOver(!!parsed.gameOver);
                    setWon(!!parsed.won);
                    setHasWonOnce(!!parsed.hasWonOnce);
                } else {
                    console.warn("Invalid saved grid, resetting.");
                    startNewGame();
                }
            } else {
                startNewGame();
            }
        } catch (e) {
            console.warn("Failed to load state:", e);
            startNewGame();
        }
        setInitialized(true);
    }, [startNewGame]);

    // Save state
    useEffect(() => {
        if (!initialized) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ grid, score, gameOver, won, hasWonOnce }));
            if (score > bestScore) {
                setBestScore(score);
                localStorage.setItem(HIGH_SCORE_KEY, score.toString());
            }
        } catch (e) {
            console.warn("Failed to save state:", e);
        }
    }, [grid, score, gameOver, won, hasWonOnce, bestScore, initialized]);

    const move = useCallback((direction: Direction) => {
        if (gameOver) return;

        const { grid: newGrid, score: gainedScore, moved } = moveGrid(grid, direction);

        if (moved) {
            const gridWithSpawn = spawnTile(newGrid);
            setGrid(gridWithSpawn);
            setScore((s) => s + gainedScore);

            if (!hasWonOnce && checkWin(gridWithSpawn)) {
                setWon(true);
                setHasWonOnce(true);
            }

            if (checkGameOver(gridWithSpawn)) {
                setGameOver(true);
            }
        }
    }, [grid, gameOver, hasWonOnce]);

    const continueGame = useCallback(() => {
        setWon(false);
    }, []);

    return { grid, score, bestScore, gameOver, won, move, startNewGame, continueGame, initialized };
}
