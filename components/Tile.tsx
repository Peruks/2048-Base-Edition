import { motion } from "framer-motion";
import { clsx } from "clsx";

interface TileProps {
    value: number;
    id: string;
}

const COLORS: Record<number, string> = {
    2: "bg-base-blue text-white",
    4: "bg-base-teal text-white",
    8: "bg-base-yellow text-black",
    16: "bg-orange-500 text-white",
    32: "bg-red-500 text-white",
    64: "bg-red-600 text-white",
    128: "bg-yellow-300 text-black shadow-[0_0_10px_#FFD600]",
    256: "bg-yellow-400 text-black shadow-[0_0_15px_#FFD600]",
    512: "bg-yellow-500 text-black shadow-[0_0_20px_#FFD600]",
    1024: "bg-yellow-600 text-white shadow-[0_0_25px_#FFD600]",
    2048: "bg-black text-base-yellow border-2 border-base-yellow shadow-[0_0_30px_#FFD600]",
};

export default function Tile({ value, id }: TileProps) {
    const colorClass = COLORS[value] || "bg-black text-white";

    return (
        <motion.div
            layoutId={id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}
            className={clsx(
                "w-full h-full rounded-lg flex items-center justify-center font-bold text-2xl md:text-3xl select-none",
                colorClass
            )}
        >
            {value}
        </motion.div>
    );
}
