import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                navigate("/profile", { state: { userData: data.user } });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Server error");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
                <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 border border-gray-300 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
