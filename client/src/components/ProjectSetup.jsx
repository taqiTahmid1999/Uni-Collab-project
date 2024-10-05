// src/components/ProjectSetup.jsx
import React, { useState } from "react";
import axios from "axios"; // Added axios for API requests

const ProjectSetup = () => {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectType, setProjectType] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [adminName, setAdminName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [projectFileType, setProjectFileType] = useState("");
    const [deadline, setDeadline] = useState("");
    const [notificationPreference, setNotificationPreference] = useState("email");
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Prepare the project data
        const projectData = {
            projectName,
            projectDescription,
            projectType,
            password,
            admin: {
                name: adminName,
                email: adminEmail,
            },
            projectFileType,
            deadline,
            notificationPreference,
        };

        try {
            setIsSubmitting(true);
            // Send the project data to the server via an API call
            const response = await axios.post("/api/project-setup", projectData);
            console.log("Project created successfully:", response.data);
            alert("Project created successfully!");
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Failed to create project. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Project Setup</h2>
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
                        <label className="block text-gray-700">Project Description</label>
                        <textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Project Type</label>
                        <select
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Project Type</option>
                            <option value="research">Research</option>
                            <option value="presentation">Presentation</option>
                            <option value="coding">Coding Project</option>
                        </select>
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

                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Admin Name</label>
                        <input
                            type="text"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Admin Email</label>
                        <input
                            type="email"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Project File Type</label>
                        <input
                            type="text"
                            value={projectFileType}
                            onChange={(e) => setProjectFileType(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="e.g., PDF, Word, Google Doc"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Set Deadline/Milestones</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Notification Preferences</label>
                        <select
                            value={notificationPreference}
                            onChange={(e) => setNotificationPreference(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="email">Email</option>
                            <option value="in-app">In-App Notifications</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Project"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectSetup;
