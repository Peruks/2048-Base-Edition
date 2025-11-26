import { motion } from "framer-motion";

interface OverlayProps {
    won: boolean;
    gameOver: boolean;
    onRestart: () => void;
    onContinue: () => void;
}

export default function Overlay({ won, gameOver, onRestart, onContinue }: OverlayProps) {
    if (!won && !gameOver) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl"
        >
            <h2 className="text-4xl font-bold mb-4 text-white">
                {won ? "You Win!" : "Game Over"}
            </h2>
            <div className="flex gap-4">
                <button
                    onClick={onRestart}
                    className="px-6 py-2 bg-base-blue text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
                >
                    New Game
                </button>
                {won && (
                    <button
                        onClick={onContinue}
                        className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
                    >
                        Continue
                    </button>
                )}
            </div>
        </motion.div>
    );
}
