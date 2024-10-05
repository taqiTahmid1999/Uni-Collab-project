// src/components/ProjectLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const ProjectLogin = () => {
    const [projectName, setProjectName] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submission status
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the project login data
        const projectData = {
            projectName,
            password,
        };

        try {
            setIsSubmitting(true);
            // Replace with your actual login API call
            const response = await axios.post("/api/project-login", projectData);

            if (response.status === 200) {
                const data = response.data; // Assuming the response returns project data
                navigate("/project-dashboard", { state: { projectData: data } });
            } else {
                alert("Invalid project name or password!");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid project name or password!");
        } finally {
            setIsSubmitting(false); // Reset the submitting state
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Project Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Project Name</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isSubmitting} // Disable button during submission
                    >
                        {isSubmitting ? "Logging in..." : "Login to Project"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectLogin;
