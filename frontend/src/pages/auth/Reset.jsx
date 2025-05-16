import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Reset() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    console.log("Token being sent:", token);

    const handleReset = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || 'Password reset successful. Redirecting...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Something went wrong.');
            }
        } catch (err) {
            console.error(err);
            setError('Server error. Try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
                <div className="bg-blue-500 flex items-center justify-center p-8 md:w-1/2">
                    <div className="text-center">
                        <h2 className="text-2xl text-white font-semibold mb-2">Set a New Password</h2>
                        <p className="text-white text-sm">Enter your new password below.</p>
                    </div>
                </div>
                <div className="p-6 md:p-10 md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Password</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Choose a strong password and confirm it.
                    </p>
                    <form onSubmit={handleReset}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-sm mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-gray-600 text-sm mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full mb-4">
                            Reset Password
                        </button>
                    </form>
                    {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Back to{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
