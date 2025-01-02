import React from 'react';
import { memo } from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start"> {/* Thay đổi items-center thành items-start */}
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h3 className="text-xl font-semibold mb-4">Đồ Án Chuyên Ngành</h3>
                        <p className="text-sm text-gray-300">
                            Web xem phim
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <h4 className="text-lg font-medium mb-4">Liên kết nhanh</h4>
                        <ul className="text-sm text-gray-300">
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-100">Trang Chủ</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-100">Giới Thiệu</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-100">Dịch Vụ</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-100">Liên Hệ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-medium mb-4">Theo dõi chúng tôi</h4>
                        <ul className="flex space-x-6">
                            <li>
                                <a href="#" className="hover:text-gray-100">
                                    <FaFacebook size={24} />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-100">
                                    <FaTwitter size={24} />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-100">
                                    <FaInstagram size={24} />
                                </a>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Tên Công Ty. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);