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

    // Load state
    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedBest = localStorage.getItem(HIGH_SCORE_KEY);
        if (savedBest) setBestScore(parseInt(savedBest, 10));

        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                // Validate grid structure roughly
                if (Array.isArray(parsed.grid) && parsed.grid.length === 4) {
                    setGrid(parsed.grid);
                    setScore(parsed.score);
                    setGameOver(parsed.gameOver);
                    setWon(parsed.won);
                    setHasWonOnce(parsed.hasWonOnce || false);
                } else {
                    startNewGame();
                }
            } catch (e) {
                startNewGame();
            }
        } else {
            startNewGame();
        }
        setInitialized(true);
    }, [startNewGame]);

    // Save state
    useEffect(() => {
        if (!initialized) return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ grid, score, gameOver, won, hasWonOnce }));
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem(HIGH_SCORE_KEY, score.toString());
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
