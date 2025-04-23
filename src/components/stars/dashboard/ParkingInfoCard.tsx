import { motion } from "framer-motion";

interface ParkingInfoCardProps {
    style: { opacity: number; y: number };
    cardRef: (el: HTMLDivElement | null) => void;
}

export default function ParkingInfoCard({
    style,
    cardRef,
}: ParkingInfoCardProps) {
    return (
        <motion.div
            className="col-span-4 bg-white rounded-xl shadow-md p-4 my-2"
            whileHover={{ y: -6 }}
            animate={style}
            style={style}
            ref={cardRef}
        >
            <p className="text-sm text-gray-500">주차 정보</p>
            <div className="flex gap-2 mt-2">
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 h-16 bg-gray-100 rounded-xl"
                    />
                ))}
            </div>
        </motion.div>
    );
}
