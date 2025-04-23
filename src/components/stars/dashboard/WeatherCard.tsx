import { motion } from "framer-motion";
import React from "react";

interface WeatherCardProps {
    style: { opacity: number; y: number };
    cardRef: (el: HTMLDivElement | null) => void;
}

export default function WeatherCard({ style, cardRef }: WeatherCardProps) {
    return (
        <motion.div
            className="col-span-6 bg-white rounded-xl shadow-md p-4 my-2"
            whileHover={{ y: -6 }}
            animate={style}
            style={style}
            ref={cardRef}
        >
            <p className="text-sm text-gray-500">현재 날씨</p>
            <p className="text-3xl font-bold">23℃</p>
            <p className="text-xs text-gray-400 mt-1">
                PM10 : 45㎣/㎤ · 강수확률 : 10%
            </p>
            <div className="flex justify-between mt-4 text-sm">
                {["12시", "04시", "08시", "12시", "16시", "20시"].map(
                    (t, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <span>{t}</span>
                            <span>☀️</span>
                        </div>
                    )
                )}
            </div>
        </motion.div>
    );
}
