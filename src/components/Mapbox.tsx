import { useRef, useEffect } from "react";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// mapbox-gl 엑세스 토큰
mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN;

// 초기 위치
const INITIAL_CENTER: LngLatLike = [126.978, 37.5165]; // 서울 시청 좌표
const INITIAL_ZOOM = 11;
const INITIAL_PITCH = 0;

function Mapbox() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);

  // 지도 초기화
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/minseoks/cm99kn1ni00fl01sx4ygw7kiq",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      pitch: INITIAL_PITCH,
    });

    // 컨트롤러 추가
    // 사용자 현재위치 조회(정확한 위치, 헤딩 표시)
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        })
    );

    // 줌인, 줌아웃, 북향
    map.addControl(
        new mapboxgl.NavigationControl(), 'top-right'
    )

    mapRef.current = map;
    return () => map.remove();
  }, []);

  // 지도 전체화면(패딩, 마진 없이)
  return (
    <div
        ref={mapContainerRef}
        className="fixed top-0 left-0 w-screen h-screen z-0 m-0 p-0"
    />

  );
}

export default Mapbox;
