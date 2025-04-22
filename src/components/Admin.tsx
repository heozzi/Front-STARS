import React, { useRef, useEffect } from 'react';

// 데이터 인터페이스
interface TouristSpot {
    name: string;
    code: string;
    status: string;
}

interface WeatherCard {
    date: string;
    hour: string;
    status: string;
    icon: string;
    temperature: string;
    dust: {
        fineDust: string;
        ultraFineDust: string;
    }
}

interface TouristInfo {
    spotName: string;
    spotCode: string;
    timestamp: string;
    participantCount: string;
}

function Admin() {
    // 스크롤 관련 참조
    const spotsScrollRef = useRef<HTMLDivElement>(null);
    const touristInfoScrollRef = useRef<HTMLDivElement>(null);

    // 컴포넌트 마운트 시 실행
    useEffect(() => {
        // fullpage.js 스크롤 비활성화
        if (window.fullpage_api) {
            window.fullpage_api.setAllowScrolling(false);
            window.fullpage_api.setKeyboardScrolling(false);
        }

        // 커스텀 스타일 추가
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .custom-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
            }
            
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, 0.3);
                border-radius: 3px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: rgba(0, 0, 0, 0.5);
            }
            
            /* 백업 스크롤 방지 */
            body.disable-scroll {
                overflow: hidden !important;
            }
            
            .fp-section, .fp-slide, .fp-slidesContainer {
                overflow: visible !important;
            }
        `;
        document.head.appendChild(styleElement);

        // 전역 스크롤 이벤트 핸들러
        const handleGlobalWheel = (e: WheelEvent) => {
            const isInSpotsScroll = spotsScrollRef.current?.contains(e.target as Node) || false;
            const isInTouristInfoScroll = touristInfoScrollRef.current?.contains(e.target as Node) || false;

            if (isInSpotsScroll || isInTouristInfoScroll) {
                e.stopPropagation();
            }
        };

        // 이벤트 리스너 등록
        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        document.body.classList.add('disable-scroll');

        return () => {
            document.removeEventListener('wheel', handleGlobalWheel);
            document.body.classList.remove('disable-scroll');
            document.head.removeChild(styleElement);
        };
    }, []);

    // 스팟 카드 스크롤 관련 함수들
    useEffect(() => {
        if (!spotsScrollRef.current) return;

        const handleSpotsWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const scrollAmount = e.deltaY;
            const currentScrollTop = spotsScrollRef.current?.scrollTop || 0;
            const newScrollTop = currentScrollTop + scrollAmount;

            if (spotsScrollRef.current) {
                spotsScrollRef.current.scrollTop = newScrollTop;
            }
        };

        spotsScrollRef.current.addEventListener('wheel', handleSpotsWheel, { passive: false });

        return () => {
            spotsScrollRef.current?.removeEventListener('wheel', handleSpotsWheel);
        };
    }, [spotsScrollRef]);

    // 관광지 정보 스크롤 관련 함수들
    useEffect(() => {
        if (!touristInfoScrollRef.current) return;

        const handleTouristInfoWheel = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const scrollAmount = e.deltaY;
            const currentScrollTop = touristInfoScrollRef.current?.scrollTop || 0;
            const newScrollTop = currentScrollTop + scrollAmount;

            if (touristInfoScrollRef.current) {
                touristInfoScrollRef.current.scrollTop = newScrollTop;
            }
        };

        touristInfoScrollRef.current.addEventListener('wheel', handleTouristInfoWheel, { passive: false });

        return () => {
            touristInfoScrollRef.current?.removeEventListener('wheel', handleTouristInfoWheel);
        };
    }, [touristInfoScrollRef]);

    // 미세먼지 상태에 따른 색상 반환 함수
    const getDustColor = (status: string) => {
        switch(status) {
            case '좋음':
                return 'text-green-500';
            case '보통':
                return 'text-blue-500';
            case '나쁨':
                return 'text-orange-500';
            case '매우나쁨':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    // 샘플 데이터
    const touristSpots: TouristSpot[] = [
        // 여의도 지역
        { name: '여의도 한강공원', code: 'POI072', status: '붐빔' },
        { name: '국회의사당', code: 'POI073', status: '붐빔' },
        { name: '63스퀘어', code: 'POI074', status: '매우 붐빔' },
        { name: '여의도 봄꽃축제거리', code: 'POI075', status: '매우 붐빔' },
        { name: 'IFC몰', code: 'POI076', status: '붐빔' },

        // 강남 지역
        { name: '강남역', code: 'POI001', status: '매우 붐빔' },
        { name: '코엑스', code: 'POI002', status: '붐빔' },
        { name: '삼성역', code: 'POI003', status: '붐빔' },
        { name: '압구정 로데오거리', code: 'POI004', status: '붐빔' },
        { name: '청담동 명품거리', code: 'POI005', status: '매우 붐빔' },

        // 명동/종로 지역
        { name: '명동 쇼핑거리', code: 'POI011', status: '매우 붐빔' },
        { name: '경복궁', code: 'POI012', status: '붐빔' },
        { name: '창덕궁', code: 'POI013', status: '붐빔' },
        { name: '광화문 광장', code: 'POI014', status: '붐빔' },
        { name: '인사동', code: 'POI015', status: '매우 붐빔' },

        // 홍대/이태원 지역
        { name: '홍대 걷고싶은거리', code: 'POI021', status: '매우 붐빔' },
        { name: '연남동', code: 'POI022', status: '붐빔' },
        { name: '경의선 숲길', code: 'POI023', status: '붐빔' },
        { name: '이태원 거리', code: 'POI024', status: '붐빔' },
        { name: '한강진역', code: 'POI025', status: '매우 붐빔' },

        // 한강 주변
        { name: '반포 한강공원', code: 'POI031', status: '붐빔' },
        { name: '뚝섬 한강공원', code: 'POI032', status: '매우 붐빔' },
        { name: '망원 한강공원', code: 'POI033', status: '붐빔' },
        { name: '잠실 한강공원', code: 'POI034', status: '매우 붐빔' },
        { name: '난지 한강공원', code: 'POI035', status: '붐빔' },

        // 북한산/도봉산 지역
        { name: '북한산국립공원', code: 'POI041', status: '매우 붐빔' },
        { name: '도봉산국립공원', code: 'POI042', status: '붐빔' },
        { name: '북한산 둘레길', code: 'POI043', status: '매우 붐빔' },

        // 서울 숲/동대문 지역
        { name: '서울숲공원', code: 'POI051', status: '붐빔' },
        { name: '동대문디자인플라자', code: 'POI052', status: '붐빔' },
        { name: '창신동 봉제골목', code: 'POI053', status: '매우 붐빔' },
        { name: '청계천', code: 'POI054', status: '붐빔' },
        { name: '동대문 쇼핑타운', code: 'POI055', status: '매우 붐빔' },

        // 잠실/송파 지역
        { name: '롯데월드', code: 'POI061', status: '매우 붐빔' },
        { name: '석촌호수', code: 'POI062', status: '붐빔' },
        { name: '올림픽공원', code: 'POI063', status: '매우 붐빔' },
        { name: '방이동 먹자골목', code: 'POI064', status: '붐빔' },
        { name: '가락시장', code: 'POI065', status: '매우 붐빔' },

        // 기타 지역
        { name: '남산타워', code: 'POI081', status: '매우 붐빔' },
        { name: '서울로7017', code: 'POI082', status: '붐빔' },
        { name: '덕수궁', code: 'POI083', status: '매우 붐빔' },
        { name: '창경궁', code: 'POI084', status: '붐빔' },
        { name: '노을공원', code: 'POI085', status: '매우 붐빔' },
    ];

    const weatherData: WeatherCard[] = [
        {
            date: '04-22',
            hour: '오늘',
            status: '맑음',
            icon: '☀️',
            temperature: '21°C',
            dust: {
                fineDust: '매우나쁨',
                ultraFineDust: '나쁨'
            }
        },
        {
            date: '04-23',
            hour: '내일',
            status: '구름조금',
            icon: '🌤️',
            temperature: '19°C',
            dust: {
                fineDust: '보통',
                ultraFineDust: '좋음'
            }
        },
        {
            date: '04-24',
            hour: '2일후',
            status: '비',
            icon: '🌧️',
            temperature: '18°C',
            dust: {
                fineDust: '좋음',
                ultraFineDust: '좋음'
            }
        },
        {
            date: '04-25',
            hour: '3일후',
            status: '흐림',
            icon: '☁️',
            temperature: '20°C',
            dust: {
                fineDust: '나쁨',
                ultraFineDust: '보통'
            }
        },
        {
            date: '04-26',
            hour: '4일후',
            status: '맑음',
            icon: '☀️',
            temperature: '22°C',
            dust: {
                fineDust: '보통',
                ultraFineDust: '좋음'
            }
        },
    ];

    // 관광지 정보 데이터 (미리 정의된 데이터로 교체)
    const touristInfo: TouristInfo[] = [
        {
            spotName: '광화문/덕수궁',
            spotCode: 'POI012',
            timestamp: '2025-04-22 10:05',
            participantCount: '붐빔'
        },
        {
            spotName: '명동 쇼핑거리',
            spotCode: 'POI011',
            timestamp: '2025-04-22 10:15',
            participantCount: '매우 붐빔'
        },
        {
            spotName: '롯데월드',
            spotCode: 'POI061',
            timestamp: '2025-04-22 10:30',
            participantCount: '매우 붐빔'
        },
        {
            spotName: '인사동',
            spotCode: 'POI015',
            timestamp: '2025-04-22 10:45',
            participantCount: '붐빔'
        },
        {
            spotName: '코엑스',
            spotCode: 'POI002',
            timestamp: '2025-04-22 11:00',
            participantCount: '보통'
        },
        {
            spotName: '홍대 걷고싶은거리',
            spotCode: 'POI021',
            timestamp: '2025-04-22 11:15',
            participantCount: '매우 붐빔'
        },
        {
            spotName: '여의도 한강공원',
            spotCode: 'POI072',
            timestamp: '2025-04-22 11:30',
            participantCount: '붐빔'
        },
        {
            spotName: '북한산국립공원',
            spotCode: 'POI041',
            timestamp: '2025-04-22 11:45',
            participantCount: '보통'
        },
        {
            spotName: '반포 한강공원',
            spotCode: 'POI031',
            timestamp: '2025-04-22 12:00',
            participantCount: '붐빔'
        },
        {
            spotName: '청계천',
            spotCode: 'POI054',
            timestamp: '2025-04-22 12:15',
            participantCount: '보통'
        },
        {
            spotName: '강남역',
            spotCode: 'POI001',
            timestamp: '2025-04-22 12:30',
            participantCount: '매우 붐빔'
        },
        {
            spotName: '동대문디자인플라자',
            spotCode: 'POI052',
            timestamp: '2025-04-22 12:45',
            participantCount: '붐빔'
        },
        {
            spotName: '남산타워',
            spotCode: 'POI081',
            timestamp: '2025-04-22 13:00',
            participantCount: '붐빔'
        },
        {
            spotName: '이태원 거리',
            spotCode: 'POI024',
            timestamp: '2025-04-22 13:15',
            participantCount: '보통'
        },
        {
            spotName: '올림픽공원',
            spotCode: 'POI063',
            timestamp: '2025-04-22 13:30',
            participantCount: '보통'
        },
        {
            spotName: '63스퀘어',
            spotCode: 'POI074',
            timestamp: '2025-04-22 13:45',
            participantCount: '붐빔'
        },
        {
            spotName: '경복궁',
            spotCode: 'POI012',
            timestamp: '2025-04-22 14:00',
            participantCount: '매우 붐빔'
        },
        {
            spotName: '석촌호수',
            spotCode: 'POI062',
            timestamp: '2025-04-22 14:15',
            participantCount: '보통'
        },
        {
            spotName: '서울숲공원',
            spotCode: 'POI051',
            timestamp: '2025-04-22 14:30',
            participantCount: '여유'
        },
        {
            spotName: '청담동 명품거리',
            spotCode: 'POI005',
            timestamp: '2025-04-22 14:45',
            participantCount: '붐빔'
        }
    ];

    return (
        <div className="w-full mx-auto bg-gray-100 h-screen flex flex-col">

            {/* 헤더 */}
            <div className="bg-white px-6 py-4 flex justify-between items-center border-b shadow-sm">
                <button
                    className="bg-white shadow-md px-4 py-2 text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition"
                    onClick={() => window.fullpage_api?.moveSlideLeft()} // ← 왼쪽으로 슬라이드 이동
                >
                    ← 돌아가기
                </button>
                <h1 className="text-2xl font-bold text-black">STARS 관리자 통합 화면</h1>
                <div className="w-36"></div> {/* 더미 요소로 제목 중앙 정렬 유지 */}
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="flex flex-1 overflow-hidden p-4">
                {/* 왼쪽 패널 - 여의도 카드 목록 */}
                <div className="w-1/4 p-4 flex flex-col bg-white rounded-lg mr-4 shadow-md" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                    <h2 className="text-xl m-2 font-bold text-black">주요 인구 혼잡 현황</h2>

                    {/* 스크롤 컨테이너 */}
                    <div className="overflow-hidden flex-1 relative" style={{ minHeight: '400px' }}>
                        {/* 스크롤 가능한 카드 영역 */}
                        <div
                            ref={spotsScrollRef}
                            className="overflow-y-auto h-full px-1 custom-scrollbar"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        >
                            <div className="space-y-3">
                                {touristSpots.map((spot, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm relative spot-card border-gray-400 border-2">
                                        <div className="flex justify-between">
                                            <div className="text-lg font-bold text-black">{spot.name}</div>
                                            <div>{spot.status}</div>
                                        </div>
                                        <div className="text-gray-500 text-sm">{spot.code}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 오른쪽 패널 */}
                <div className="w-3/4 flex flex-col" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                    {/* 날씨 카드 영역 - 상단 */}
                    <div className="mb-6 border-2 rounded-lg shadow-md p-4 bg-white">
                        <h2 className="text-xl font-bold mb-4 text-black">날씨 정보</h2>
                        <div className="grid grid-cols-5 gap-4">
                            {weatherData.map((data, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                                    <div className="p-2 text-center text-base font-medium bg-blue-100 border-b border-blue-200 text-black">
                                        {data.date}
                                        <div className="text-sm text-blue-700">{data.hour}</div>
                                    </div>
                                    <div className="p-3 text-center">
                                        <div className="text-4xl mb-2">{data.icon}</div>
                                        <div className="text-sm mb-1 text-black">{data.status}</div>
                                        <div className="font-bold text-2xl text-blue-800">{data.temperature}</div>
                                    </div>
                                    <div className="border-t border-gray-200 p-2 bg-gray-50">
                                        <div className="flex justify-between items-center mb-1 text-sm">
                                            <div className="font-medium text-black">미세먼지:</div>
                                            <div className={`font-medium ${getDustColor(data.dust.fineDust)}`}>
                                                {data.dust.fineDust}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="font-medium text-black">초미세먼지:</div>
                                            <div className={`font-medium ${getDustColor(data.dust.ultraFineDust)}`}>
                                                {data.dust.ultraFineDust}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* 관광지 정보 테이블 - 하단 */}
                    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden border-2">
                        <div className="grid grid-cols-4 bg-gray-100 py-3 border-b font-medium text-lg">
                            <div className="text-center text-black">관광지명</div>
                            <div className="text-center text-black">관광지 코드</div>
                            <div className="text-center text-black">시간(측정시간)</div>
                            <div className="text-center text-black">혼잡도</div>
                        </div>
                        <div
                            ref={touristInfoScrollRef}
                            className="overflow-y-auto flex-1 custom-scrollbar"
                            style={{
                                minHeight: '250px',
                                maxHeight: 'calc(100vh - 350px)'
                            }}
                        >
                            {touristInfo.map((info, index) => (
                                <div key={index} className="grid grid-cols-4 py-4 border-b hover:bg-gray-50 transition-colors">
                                    <div className="text-center text-black">{info.spotName}</div>
                                    <div className="text-center text-black">{info.spotCode}</div>
                                    <div className="text-center text-black">{info.timestamp}</div>
                                    <div className="text-center font-medium text-black">{info.participantCount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;