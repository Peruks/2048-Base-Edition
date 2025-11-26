interface ScoreBoardProps {
    score: number;
    bestScore: number;
}

export default function ScoreBoard({ score, bestScore }: ScoreBoardProps) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center bg-gray-800 px-4 py-2 rounded-lg min-w-[80px]">
                <span className="text-xs text-gray-400 uppercase font-bold">Score</span>
                <span className="text-xl font-bold text-white">{score}</span>
            </div>
            <div className="flex flex-col items-center bg-gray-800 px-4 py-2 rounded-lg min-w-[80px]">
                <span className="text-xs text-gray-400 uppercase font-bold">Best</span>
                <span className="text-xl font-bold text-white">{bestScore}</span>
            </div>
        </div>
    );
}
