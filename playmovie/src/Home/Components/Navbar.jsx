import { useState, useEffect, useRef, memo } from "react";
import { useLocation } from "react-router-dom";
import { SiWondersharefilmora } from "react-icons/si";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";

import LoginModal from "./Login";
import RegisterModal from "./Register";

import { IoSearch } from "react-icons/io5";
import axios from "axios";
import Login from "./Login";


const data = [{
    name: 'Trực tiếp'
},
{
    name: 'Giải trí'
},
{
    name: 'Âm nhạc'
}]

function Navbar({ action }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState('login');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        console.log(JSON.parse(storedUser));
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [sessionStorage.getItem('user'), action]);

    console.log("user : " + user ? user : null);

    const handleUserClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    }

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/auth/logout');
            setUser(null);
            sessionStorage.removeItem('user');
            window.location.reload();
        } catch (error) {
            console.log(error);

        }

    }


    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    useEffect(() => {
        if (action == 'login')
            handleOpenModal();
    }, []);

    const handleCloseModal = () => {
        setTypeModal('login');
        setIsModalOpen(false);
    }

    const menuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log('Ok');
    };

    const handleToRegister = () => {
        setTypeModal('register');
    }
    const handleToLogin = () => {
        setTypeModal('login');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.getElementById('menu');
            const parenMenu = document.getElementById('parent-menu');
            if (menu && !parenMenu.contains(event.target) && isMenuOpen) {
                setIsMenuOpen(false);
                console.log('co');

            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);
    // const menuToggle = (event) => {

    //     console.log(event.target);
    //     const menu = document.getElementById('menu');

    //     if (menu.classList.contains('hidden')) {
    //         menu.classList.remove('hidden')
    //     } else {
    //         menu.classList.add('hidden')
    //     }

    // }
    return (
        <div className="fixed z-50 text-white  flex items-center w-[75%]   bg-black h-24">
            <Link to="/">
                <div className="logo inline-flex gap-2 bg-black rounded-md cursor-pointer">
                    <SiWondersharefilmora style={{ fontSize: '2.4rem', color: '#00FFFF', background: 'black' }} />
                    <h2 className="bungee-spice-regular text-4xl bg-black rounded-md">MOVIE</h2>

                </div>
            </Link>

            <ul className="flex gap-4 items-center mx-5 bg-black">
                <h4 className="font-bold text-xl bg-black text-white hover:font-bold hover:cursor-pointer transition-all duration-300"> <Link to="/">Trang Chủ</Link> </h4>
                <h4 className="font-light text-xl bg-black text-white hover:font-bold hover:cursor-pointer transition-all duration-100">Movie</h4>
                <h4 className="font-light text-xl bg-black text-white hover:font-bold hover:cursor-pointer transition-all duration-100">Anime</h4>
                <div id='parent-menu' className={`relative bg-yellow-200 ${isMenuOpen ? '' : 'overflow-hidden'}`}>
                    <div className="w-full relative inline-flex bg-black items-center px-4 hover:cursor-pointer justify-around" onClick={menuToggle}>
                        <h4 className="text-white bg-black">Xem Thêm</h4>
                        <MdOutlineArrowDropDown style={{ padding: '0px', width: '2rem', height: '1.25rem', backgroundColor: 'black', color: 'white' }} />
                    </div>
                    <ul id="menu" className={`absolute w-[10rem] bg-gray-800 mt-2 p-2 rounded-md z-10 ${isMenuOpen ? 'translate-y-0 transition-all duration-700 ease-in-out transform ' : ' '}`}>
                        {data.map((d, index) => (
                            <li key={index} className="hover:text-red-500 bg-gray-800 p-1 hover:font-bold rounded-md hover:cursor-pointer transition-all duration-200">{d.name}</li>
                        ))}
                    </ul>
                </div>
            </ul>

            <div className=" flex flex-1  gap-4 items-center justify-end"> {/* Thay đổi ở đây */}
                <div className="cursor-pointer hover:text-red-400"> {/* Thay đổi ở đây */}
                    <Link to='/search'>
                        <IoSearch className="text-3xl font-bold mx-2 text-white" />
                    </Link>

                </div>
                {user ? (
                    <div className="relative">
                        <button onClick={handleUserClick} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {user.username} {/* Hiển thị tên user */}
                            <MdOutlineArrowDropDown className="inline ml-2" />
                        </button>

                        {/* Menu user */}
                        <ul className={`absolute right-0 w-48 bg-gray-800 mt-2 p-2 rounded-md z-10 ${isUserMenuOpen ? 'translate-y-0 opacity-100 transition-all duration-700 ease-in-out transform ' : 'opacity-0 -translate-y-2'}`}>
                            <Link to='/user-menu'>
                                <li className="hover:text-red-500 bg-gray-800 p-1 hover:font-bold rounded-md hover:cursor-pointer transition-all duration-200">
                                    Thông tin cá nhân
                                </li></Link>
                            <li onClick={handleLogout} className="hover:text-red-500 bg-gray-800 p-1 hover:font-bold rounded-md hover:cursor-pointer transition-all duration-200">
                                Đăng xuất
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button type="button" onClick={handleOpenModal} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Đăng Nhập
                    </button>
                )}
                {

                    typeModal === 'login' && (
                        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} toRegister={handleToRegister}></LoginModal>
                    )
                }
                {console.log(typeModal,)}
                {typeModal === 'register' && (
                    <RegisterModal isOpen={isModalOpen} onClose={handleCloseModal} toLogin={handleToLogin} ></RegisterModal>
                )}

            </div>
        </div>
    )
}
export default memo(Navbar)