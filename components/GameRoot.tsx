"use client";

import { useEffect, useRef } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import html2canvas from "html2canvas";
import { use2048 } from "../hooks/use2048";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import Overlay from "./Overlay";

export default function GameRoot() {
    const { grid, score, bestScore, gameOver, won, move, startNewGame, continueGame, initialized } = use2048();
    const boardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            try {
                await sdk.actions.ready();
            } catch (err) {
                console.warn("Not running inside Farcaster Mini App or sdk not available:", err);
            }
        };
        void init();

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((reg) => console.log("SW registered", reg))
                .catch((err) => console.log("SW registration failed", err));
        }
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case "ArrowUp":
                case "w":
                case "W":
                    e.preventDefault();
                    move("UP");
                    break;
                case "ArrowDown":
                case "s":
                case "S":
                    e.preventDefault();
                    move("DOWN");
                    break;
                case "ArrowLeft":
                case "a":
                case "A":
                    e.preventDefault();
                    move("LEFT");
                    break;
                case "ArrowRight":
                case "d":
                case "D":
                    e.preventDefault();
                    move("RIGHT");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [move, gameOver]);

    const handleShare = async () => {
        if (!boardRef.current) return;

        try {
            const canvas = await html2canvas(boardRef.current, {
                backgroundColor: "#000000",
                scale: 2,
            });

            const dataUrl = canvas.toDataURL("image/png");
            console.log("Generated share image", dataUrl.slice(0, 50) + "...");

            // Construct share text
            const text = `I scored ${score} in 2048 Base Edition! Can you beat me?`;

            // For this task, we'll just simulate the "Share Score" button action.
            alert("Share image generated! (In production, this would open a share dialog)");

        } catch (e) {
            console.error("Share failed", e);
        }
    };

    if (!initialized) return null;

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
                <div>
                    <h1 className="text-3xl font-bold text-base-blue">2048</h1>
                    <p className="text-sm text-base-teal font-medium">Base Edition</p>
                </div>
                <ScoreBoard score={score} bestScore={bestScore} />
            </div>

            {/* Game Board */}
            <div className="relative" ref={boardRef}>
                <Board grid={grid} onMove={move} />
                <Overlay
                    won={won}
                    gameOver={gameOver}
                    onRestart={startNewGame}
                    onContinue={continueGame}
                />
            </div>

            {/* Controls / Footer */}
            <div className="flex gap-4 w-full justify-center">
                <button
                    onClick={startNewGame}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
                >
                    New Game
                </button>
                <button
                    onClick={handleShare}
                    className="px-6 py-3 bg-base-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                >
                    Share Score
                </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
                Merge tiles to reach 2048. <br />
                Use arrow keys or swipe to move.
            </p>
        </div>
    );
}
