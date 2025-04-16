import { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { CountUp } from 'countup.js';
import { usePlace } from '../context/PlaceContext';
import { motion } from 'framer-motion';
import { places } from '../data/placesData';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface MarkerPlace {
    id: keyof typeof places;
    coords: [number, number];
}

const markerPlaces: MarkerPlace[] = [
    { id: 'seoulPlaza', coords: [126.9779692, 37.566535] },
    { id: 'lotteTower', coords: [127.1025, 37.5131] },
];

export default function MapSection() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const visitorCountRef = useRef<HTMLSpanElement | null>(null);
    const { setSelectedPlace } = usePlace() as { setSelectedPlace: (placeId: string) => void };
    const [showFocusCard, setShowFocusCard] = useState(false);
    const [focusedPlace, setFocusedPlace] = useState<keyof typeof places | null>(null);

    const summary = focusedPlace ? places[focusedPlace] : null;

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/minseoks/cm99kn1ni00fl01sx4ygw7kiq',
            center: [126.9779692, 37.566535] as LngLatLike,
            zoom: 10,
        });

        markerPlaces.forEach((place) => {
            const marker = new mapboxgl.Marker().setLngLat(place.coords).addTo(map);
            const markerElement = marker.getElement();
            markerElement.style.cursor = 'pointer';

            markerElement.addEventListener('click', () => {
                setSelectedPlace(place.id);
                setFocusedPlace(place.id);
                map.flyTo({ center: place.coords, zoom: 16, pitch: 45 });
                map.once('moveend', () => {
                    setShowFocusCard(true);

                    // CountUp 초기화 및 실행
                    if (visitorCountRef.current && places[place.id]) {
                        const countUp = new CountUp(visitorCountRef.current, places[place.id].todayVisitors, { duration: 5 });
                        if (!countUp.error) {
                            countUp.start();
                        } else {
                            console.error(countUp.error);
                        }
                    }
                });
            });
        });

        return () => map.remove();
    }, [setSelectedPlace]);

    return (
        <div className="relative w-screen h-screen">
            <div className="absolute top-6 right-6 z-30">
                <button
                    className="bg-white shadow-md px-4 py-2 text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition"
                    onClick={() => window.fullpage_api?.moveSlideRight()}
                >
                    마이페이지 →
                </button>
            </div>
            <div className="w-full h-full" ref={mapContainer} />

            {/* 포커스 카드 영역 */}
            <motion.div
                className={`absolute inset-0 z-20 flex justify-center items-center transition-opacity duration-500 ${
                    showFocusCard ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                initial={false}
                animate={{ opacity: showFocusCard ? 1 : 0 }}
            >
                {/* 배경 블러 */}
                <div
                    className="absolute inset-0 z-10 bg-white/30 backdrop-blur-sm transition-all duration-500"
                    onClick={() => setShowFocusCard(false)}
                />
                {/* 카드들 */}
                {summary && (
                    <div
                        className="relative z-20 flex flex-col items-center gap-6 max-w-5xl w-full px-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 방문자 카드 - 중앙 정렬, 단독 */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg p-4 w-2/5 content-center"
                            style={{ willChange: 'transform, opacity' }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -8 }}
                        >
                            <h3 className="text-xl text-gray-500 mb-1">{summary.name} 방문자 수</h3>
                            <p className="text-5xl font-bold text-gray-900">
                                <span ref={visitorCountRef}></span>명
                            </p>
                        </motion.div>

                        {/* 나머지 카드들 - 행사, 키워드, 자세히 보기 */}
                        <div className="flex flex-wrap justify-center items-start gap-4 w-full">
                            {/* 행사 카드 */}
                            <motion.div
                                className="bg-red-500 text-white rounded-2xl shadow-lg p-4"
                                style={{ willChange: 'transform, opacity' }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -8 }}
                            >
                                <h3 className="text-xl font-medium mb-1">행사</h3>
                                <ul className="text-2xl space-y-1">
                                    {summary.events.map((e, idx) => (
                                        <li key={idx}>{e}</li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* 키워드 카드 */}
                            <motion.div
                                className="bg-blue-600 text-white w-1/5 rounded-2xl shadow-lg p-4"
                                style={{ willChange: 'transform, opacity' }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -8 }}
                            >
                                <h3 className="text-xl font-medium mb-1">관심 키워드</h3>
                                <div className="flex flex-wrap gap-2">
                                    {summary.tags.map((tag) => (
                                        <span key={tag} className="bg-white/20 text-white text-l px-3 py-1 rounded-full">#{tag}</span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 자세히 보기 */}
                            <motion.div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFocusCard(false);
                                    window.fullpage_api?.moveSectionDown();
                                }}
                                className="cursor-pointer bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-4xl font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                                style={{ willChange: 'transform, opacity' }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -8 }}
                            >
                                자세히 보기 →
                            </motion.div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}