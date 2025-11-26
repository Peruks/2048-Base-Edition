import { useRef } from "react";
import Tile from "./Tile";
import { Grid, Direction } from "../lib/types";

interface BoardProps {
    grid: Grid;
    onMove: (dir: Direction) => void;
}

export default function Board({ grid, onMove }: BoardProps) {
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current) return;

        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 30) {
            if (absDx > absDy) {
                onMove(dx > 0 ? "RIGHT" : "LEFT");
            } else {
                onMove(dy > 0 ? "DOWN" : "UP");
            }
        }
        touchStart.current = null;
    };

    return (
        <div
            className="relative w-full max-w-[400px] aspect-square bg-gray-900 rounded-xl p-2 touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
                {grid.map((row, r) =>
                    row.map((tile, c) => (
                        <div key={`${r}-${c}`} className="bg-gray-800 rounded-lg relative">
                            {tile && (
                                <Tile
                                    key={tile.id}
                                    id={tile.id}
                                    value={tile.value}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
