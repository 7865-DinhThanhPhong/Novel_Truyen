import React, { useState, memo } from 'react';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import Alert from '../../Components/Alert';

const RegisterModal = ({ isOpen, onClose, toLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('success');

    const register = async () => {
        const user = {
            username: email,
            email: email,
            password: password,
        }

        try {
            const response = await axios.post("http://localhost:8082/api/auth/register", user);
            console.log("Dang ky thanh cong");
            setAlertMessage('Đăng ký thành công');
            setAlertType('success');
            toLogin();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data;
                setAlertMessage(errorMessage);
                setAlertType('error');
                console.error("Đăng ký thất bại:", errorMessage);
            }

            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }
        if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        register();

    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="modal bg-white rounded-lg p-8 relative w-[25%]">
                <h2 className="text-2xl font-bold mb-4 text-black text-center">Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Mật khẩu:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                            Nhập lại mật khẩu:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>
                    {alertMessage && (
                        <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage(null)} ></Alert>
                    )}

                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Đăng ký
                        </button>
                        <button type="button" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={toLogin}>
                            Đã có tài khoản - Đăng Nhập
                        </button>
                    </div>
                </form>
                <button
                    type="button"
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 absolute top-2 right-2 m-2 p-1 hover:bg-slate-400"
                    onClick={onClose}
                >
                    <IoMdClose className='text-xl font-bold' />
                </button>
            </div>


        </div>
    );
};

export default memo(RegisterModal);