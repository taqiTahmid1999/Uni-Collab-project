// src/components/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState({ label: "United States", code: "US", countryCode: "+1" });
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            name,
            email,
            phone,
            country: country.label,
            gender,
            age,
            password,
        };

        try {
            const response = await fetch("http://localhost:5000/api/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data);
                navigate("/profile", { state: { userData: data } });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert("Server error");
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
                <h2 className="mb-4 text-2xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="p-2 border border-gray-300 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <select
                        value={country.label}
                        onChange={(e) => setCountry({ label: e.target.value, code: "US", countryCode: "+1" })}
                        className="p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        {/* Add more countries as needed */}
                    </select>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Age"
                        className="p-2 border border-gray-300 rounded"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="p-2 border border-gray-300 rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
