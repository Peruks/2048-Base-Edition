import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
                <div style={{ display: "flex", fontSize: 100, fontWeight: "bold" }}>
                    2048
                </div>
                <div style={{ display: "flex", fontSize: 40, marginTop: 20 }}>
                    Base Edition
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
