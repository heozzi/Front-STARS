import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
    const navigate = useNavigate();

    return (
        <div className="bg-white px-6 py-4 flex items-center relative">
            <button
                className="absolute left-6 bg-white shadow-md px-4 py-2 text-indigo-500 font-semibold hover:bg-indigo-500 hover:text-white transition"
                onClick={() => {
                    alert("보안을 위해 자동 로그아웃됩니다.");
                    navigate("/");
                }}
            >
                ← 돌아가기
            </button>
            <h1 className="text-2xl text-center font-bold text-gray-600 w-full">
                STARS 관리자 통합 화면
            </h1>
        </div>
    );
}