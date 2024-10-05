import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProjectSetup from "./components/ProjectSetup"; // Import your ProjectSetup component
import ProjectLogin from "./components/ProjectLogin"; // Import ProjectLogin
import ChatTable from "./components/ChatTable"; // Import ChatTable if needed

const App = () => {
    const [user, setUser] = useState(null); // To store the signed-up user data

    return (
        <Router>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-200">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
                    <Route
                        path="/profile"
                        element={user ? <Profile user={user} /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/project-setup"
                        element={user ? <ProjectSetup /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/project-login"
                        element={user ? <ProjectLogin /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/chat"
                        element={user ? <ChatTable user={user} /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
