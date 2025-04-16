// src/components/FocusCard.tsx

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from 'countup.js';
import { places } from '../data/placesData';

interface FocusCardProps {
    placeId: keyof typeof places;
    show: boolean;
    onClose: () => void;
    onDetail: () => void;
}

/**
 * 포커스 카드 컴포넌트
 * - 관광지 클릭 시 상세 요약 정보 + CountUp 방문자 수 표시
 * - 배경 블러, 행사, 키워드, "자세히 보기" 버튼 포함
 */
const FocusCard: React.FC<FocusCardProps> = ({ placeId, show, onClose, onDetail }) => {
    const place = places[placeId];
    const visitorCountRef = useRef<HTMLSpanElement | null>(null);

    // CountUp 실행
    useEffect(() => {
        // ✅ show가 true일 때만 실행
        if (!show || !visitorCountRef.current || !place) return;

        const countUp = new CountUp(visitorCountRef.current, place.todayVisitors, {
            duration: 2,
            useEasing: true,
            separator: ',',
        });

        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }, [placeId, show]);

    return (
        <motion.div
            className={`absolute inset-0 z-20 flex justify-center items-center transition-opacity duration-500 ${
                show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            initial={false}
            animate={{ opacity: show ? 1 : 0 }}
        >
            {/* 배경 블러 */}
            <div
                className="absolute inset-0 z-10 bg-white/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 카드 본문 */}
            <div
                className="relative z-20 flex flex-col items-center gap-6 max-w-5xl w-full px-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 방문자 수 카드 */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-4 w-2/5"
                    whileHover={{ y: -8 }}
                >
                    <h3 className="text-xl text-gray-500 mb-1">{place.name} 방문자 수</h3>
                    <p className="text-5xl font-bold text-gray-900">
                        <span ref={visitorCountRef}></span>명
                    </p>
                </motion.div>

                {/* 행사 & 키워드 & 자세히 보기 */}
                <div className="flex flex-wrap justify-center items-start gap-4 w-full">
                    {/* 행사 */}
                    <motion.div
                        className="bg-red-500 text-white rounded-2xl shadow-lg p-4"
                        whileHover={{ y: -8 }}
                    >
                        <h3 className="text-xl font-medium mb-1">행사</h3>
                        <ul className="text-2xl space-y-1">
                            {place.events.map((e, idx) => (
                                <li key={idx}>{e}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* 키워드 */}
                    <motion.div
                        className="bg-blue-600 text-white w-1/5 rounded-2xl shadow-lg p-4"
                        whileHover={{ y: -8 }}
                    >
                        <h3 className="text-xl font-medium mb-1">관심 키워드</h3>
                        <div className="flex flex-wrap gap-2">
                            {place.tags.map((tag) => (
                                <span key={tag} className="bg-white/20 text-white text-l px-3 py-1 rounded-full">#{tag}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* 자세히 보기 버튼 */}
                    <motion.div
                        onClick={onDetail}
                        className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-4xl font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                        whileHover={{ y: -8 }}
                    >
                        자세히 보기 →
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default FocusCard;