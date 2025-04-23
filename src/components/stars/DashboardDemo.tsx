import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useMemo, useState } from "react";
import { usePlace } from "../../context/PlaceContext";
import { places } from "../../data/placesData";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CountUp } from "countup.js";

export default function DashboardDemo() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useScroll({ container: containerRef });

    const {
        selectedPlace = "seoulPlaza",
        triggerCountUp,
        setTriggerCountUp,
    } = usePlace();
    const place = places[selectedPlace] ?? places["seoulPlaza"];

    const visitorCountRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (triggerCountUp && visitorCountRef.current) {
            const countUp = new CountUp(
                visitorCountRef.current,
                place.todayVisitors,
                {
                    duration: 2,
                    useEasing: true,
                    separator: ",",
                }
            );
            countUp.start();
            setTriggerCountUp(false);
        }
    }, [triggerCountUp, place, setTriggerCountUp]);

    const dummyPOIs = useMemo(
        () =>
            Array.from({ length: 30 }, (_, i) => ({
                name: `상권 ${i + 1}번`,
                address: `서울 중구 상권로 ${i + 1}길`,
                tel: `02-0000-00${String(i + 1).padStart(2, "0")}`,
            })),
        []
    );

    const [cardStyles, setCardStyles] = useState<{
        [key: number]: { opacity: number; y: number };
    }>({});
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const updateStyles = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerBottom = containerRect.bottom;
            const fadeMargin = 150;

            const newStyles: { [key: number]: { opacity: number; y: number } } =
                {};

            cardRefs.current.forEach((el, i) => {
                if (!el) return;

                const cardRect = el.getBoundingClientRect();
                const cardCenter = cardRect.top + cardRect.height / 2;

                // 👉 중앙~fade 시작 전까지는 opacity 1
                if (
                    cardCenter >= containerTop + fadeMargin &&
                    cardCenter <= containerBottom - fadeMargin
                ) {
                    newStyles[i] = { opacity: 1, y: 0 };
                    return;
                }

                // 👉 fade 영역 진입 시 opacity를 서서히 줄임
                let opacity = 1;
                let y = 0;

                if (cardCenter < containerTop + fadeMargin) {
                    const ratio = (cardCenter - containerTop) / fadeMargin;
                    opacity = Math.max(0, ratio);
                    y = -30 * (1 - ratio); // 아래쪽으로 자연스레 이동
                } else if (cardCenter > containerBottom - fadeMargin) {
                    const ratio = (containerBottom - cardCenter) / fadeMargin;
                    opacity = Math.max(0, ratio);
                    y = 30 * (1 - ratio); // 위쪽으로 자연스레 이동
                }

                newStyles[i] = { opacity, y };
            });

            setCardStyles(newStyles);
        };

        updateStyles();
        const interval = setInterval(updateStyles, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-screen w-full overflow-y-scroll bg-gray-100 text-black px-24 py-[150px]"
        >
            <motion.div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-4">
                <motion.div
                    className="col-span-3 bg-white rounded-xl shadow-md p-4 my-2"
                    whileHover={{ y: -6 }}
                    animate={cardStyles[0]}
                    style={cardStyles[0]}
                    ref={(el) => {
                        cardRefs.current[0] = el;
                    }}
                >
                    <p className="text-sm text-gray-500">현재 유동 인구수</p>
                    <p className="text-4xl font-bold mt-2">
                        <span ref={visitorCountRef}></span>명
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        {new Date().toLocaleString()} 기준
                    </p>
                </motion.div>

                <motion.div
                    className="col-span-6 bg-white rounded-xl shadow-md p-4 my-2"
                    whileHover={{ y: -6 }}
                    animate={cardStyles[1]}
                    style={cardStyles[1]}
                    ref={(el) => {
                        cardRefs.current[1] = el;
                    }}
                >
                    <p className="text-sm text-gray-500">관광지</p>
                    <p className="text-4xl font-bold mt-2">{place.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {place.address}
                    </p>
                </motion.div>

                <motion.div
                    className="col-span-3 bg-white rounded-2xl shadow-md p-6 flex items-center justify-center text-md md:text-4xl sm:text-2xl font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white cursor-pointer my-2"
                    whileHover={{ y: -8 }}
                    animate={cardStyles[2]}
                    style={cardStyles[2]}
                    ref={(el) => {
                        cardRefs.current[2] = el;
                    }}
                    onClick={() => window.fullpage_api?.moveSectionUp()}
                >
                    돌아가기 ↑
                </motion.div>

                <motion.div
                    className="col-span-6 bg-white rounded-xl shadow-md p-4 my-2"
                    whileHover={{ y: -6 }}
                    animate={cardStyles[3]}
                    style={cardStyles[3]}
                    ref={(el) => {
                        cardRefs.current[3] = el;
                    }}
                >
                    <p className="text-sm text-gray-500">현재 날씨</p>
                    <p className="text-3xl font-bold">23℃</p>
                    <p className="text-xs text-gray-400 mt-1">
                        PM10 : 45㎍/㎥ · 강수확률 : 10%
                    </p>
                    <div className="flex justify-between mt-4 text-sm">
                        {["12시", "04시", "08시", "12시", "16시", "20시"].map(
                            (t, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center"
                                >
                                    <span>{t}</span>
                                    <span>☀️</span>
                                </div>
                            )
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className="col-span-6 bg-white rounded-xl shadow-md p-4 my-2"
                    whileHover={{ y: -6 }}
                    animate={cardStyles[4]}
                    style={cardStyles[4]}
                    ref={(el) => {
                        cardRefs.current[4] = el;
                    }}
                >
                    <p className="text-sm text-gray-500 mb-2">유동인구 추이</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={place.weeklyStats}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="population"
                                stroke="#60A5FA"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    className="col-span-4 bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 my-2"
                    whileHover={{ y: -6 }}
                    animate={cardStyles[5]}
                    style={cardStyles[5]}
                    ref={(el) => {
                        cardRefs.current[5] = el;
                    }}
                >
                    <img
                        src={place.image}
                        alt="preview"
                        className="rounded-xl object-cover w-full h-40"
                    />
                    <div>
                        <p className="text-sm text-gray-700 font-semibold">
                            AI 리뷰 분석
                        </p>
                        <p className="text-xs text-gray-500">
                            Good : 혼잡도 완화여지
                            <br />
                            Bad : 날씨로 인한 만족도 하락
                        </p>
                        <div className="w-full h-24 flex items-center justify-center">
                            <span className="text-2xl">📈</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="col-span-4 bg-white rounded-xl shadow-md p-4 my-2"
                    whileHover={{ y: -6 }}
                    animate={cardStyles[6]}
                    style={cardStyles[6]}
                    ref={(el) => {
                        cardRefs.current[6] = el;
                    }}
                >
                    <p className="text-sm text-gray-500">관련 정보</p>
                    <p className="text-xs text-gray-400 mt-2">
                        예시 텍스트 예시 텍스트 예시 텍스트
                    </p>
                </motion.div>

                <motion.div
                    className="col-span-4 bg-white rounded-xl shadow-md p-4 my-2"
                    whileHover={{ y: -6 }}
                    animate={cardStyles[7]}
                    style={cardStyles[7]}
                    ref={(el) => {
                        cardRefs.current[7] = el;
                    }}
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

                <motion.div className="col-span-12 grid grid-cols-3 gap-4 mt-4 my-2">
                    {dummyPOIs.map((poi, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white rounded-xl shadow-lg p-4 my-2"
                            whileHover={{ y: -6 }}
                            animate={cardStyles[idx + 8]}
                            style={cardStyles[idx + 8]}
                            ref={(el) => {
                                cardRefs.current[idx + 8] = el;
                            }}
                        >
                            <p className="text-md font-bold">{poi.name}</p>
                            <p className="text-sm text-gray-500">
                                {poi.address}
                            </p>
                            <p className="text-sm text-gray-700 mt-1">
                                ☎ {poi.tel}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
