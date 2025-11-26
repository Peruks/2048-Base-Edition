import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "2048 Base Edition",
    description: "Play the classic 2048 game with a Base-themed twist, right inside Farcaster.",
    manifest: "/manifest.json",
    openGraph: {
        title: "2048 Base Edition",
        description: "Play the classic 2048 game with a Base-themed twist, right inside Farcaster.",
        images: ["/api/og"],
    },
    other: {
        "fc:miniapp": "1", // Farcaster Mini App meta tag
    },
};

export const viewport: Viewport = {
    themeColor: "#0052FF",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // Prevent zooming on game
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Farcaster Mini App Meta Tag is handled in metadata.other */}
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
