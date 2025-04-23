import { motion } from "framer-motion";
import React from "react";

interface VisitorCountCardProps {
    refEl: React.RefObject<HTMLSpanElement | null>;
    style: { opacity: number; y: number };
    cardRef: (el: HTMLDivElement | null) => void;
}

export default function VisitorCountCard({
    refEl,
    cardRef,
    style,
}: VisitorCountCardProps) {
    return (
        <motion.div
            className="col-span-3 bg-white rounded-xl shadow-md p-4 my-2"
            whileHover={{ y: -6 }}
            animate={style}
            style={style}
            ref={cardRef}
        >
            <p className="text-sm text-gray-500">현재 유동 인구수</p>
            <p className="text-4xl font-bold mt-2">
                <span ref={refEl}></span>명
            </p>
            <p className="text-xs text-gray-400 mt-1">
                {new Date().toLocaleString()} 기준
            </p>
        </motion.div>
    );
}
