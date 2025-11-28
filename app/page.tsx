import dynamic from "next/dynamic";
import ErrorBoundary from "../components/ErrorBoundary";

const GameRoot = dynamic(() => import("../components/GameRoot"), {
    ssr: false,
    loading: () => <div className="text-white">Loading game...</div>,
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white">
            <ErrorBoundary>
                <GameRoot />
            </ErrorBoundary>
        </main>
    );
}
