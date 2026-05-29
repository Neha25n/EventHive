import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 sm:p-9 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                    <BrandLogo variant="dark" size="md" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-600">Start your journey</span>
                <h2 className="text-3xl font-black text-gray-950 mt-2 mb-2">Create your account</h2>
                <p className="text-gray-500">Join EventHive and keep every booking in one place.</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-center border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
                {!showOTP ? (
                    <>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-300 focus:border-gray-900 outline-none transition"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-300 focus:border-gray-900 outline-none transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-300 focus:border-gray-900 outline-none transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <p className="text-sm text-green-700 bg-green-50 p-3 mb-4 rounded-lg border border-green-200">
                            An OTP has been sent to your email. Please verify your account.
                        </p>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Verification Code (OTP)</label>
                        <input
                            type="text"
                            required
                            placeholder="6-digit code"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-300 focus:border-gray-900 outline-none transition font-bold tracking-widest text-center text-lg"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-950 text-white font-bold py-3.5 rounded-lg hover:bg-black focus:ring-4 focus:ring-amber-100 transition shadow-md disabled:opacity-70 mt-4"
                >
                    {loading ? 'Processing...' : (showOTP ? 'Verify & Complete' : 'Sign Up')}
                </button>
            </form>

            {!showOTP && (
                <p className="text-center mt-6 text-gray-600">
                    Already have an account? <Link to="/login" className="text-gray-950 font-black hover:text-amber-600 transition">Sign in</Link>
                </p>
            )}
        </div>
    );
};

export default Register;
