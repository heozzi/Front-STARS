import { getDustColor } from "./dustColor";

export const WeatherCard = ({
                                date,
                                hour,
                                icon,
                                status,
                                temperature,
                                dust,
                            }: {
    date: string;
    hour: string;
    icon: string;
    status: string;
    temperature: string;
    dust: { fineDust: string; ultraFineDust: string };
}) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
        <div className="p-2 text-center text-base font-medium bg-blue-100 border-b border-blue-200 text-black">
            {date}
            <div className="text-sm text-blue-700">{hour}</div>
        </div>
        <div className="p-3 text-center">
            <div className="text-4xl mb-2">{icon}</div>
            <div className="text-sm mb-1 text-black">{status}</div>
            <div className="font-bold text-2xl text-blue-800">{temperature}</div>
        </div>
        <div className="border-t border-gray-200 p-2 bg-gray-50">
            <div className="flex justify-between items-center mb-1 text-sm">
                <div className="font-medium text-black">미세먼지:</div>
                <div className={`font-medium ${getDustColor(dust.fineDust)}`}>
                    {dust.fineDust}
                </div>
            </div>
            <div className="flex justify-between items-center text-sm">
                <div className="font-medium text-black">초미세먼지:</div>
                <div
                    className={`font-medium ${getDustColor(dust.ultraFineDust)}`}
                >
                    {dust.ultraFineDust}
                </div>
            </div>
        </div>
    </div>
);