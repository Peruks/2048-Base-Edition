import { Grid, Direction, TileData } from "./types";

export const GRID_SIZE = 4;

export function createEmptyGrid(): Grid {
    return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
}

function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function spawnTile(grid: Grid): Grid {
    const newGrid = grid.map((row) => [...row]);
    const emptyCells: { r: number; c: number }[] = [];

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (newGrid[r][c] === null) {
                emptyCells.push({ r, c });
            }
        }
    }

    if (emptyCells.length === 0) return newGrid;

    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newGrid[r][c] = {
        id: generateId(),
        value: Math.random() < 0.9 ? 2 : 4,
    };
    return newGrid;
}

export function moveGrid(grid: Grid, direction: Direction): { grid: Grid; score: number; moved: boolean } {
    let newGrid = grid.map((row) => [...row]);
    let score = 0;
    let moved = false;

    // Helper to rotate grid
    const rotateLeft = (g: Grid) => {
        const res = createEmptyGrid();
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                res[GRID_SIZE - 1 - c][r] = g[r][c];
            }
        }
        return res;
    };

    const rotateRight = (g: Grid) => {
        const res = createEmptyGrid();
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                res[c][GRID_SIZE - 1 - r] = g[r][c];
            }
        }
        return res;
    };

    const reverseRows = (g: Grid) => g.map(row => [...row].reverse());

    // Normalize to "slide left"
    if (direction === "UP") newGrid = rotateLeft(newGrid);
    if (direction === "RIGHT") newGrid = reverseRows(newGrid);
    if (direction === "DOWN") newGrid = rotateRight(newGrid);

    // Process slide left
    for (let r = 0; r < GRID_SIZE; r++) {
        const row = newGrid[r];
        // Filter out nulls
        let newRow: (TileData | null)[] = row.filter((tile) => tile !== null);

        // Merge
        for (let i = 0; i < newRow.length - 1; i++) {
            const current = newRow[i];
            const next = newRow[i + 1];

            if (current && next && current.value === next.value) {
                // Merge!
                // We keep the ID of the 'current' tile or generate a new one?
                // To animate nicely, we might want to keep one ID.
                // But strictly, it's a new tile.
                // Let's create a new merged tile.
                newRow[i] = {
                    id: generateId(), // New ID for the merged tile
                    value: current.value * 2
                };
                score += current.value * 2;
                newRow[i + 1] = null; // Mark for removal
                i++; // Skip next since it's merged
            }
        }

        // Filter out nulls again (from merges)
        newRow = newRow.filter((tile) => tile !== null);

        // Pad with nulls
        while (newRow.length < GRID_SIZE) {
            newRow.push(null);
        }

        // Check if row changed
        // Simple ID check isn't enough because IDs change on merge.
        // We check if the sequence of values or IDs changed.
        const rowIds = row.map(t => t?.id).join(",");
        const newRowIds = newRow.map(t => t?.id).join(",");

        if (rowIds !== newRowIds) {
            moved = true;
        }

        newGrid[r] = newRow;
    }

    // Rotate back
    if (direction === "UP") newGrid = rotateRight(newGrid);
    if (direction === "RIGHT") newGrid = reverseRows(newGrid);
    if (direction === "DOWN") newGrid = rotateLeft(newGrid);

    return { grid: newGrid, score, moved };
}

export function checkGameOver(grid: Grid): boolean {
    // Check for empty cells
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            if (grid[r][c] === null) return false;
        }
    }

    // Check for possible merges
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const tile = grid[r][c];
            if (!tile) continue; // Should not happen if check above passed

            // Check right
            if (c < GRID_SIZE - 1) {
                const right = grid[r][c + 1];
                if (right && right.value === tile.value) return false;
            }

            // Check down
            if (r < GRID_SIZE - 1) {
                const down = grid[r + 1][c];
                if (down && down.value === tile.value) return false;
            }
        }
    }

    return true;
}

export function checkWin(grid: Grid): boolean {
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const tile = grid[r][c];
            if (tile && tile.value >= 2048) return true;
        }
    }
    return false;
}
