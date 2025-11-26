import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const score = searchParams.get("score") || "0";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(to bottom right, #0052FF, #0EA5A1)",
                    color: "white",
                }}
            >
                <div style={{ display: "flex", fontSize: 80, fontWeight: "bold" }}>
                    2048 Base Edition
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
                    <div style={{ fontSize: 40, opacity: 0.8 }}>SCORE</div>
                    <div style={{ fontSize: 100, fontWeight: "bold", lineHeight: 1 }}>{score}</div>
                </div>
                <div style={{ display: "flex", fontSize: 20, marginTop: 40, opacity: 0.8 }}>
                    Play on Farcaster Mini Apps
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
