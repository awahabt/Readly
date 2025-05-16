import React, { useState } from 'react';
import { forgot } from '../../assets';

export default function Forgot() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
              const BACKEND_URL = 'http://localhost:8000';
            const response = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || 'Reset link sent to your email.');
            } else {
                setError(data.error || 'Something went wrong.');
            }
        } catch (err) {
            setError('Server error. Try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
                <div className="bg-blue-500 flex items-center justify-center p-8 md:w-1/2">
                    <div className="text-center">
                        <img src={forgot} alt="Forgot Password Illustration" className="mx-auto mb-4" />
                        <h2 className="text-2xl text-white font-semibold mb-2">Reset Your Password</h2>
                        <p className="text-white text-sm">Enter your email to reset your password.</p>
                    </div>
                </div>
                <div className="p-6 md:p-10 md:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Forgot Password</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Enter your email below, and we’ll send you a reset link.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-600 text-sm mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="example@domain.com"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full mb-4">
                            Send Reset Link
                        </button>
                    </form>
                    {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <p className="text-sm text-gray-500 mt-4 text-center">
                        Remembered your password?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
