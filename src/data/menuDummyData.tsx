// src/data/menuDummyData.ts

export interface MenuItem {
    id: number;
    name: string;
    address: string;
    category: string;
    preferredGender: string;
    preferredAgeGroup: string;
}

export const menuDummyData: MenuItem[] = [
    { id: 1, name: "카페 모카", address: "서울 강남구", category: "카페", preferredGender: "남성", preferredAgeGroup: "20대" },
    { id: 2, name: "스타벅스 종로점", address: "서울 종로구", category: "카페", preferredGender: "여성", preferredAgeGroup: "30대" },
    { id: 3, name: "홍대 맛집", address: "서울 마포구", category: "음식점", preferredGender: "남성", preferredAgeGroup: "20대" },
    { id: 4, name: "이태원 펍", address: "서울 용산구", category: "펍", preferredGender: "여성", preferredAgeGroup: "30대" },
    { id: 5, name: "강남 클럽", address: "서울 강남구", category: "클럽", preferredGender: "남성", preferredAgeGroup: "20대" },
    { id: 6, name: "북촌 한옥마을", address: "서울 종로구", category: "관광지", preferredGender: "여성", preferredAgeGroup: "40대" },
    { id: 7, name: "롯데월드", address: "서울 송파구", category: "테마파크", preferredGender: "남성", preferredAgeGroup: "10대" },
    { id: 8, name: "코엑스몰", address: "서울 강남구", category: "쇼핑몰", preferredGender: "여성", preferredAgeGroup: "30대" },
    { id: 9, name: "남산타워", address: "서울 중구", category: "관광지", preferredGender: "남성", preferredAgeGroup: "20대" },
    { id: 10, name: "청계천", address: "서울 종로구", category: "산책로", preferredGender: "여성", preferredAgeGroup: "40대" },
    // 추가 데이터 생성
    ...Array.from({ length: 40 }, (_, i) => ({
        id: i + 11,
        name: `가게 ${i + 11}`,
        address: `서울 랜덤구 ${i + 11}번지`,
        category: ["카페", "음식점", "펍", "관광지", "테마파크", "쇼핑몰", "산책로"][i % 7],
        preferredGender: ["남성", "여성"][i % 2],
        preferredAgeGroup: ["10대", "20대", "30대", "40대", "50대", "60대", "70대", "80대"][i % 8],
    })),
];




















