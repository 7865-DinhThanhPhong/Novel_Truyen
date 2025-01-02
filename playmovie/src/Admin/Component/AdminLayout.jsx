import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import axios from 'axios';

function AdminLayout({ children, onContentChange, activeContent }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('admin');
        console.log(JSON.parse(storedUser));
        if (storedUser) {
            setAdmin(JSON.parse(storedUser));
        }
    }, [sessionStorage.getItem('admin')]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8082/api/auth/logout');
            setAdmin(null);
            sessionStorage.removeItem('admin');
            // Redirect to the home page after successful logout
            navigate('/');
        } catch (error) {
            console.log(error);
            // Optionally handle the error, e.g., display an error message
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar isSidebarOpen={isSidebarOpen} onContentChange={onContentChange} toggleSidebar={toggleSidebar} activeContent={activeContent} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-gray-900 text-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <button
                                    onClick={toggleSidebar}
                                    className="md:hidden mr-4 text-gray-400 hover:text-white focus:outline-none"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                </button>
                                <Link to="/admin" className="text-xl font-bold">
                                    Admin Dashboard
                                </Link>
                            </div>
                            {/* User menu */}
                            <div className="relative">
                                <button onClick={toggleUserMenu} className="flex items-center focus:outline-none">
                                    <UserCircleIcon className="h-8 w-8 rounded-full" />
                                    <span className="ml-2">{admin?.email}</span>
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg">
                                        <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-100">
                                            Thông tin tài khoản
                                        </Link>
                                        <Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-100">
                                            <div className="flex items-center">
                                                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                                                Cài đặt
                                            </div>
                                        </Link>
                                        <Link to="/"
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent default link behavior
                                                handleLogout();
                                            }}
                                            className="block px-4 py-2 hover:bg-gray-100">
                                            <button>Đăng xuất</button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;