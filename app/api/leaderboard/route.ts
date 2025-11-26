import { NextResponse } from "next/server";

// In-memory store for demonstration (will reset on server restart)
// For production, use Vercel KV: https://vercel.com/docs/storage/vercel-kv
let mockScores = [
    { name: "BaseGod", score: 2048, date: new Date().toISOString() },
    { name: "Warpcaster", score: 1024, date: new Date().toISOString() },
    { name: "Anon", score: 512, date: new Date().toISOString() },
];

export async function GET() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
        scores: mockScores.sort((a, b) => b.score - a.score).slice(0, 10),
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, score } = body;

        if (!name || typeof score !== "number") {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const newScore = {
            name: name.slice(0, 15), // Limit name length
            score,
            date: new Date().toISOString(),
        };

        mockScores.push(newScore);
        mockScores.sort((a, b) => b.score - a.score);
        mockScores = mockScores.slice(0, 50); // Keep top 50 in memory

        return NextResponse.json({ success: true, score: newScore });
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
