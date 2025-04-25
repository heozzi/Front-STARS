import { Routes, Route } from "react-router-dom";
import FullPageLayout from "../layouts/FullPageLayout";
import AdminPage from "../pages/admin/AdminPage";
import AdminDetail from "../components/admin/AdminDetail";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<FullPageLayout />} />
            <Route path="/manage" element={<AdminPage />} />
            <Route path="/manage/:spotCode" element={<AdminDetail />} />
        </Routes>
    );
}
