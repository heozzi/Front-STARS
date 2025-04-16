import { RefObject, SetStateAction, useEffect, useRef, useState, Dispatch } from 'react';
import  mapboxgl, { LngLatLike } from 'mapbox-gl';
import { usePlace } from '../context/PlaceContext';
import { motion } from 'framer-motion';
import { places } from '../data/placeData';
import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
// 지금 .env 파일이 안불러와져서 나중에 무조건 삭제할 것
mapboxgl.accessToken = "pk.eyJ1IjoibWluc2Vva3MiLCJhIjoiY205OWcxMXR1MGRheTJpcHd4cXltaWZzYyJ9.llr0SU6AAcTMJHWNQVMP8w";

// 지도 마커 테스트용 데이터타입 정의, 나중에 변경하거나
type MarkerPlace = {
    id: keyof typeof places;
    coords: LngLatLike;
}

const markerPlaces : MarkerPlace[] = [
    { id: 'seoulPlaza', coords: [126.9779692, 37.566535] },
    { id: 'lotteTower', coords: [127.1025, 37.5131] },
];

// JSX를 왜 못찾지????
export default function MapSection(): JSX.Element {
    const mapContainer = useRef<HTMLDivElement>(null);
    const { setSelectedPlace } = usePlace();
    const [showFocusCard, setShowFocusCard] = useState<boolean>(false);
    const [focusedPlace, setFocusedPlace] = useState<keyof typeof places | null>(null);

    const summary = focusedPlace ? places[focusedPlace] : null;

    useEffect(() => {
        if(!mapContainer.current) return;

        // 맵 생성
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/minseoks/cm99kn1ni00fl01sx4ygw7kiq',
            center: [126.9779692, 37.566535],
            zoom: 10,
        });

        // 왼쪽 위에 지도 컨트롤 버튼 추가
        map.addControl(new mapboxgl.NavigationControl(), 'top-left')

        // 지도에 마커 정보 추가
        markerPlaces.forEach((place) => {
            const marker = new mapboxgl.Marker().setLngLat(place.coords).addTo(map);

            marker.getElement().addEventListener('click', () => {
                // 이 둘의 입력 타입이 달라서 둘 중 하나 빨간줄이 그어짐;;;
                setSelectedPlace(place.id);
                setFocusedPlace(place.id);
                map.flyTo({ center: place.coords, zoom: 16, pitch: 45 });
                map.once('moveend', () => {
                    setShowFocusCard(true);
                });
            });
        });

        return () => map.remove();
    }, []);

    return (
        <div className="relative w-screen h-screen">
            <div className="absolute top-6 right-6 z-30">
                <button
                    className="bg-white shadow-md px-4 py-2 rounded-xl font-semibold hover:bg-indigo-500 hover:text-white transition"
                    // fullpage_api를 왜 못찾니???
                    onClick={() => window.fullpage_api.moveSlideRight()}
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
                        className="relative z-20 flex flex-wrap justify-center items-center gap-4 max-w-5xl w-full px-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 방문자 카드 */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg p-4"
                            style={{ willChange: 'transform, opacity' }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -8 }}
                        >
                            <h3 className="text-xl text-gray-500 mb-1">{summary.name} 방문자 수</h3>
                            <p className="text-5xl font-bold text-gray-900">{summary.todayVisitors.toLocaleString()}명</p>
                        </motion.div>

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

                        {/* 더미 카드 */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg p-4"
                            style={{ willChange: 'transform, opacity' }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -8 }}
                        >
                            <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                            <p className="text-4xl font-bold text-green-500">더미데이터입니다</p>
                        </motion.div>

                        {/* 더미 카드2 */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-lg p-4"
                            style={{ willChange: 'transform, opacity' }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -8 }}
                        >
                            <h3 className="text-xl text-gray-500 mb-1">안녕하세요</h3>
                            <p className="text-4xl font-bold text-green-500">더미데이터입니다</p>
                        </motion.div>

                        {/* 자세히 보기 트리거 */}
                        <motion.div
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowFocusCard(false);
                                // fullpage_api를 왜 못찾니???
                                window.fullpage_api.moveSectionDown();
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
                )}
            </motion.div>
        </div>
    );
}