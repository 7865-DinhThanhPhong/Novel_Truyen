import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import HistoryPage from './HistoryPage';
import FavoriteList from "./FavoriteList";


function ProfileMenu() {
    const [activeTab, setActiveTab] = useState('info'); // Mặc định tab 'info' được active
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch dữ liệu người dùng từ API hoặc local storage
        const fetchUserData = async () => {
            const data = JSON.parse(sessionStorage.getItem('user'));
            setUserData(data);
        };

        fetchUserData();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    if (!userData) {
        return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
    }

    return (
        <div>
            {/* Menu ngang */}
            <ul className="flex border-b border-gray-200 text-white">
                <li
                    className={`cursor-pointer py-2 px-4 border-b-2 ${activeTab === 'info' ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => handleTabClick('info')}
                >
                    Thông tin
                </li>
                <li
                    className={`cursor-pointer py-2 px-4 border-b-2 ${activeTab === 'history' ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => handleTabClick('history')}
                >
                    Lịch sử
                </li>
                <li
                    className={`cursor-pointer py-2 px-4 border-b-2 ${activeTab === 'favorites' ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => handleTabClick('favorites')}
                >
                    Yêu thích
                </li>
            </ul>

            {/* Nội dung tương ứng với tab */}
            <div className="mt-4">
                {activeTab === 'info' && (
                    <div>
                        <UserProfile></UserProfile>
                    </div>
                )}
                {activeTab === 'history' && (
                    <div>
                        <HistoryPage></HistoryPage>
                    </div>
                )}
                {activeTab === 'favorites' && (
                    <div>
                        <FavoriteList userId={userData.userId} />
                        {/* <ul>
                            {userData.favorites.map((movie) => (
                                <li key={movie.id}>{movie.title}</li>
                            ))}
                        </ul> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileMenu;