import { touristInfo, touristSpots, weatherData } from "../../data/adminData";
import {WeatherCard} from "./cards/weatherCard";
import {SpotCard} from "./cards/spotCard";
import AdminHeader from "./AdminHeader";

export default function AdminComponent() {

    return (
        <div className="bg-gray-100 h-auto flex flex-col w-full overflow-y-hidden">
            <AdminHeader />

            <div className="flex flex-1 overflow-hidden p-4">
                <div
                    className="w-1/4 p-4 flex flex-col bg-white rounded-lg mr-4 shadow-md"
                    style={{ maxHeight: "calc(100vh - 100px)" }}
                >
                    <h2 className="text-xl m-2 font-bold text-black">
                        주요 인구 혼잡 현황
                    </h2>
                    <div
                        className="overflow-hidden flex-1 relative"
                        style={{ minHeight: "400px" }}
                    >
                        <div className="overflow-y-auto h-full px-1 space-y-3">
                            {touristSpots.map((spot, idx) => (
                                <SpotCard key={idx} {...spot} />
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    className="w-3/4 flex flex-col"
                    style={{ maxHeight: "calc(100vh - 100px)" }}
                >
                    <div className="mb-6 border-2 rounded-lg shadow-md p-4 bg-white">
                        <h2 className="text-xl font-bold mb-4 text-black">
                            날씨 정보
                        </h2>
                        <div className="grid grid-cols-5 gap-4">
                            {weatherData.map((data, idx) => (
                                <WeatherCard key={idx} {...data} />
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden border-2">
                        <div className="grid grid-cols-4 bg-gray-100 py-3 border-b font-medium text-lg">
                            <div className="text-center text-black">
                                관광지명
                            </div>
                            <div className="text-center text-black">
                                관광지 코드
                            </div>
                            <div className="text-center text-black">
                                시간(측정시간)
                            </div>
                            <div className="text-center text-black">혼잡도</div>
                        </div>
                        <div className="overflow-y-auto flex-1">
                            {touristInfo.map((info, idx) => (
                                <div
                                    key={idx}
                                    className="grid grid-cols-4 py-4 border-b hover:bg-gray-100 transition-colors"
                                >
                                    <div className="text-center text-black">
                                        {info.spotName}
                                    </div>
                                    <div className="text-center text-black">
                                        {info.spotCode}
                                    </div>
                                    <div className="text-center text-black">
                                        {info.timestamp}
                                    </div>
                                    <div className="text-center font-medium text-black">
                                        {info.participantCount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}