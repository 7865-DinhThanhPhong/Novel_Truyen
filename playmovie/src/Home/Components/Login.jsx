import React, { useState, memo } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";

const LoginModal = ({ isOpen, onClose, toRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    const login = async () => {
        const user = {
            email: email,
            password: password,

        }
        try {
            const response = await axios.post('http://localhost:80811/api/auth/login', user);
            sessionStorage.setItem('user', JSON.stringify(response.data));
            window.location.reload();

            onClose();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Đăng nhập thất bại:", error.response.data);
            }
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newError = {};
        if (!email) {
            newError.email = "Vui lòng nhập email";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "email không hợp lệ";
        }
        if (password.length < 6)
            newError.password = "mật khẩu ít nhất 6 ký tự";

        if (Object.keys(newError).length > 0) {
            setErrors(newError);
            return;
        }
        console.log("subit Login");

        login();

    };




    if (!isOpen) {
        return null; // Không hiển thị modal nếu isOpen là false
    }

    return (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal bg-white rounded-lg p-8 w-[25%] relative">
                <h2 className="text-2xl font-bold mb-4 text-black text-center">Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                            Tên đăng nhập:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Mật khẩu:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>

                    <div className="flex justify-between ">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        >
                            Đăng nhập
                        </button>
                        <button
                            type="button"
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 px-2"
                            onClick={toRegister}
                        >
                            Đăng Ký
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

export default memo(LoginModal);