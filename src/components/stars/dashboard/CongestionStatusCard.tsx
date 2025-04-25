import { motion } from "framer-motion";

interface CongestionStatusCardProps {
    status: "원활" | "보통" | "약간붐빔" | "붐빔";
    style: { opacity: number; y: number };
    cardRef: (el: HTMLDivElement | null) => void;
}

const statusColors: Record<string, string> = {
    원활: "bg-green-100 text-green-700",
    보통: "bg-yellow-100 text-yellow-700",
    약간붐빔: "bg-orange-100 text-orange-700",
    붐빔: "bg-red-100 text-red-700",
};

export default function CongestionStatusCard({
    status,
    style,
    cardRef,
}: CongestionStatusCardProps) {
    const color = statusColors[status];

    return (
        <motion.div
            className={`col-span-3 rounded-xl shadow-md p-4 my-2 ${color}`}
            whileHover={{ y: -6 }}
            animate={style}
            style={style}
            ref={cardRef}
        >
            <p className="text-sm font-semibold mb-1">혼잡도 상태</p>
            <p className="text-3xl font-bold">{status}</p>
        </motion.div>
    );
}
