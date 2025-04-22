// src/App.tsx
import { JSX, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactFullpage from "@fullpage/react-fullpage";

import MapSection from "./components/MapSection";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import DashboardDemo from "./components/DashboardDemo";
import Manage from "./components/Admin";
import AdminLogin from "./components/AdminLogin";

function FullPageLayout(): JSX.Element {
    useEffect(() => {
        const disableScroll = () => {
            if (window.fullpage_api) {
                window.fullpage_api.setAllowScrolling(false);
                window.fullpage_api.setKeyboardScrolling(false);
            }
        };
        setTimeout(disableScroll, 500);
    }, []);

    return (
        <ReactFullpage
            scrollingSpeed={700}
            controlArrows={false}
            credits={{ enabled: false }}
            render={() => {
                return (
                    <ReactFullpage.Wrapper>
                        {/* 첫 번째 섹션: 가로 슬라이드 2개 (지도, 마이페이지) */}
                        <div className="section">
                            <div className="slide">
                                <MapSection />
                            </div>
                            <div className="slide">
                                <AdminLogin />
                            </div>
                        </div>

                        {/* 이후 세로 섹션들 (About, Projects, Contact) */}
                        <div className="section">
                            <DashboardDemo />
                        </div>
                        <div className="section">
                            <Projects />
                        </div>
                        <div className="section">
                            <Contact />
                        </div>
                    </ReactFullpage.Wrapper>
                );
            }}
        />
    );
}

function App(): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FullPageLayout />} />
                <Route path="/manage" element={<Manage />} />
            </Routes>
        </Router>
    );
}

export default App;
