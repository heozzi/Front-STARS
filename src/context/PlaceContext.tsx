import { createContext, useContext, useState, ReactNode } from 'react';

type PlaceContextType = {
    selectedPlace: string;
    setSelectedPlace: React.Dispatch<React.SetStateAction<string>>;
};

const PlaceContext = createContext<PlaceContextType | null>(null);

export const PlaceProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPlace, setSelectedPlace] = useState("seoulPlaza");

    return (
        <PlaceContext.Provider value={{ selectedPlace, setSelectedPlace }}>
            {children}
        </PlaceContext.Provider>
    );
};

export const usePlace = () => {
    const context = useContext(PlaceContext);
    if (!context) {
        throw new Error("usePlace must be used within a PlaceProvider");
    }
    return context;
};