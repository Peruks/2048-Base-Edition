import { motion } from "framer-motion";

interface SharePreviewProps {
    score: number;
    onShare: () => void;
    onClose: () => void;
}

export default function SharePreview({ score, onShare, onClose }: SharePreviewProps) {
    const shareUrl = `https://2048-base-edition.vercel.app/api/og?score=${score}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
            <div className="flex flex-col items-center w-full max-w-sm gap-6">
                <div className="w-full flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Share Preview</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Image Preview */}
                <div className="w-full aspect-[1.91/1] bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative group">
                    <img
                        src={shareUrl}
                        alt="Share Preview"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="w-full space-y-3">
                    <button
                        onClick={onShare}
                        className="w-full py-4 bg-base-blue text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                    >
                        Share on Warpcast
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gray-800 text-gray-300 rounded-xl font-medium hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
