import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
    const navigate = useNavigate();

    // Check if user data is available; redirect to login if not
    if (!user) {
        navigate('/login');  // Redirect to login if user is not authenticated
        return <div className="text-red-500">Redirecting to login...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full mt-4">
                <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
                <p><strong>Country:</strong> {user?.country?.label || 'N/A'} ({user?.country?.countryCode || 'N/A'})</p>
                <p><strong>Gender:</strong> {user?.gender || 'N/A'}</p>
                <p><strong>Age:</strong> {user?.age || 'N/A'}</p>
            </div>
        </div>
    );
};

export default Profile;
