import React from "react";
import { Routes, Route, useLocation, useNavigate, useParams, useNavigationType } from "react-router-dom";
import CloudPage from "./pages/cloud";
import IndexPage from "./pages/index";
import ProfilePage from "./pages/user";
import PostPage from "./pages/post";
import WizardPage from "./pages/wizard";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/404";
import PostModal from "./components/post/PostModal";


function App() {
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const location = useLocation();

    const prevLocation = React.useRef(location);
    const modal = location.state?.modal;

    React.useEffect(() => {
        if (navigationType !== "POP" && !modal) {
            prevLocation.current = location;
        }
    }, [location, modal, navigationType]);

    const isModalOpen = modal && prevLocation.current !== location;

    return (
        <>
            <Routes location={isModalOpen ? prevLocation.current : location}>
                <Route path="/" element={<IndexPage />} />
                <Route path="/cloud" element={<CloudPage />} />
                <Route path="/user/:username" element={<ProfilePage/>} />
                <Route path="/post/:postId" element={<PostPage/>} />
                <Route path="/wizard" element={<WizardPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
            {isModalOpen && <Route path="/p/:postId" element={<PostModal/>} />}
        </>
    );
}

export default App;