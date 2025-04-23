import { Routes, Route } from "react-router-dom";
import FullPageLayout from "../layouts/FullPageLayout";
import AdminPage from "../pages/admin/AdminPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<FullPageLayout />} />
            <Route path="/manage" element={<AdminPage />} />
        </Routes>
    );
}