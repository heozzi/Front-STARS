import { createContext, useContext, useState, ReactNode } from 'react';

// 👉 1. context에 사용할 타입 정의
type PlaceContextType = {
    selectedPlace: string;
    setSelectedPlace: (place: string) => void;
};

// 👉 2. context 생성 (초기값은 null, 타입은 PlaceContextType | null)
const PlaceContext = createContext<PlaceContextType | null>(null);

// 👉 3. Provider 컴포넌트 정의
export const PlaceProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPlace, setSelectedPlace] = useState<string>('seoulPlaza');

    return (
        <PlaceContext.Provider value={{ selectedPlace, setSelectedPlace }}>
            {children}
        </PlaceContext.Provider>
    );
};

// 👉 4. 커스텀 훅 정의 (null 방지)
export const usePlace = (): PlaceContextType => {
    const context = useContext(PlaceContext);
    if (!context) {
        throw new Error('usePlace must be used within a PlaceProvider');
    }
    return context;
};
