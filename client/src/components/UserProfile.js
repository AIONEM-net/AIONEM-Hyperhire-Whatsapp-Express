import React, { useState, useEffect } from 'react';
// Import the API service if you're fetching and updating the user profile via your backend
// import api from '../services/api';

function UserProfile({ userId }) {
    const [userProfile, setUserProfile] = useState({ name: '', email: '' });

    useEffect(() => {
        // Placeholder for fetching user profile from your backend
        // Example: api.getUserProfile(userId).then(setUserProfile);
        const mockUserProfile = {
            name: 'John Doe',
            email: 'john@example.com',
            // Include additional user profile fields as necessary
        };
        setUserProfile(mockUserProfile);
    }, [userId]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        // Placeholder for updating user profile logic
        // This should call an API endpoint with userProfile data
        // Example: api.updateUserProfile(userId, userProfile).then(response => { ... });
        console.log('Profile updated:', userProfile);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <form onSubmit={handleProfileUpdate}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userProfile.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleChange}
                    />
                </div>
                {/* Include additional fields as necessary */}
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default UserProfile;
