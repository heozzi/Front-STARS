import React from "react";

interface PopulationProps {
    population: {
        area_ppltn_min: number;
        area_ppltn_max: number;
    };
}

const AreaPopulationCard = ({ population }: PopulationProps) => {
    return (
        <div className="bg-white p-2 shadow rounded-lg">
            <h3 className="font-semibold text-sm text-black">현재 인구 추이</h3>
            <p className="text-black text-3xl text-center font-bold">
                {population.area_ppltn_min}명 ~ {population.area_ppltn_max}명
            </p>
        </div>
    );
};
export default AreaPopulationCard;
