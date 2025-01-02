import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear any previous error messages

        if (!validateEmail(email)) {
            setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        const admin = {
            email: email,
            password: password,

        };

        try {
            const response = await axios.post('http://localhost:8082/api/auth/admin/login', admin);
            sessionStorage.setItem('admin', JSON.stringify(response.data));
            navigate("/admin");
            console.log('Đăng nhập thành công:', response.data);
            window.location.reload();

        } catch (error) {
            // Xử lý lỗi đăng nhập
            console.error('Lỗi đăng nhập:', error);
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Đăng nhập thất bại.');
            } else {
                setErrorMessage('Lỗi kết nối đến máy chủ.');
            }
        }
    };

    const validateEmail = (email) => {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Đăng nhập Admin
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-400 p-2 w-full rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border border-gray-400 p-2 w-full rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;