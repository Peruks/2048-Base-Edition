"use client";

import { useEffect, useRef } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import html2canvas from "html2canvas";
"use client";

import { useEffect, useRef, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import html2canvas from "html2canvas";

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
        if (gameOver || showLeaderboard || showSharePreview) return;

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
}, [move, gameOver, showLeaderboard, showSharePreview]);

const handleShare = () => {
    const shareText = encodeURIComponent(`I scored ${score} in 2048 Base Edition! Can you beat me?`);
    const shareEmbed = encodeURIComponent(`https://2048-base-edition.vercel.app/?score=${score}`);
    const url = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${shareEmbed}`;

    sdk.actions.openUrl(url);
    setShowSharePreview(false);
};

if (!initialized) return null;

return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
            <div>
                <h1 className="text-3xl font-bold text-base-blue">2048</h1>
                <p className="text-sm text-base-teal font-medium">Base Edition</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setShowLeaderboard(true)}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    title="Leaderboard"
                >
                    🏆
                </button>
                <ScoreBoard score={score} bestScore={bestScore} />
            </div>
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

            {showLeaderboard && (
                <Leaderboard onClose={() => setShowLeaderboard(false)} />
            )}

            {showSharePreview && (
                <SharePreview
                    score={score}
                    onShare={handleShare}
                    onClose={() => setShowSharePreview(false)}
                />
            )}
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
                onClick={() => setShowSharePreview(true)}
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
