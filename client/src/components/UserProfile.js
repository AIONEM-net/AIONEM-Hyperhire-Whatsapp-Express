import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [userProfile, setUserProfile] = useState({ name: '', email: '' });

    useEffect(() => {
        const mockUserProfile = {
            name: 'John Doe',
            email: 'john@example.com',
        };
        setUserProfile(mockUserProfile);
    }, [userId]);

    const handleProfileUpdate = (e) => {
        e.preventDefault();
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
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default UserProfile;
