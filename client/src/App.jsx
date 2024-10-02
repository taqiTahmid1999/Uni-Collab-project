// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
    const [user, setUser] = useState(null); // To store the signed-up user data

    return (
        <Router>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-200
">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login setUser={setUser} user={user} />} />
                    <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
                    <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
