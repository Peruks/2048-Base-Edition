import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Score {
    name: string;
    score: number;
    date: string;
}

export default function Leaderboard({ onClose }: { onClose: () => void }) {
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch scores from API
        fetch("/api/leaderboard")
            .then((res) => res.json())
            .then((data) => {
                setScores(data.scores || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch leaderboard", err);
                setLoading(false);
            });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-base-blue">Leaderboard</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-8 text-gray-400">Loading scores...</div>
                ) : scores.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No scores yet. Be the first!</div>
                ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {scores.map((s, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center p-3 bg-gray-800 rounded-xl border border-gray-700/50"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${i === 0
                                                ? "bg-yellow-500 text-black"
                                                : i === 1
                                                    ? "bg-gray-400 text-black"
                                                    : i === 2
                                                        ? "bg-orange-700 text-white"
                                                        : "bg-gray-700 text-gray-300"
                                            }`}
                                    >
                                        {i + 1}
                                    </span>
                                    <span className="font-medium text-gray-200 truncate max-w-[120px]">
                                        {s.name || "Anonymous"}
                                    </span>
                                </div>
                                <span className="font-bold text-base-teal">{s.score}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Top scores from all players.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
