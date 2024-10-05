import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({ user }) => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    // Fetch user projects from the backend
    useEffect(() => {
        console.log("User:", user); // Log user object
        if (user) {
            axios
                .get(`/api/user-projects/${user.id}`)
                .then((response) => {
                    console.log("Projects Response:", response.data); // Log response
                    if (response.data && response.data.projects) {
                        setProjects(response.data.projects);
                    } else {
                        console.warn("No projects found in response");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching projects:", error);
                });
        } else {
            console.warn("No user found, unable to fetch projects");
        }
    }, [user]);

    // Check if user data is available
    if (!user) {
        return <div className="text-red-500">No user data available.</div>;
    }

    const handleProjectSetup = () => {
        navigate("/project-setup");
    };

    const handleChatWithCoWorker = () => {
        navigate("/chat");
    };

    const handleProjectLogin = () => {
        navigate("/project-login"); // Navigate to Project Login page
    };

    return (
        <div className="flex flex-row justify-between min-h-screen p-4">
            {/* Left Part: Project List and Options */}
            <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Projects</h2>
                <ul className="space-y-2">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <li key={index} className="p-2 bg-gray-100 rounded-lg shadow">
                                {project.name}
                            </li>
                        ))
                    ) : (
                        <li>No projects linked yet.</li>
                    )}
                </ul>

                <button
                    onClick={handleProjectSetup}
                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    New Project Setup
                </button>

                <button
                    onClick={handleChatWithCoWorker}
                    className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                >
                    Chat with Co-worker
                </button>

                <button
                    onClick={handleProjectLogin}
                    className="mt-4 bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition"
                >
                    Project Login
                </button>
            </div>

            {/* Right Part: Profile Details and Update */}
            <div className="w-1/2 p-4 bg-white rounded-lg shadow-md ml-4">
                <h2 className="text-xl font-bold mb-4">Profile Details</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Country:</strong> {user.country.label} ({user.country.countryCode})</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Age:</strong> {user.age}</p>

                <button className="mt-4 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition">
                    Update Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
