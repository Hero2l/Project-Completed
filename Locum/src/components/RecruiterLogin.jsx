import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruiterLogin = () => {

    const navigate = useNavigate()
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setcompanyData } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (state === 'Sign Up' && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true);
        }

        try {

            if (state === "Login") {

                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })
                if (data.success) {
                    setcompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            } else {

                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setcompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md">
                <h1 className="text-center text-2xl text-neutral-700 font-medium">Recruiter {state}</h1>
                <p className="text-sm text-center mb-6">
                    {state === 'Login' ? 'Welcome back! Please Sign in to continue' : 'Create your account to get started'}
                </p>

                {state === 'Sign Up' && isTextDataSubmitted ? (
                    <div className="flex items-center gap-4 my-10">
                        <label htmlFor="image" className="cursor-pointer">
                            <img
                                className="w-16 h-16 rounded-full object-cover border"
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt="Company Logo"
                            />
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                            />
                        </label>
                        <p>Upload company logo</p>
                    </div>
                ) : (
                    <>
                        {state !== 'Login' && (
                            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                                <img src={assets.person_icon} alt="Person Icon" />
                                <input
                                    className="outline-none text-sm w-full"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    placeholder="Company Name"
                                    required
                                />
                            </div>
                        )}
                        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                            <img src={assets.email_icon} alt="Email Icon" />
                            <input
                                className="outline-none text-sm w-full"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Email ID"
                                required
                            />
                        </div>
                        <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                            <img src={assets.lock_icon} alt="Lock Icon" />
                            <input
                                className="outline-none text-sm w-full"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        {state === 'Login' && (
                            <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot password?</p>
                        )}
                    </>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 w-full text-white py-2 rounded-full mt-5"
                >
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Sign Up' : 'Next'}
                </button>

                <p className="mt-5 text-center">
                    {state === 'Login' ? (
                        <>
                            Don't have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setState('Sign Up')}
                            >
                                Sign Up
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setState('Login')}
                            >
                                Login
                            </span>
                        </>
                    )}
                </p>

                <img
                    className="absolute top-5 right-5 cursor-pointer"
                    src={assets.cross_icon}
                    alt="Close Icon"
                    onClick={e => setShowRecruiterLogin(false)}
                />
            </form>
        </div>
    );
};

export default RecruiterLogin;
