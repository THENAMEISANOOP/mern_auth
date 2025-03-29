import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase'; 
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch(); // ✅ Fixed: Dispatch added
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // ✅ Fixed: Corrected header
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Google login failed');
            }

            dispatch(signinSuccess(data)); // ✅ Fixed: Dispatching action correctly
            navigate('/'); // ✅ Redirect after successful login

        } catch (error) {
            console.log("Could not login with Google:", error.message);
        }
    };

    return (
        <button 
            onClick={handleGoogleClick}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-red-700 transition"
        >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#fff" d="M21.35 11.1h-9.34v2.92h5.53c-.23 1.32-1.01 2.49-2.14 3.25v2.65h3.45c2.01-1.87 3.2-4.62 3.2-7.82 0-.54-.06-1.06-.17-1.57zM12 22c2.7 0 4.97-.9 6.62-2.43l-3.45-2.65c-.92.6-2.07.95-3.34.95-2.57 0-4.73-1.74-5.5-4.09h-3.48v2.67c1.64 3.27 5.02 5.55 8.98 5.55zM6.5 12c-.16-.47-.24-.97-.24-1.5s.08-1.03.24-1.5v-2.67h-3.48c-.7 1.37-1.08 2.91-1.08 4.5s.39 3.13 1.08 4.5h3.48v-2.67zM12 4.44c1.29 0 2.47.44 3.42 1.17l2.54-2.54c-1.64-1.51-3.92-2.44-6.37-2.44-3.96 0-7.34 2.28-8.98 5.55l3.48 2.67c.77-2.35 2.93-4.09 5.5-4.09z"/>
            </svg>
            <span>Continue with Google</span>
        </button>
    );
};

export default OAuth;
