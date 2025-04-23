export const getDustColor = (status: string): string => {
    switch (status) {
        case "좋음":
            return "text-green-500";
        case "보통":
            return "text-blue-500";
        case "나쁨":
            return "text-orange-500";
        case "매우나쁨":
            return "text-red-500";
        default:
            return "text-gray-500";
    }
};