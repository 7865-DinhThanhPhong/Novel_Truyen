import React, { useState, useEffect } from "react";
import axios from "axios";
import filled from "@material-tailwind/react/theme/components/timeline/timelineIconColors/filled";

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState({
        username: false,
        email: false,
        avatar: false,
    });
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Thay thế bằng API endpoint thực tế
                const data = JSON.parse(sessionStorage.getItem('user'));
                setUserData(data);
                setEditedData(data);
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng", error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = (field) => {
        setEditing({ ...editing, [field]: true });
    };

    const handleInputChange = (field, value) => {
        console.log("Avatar: " + field + " " + value);
        setEditedData({ ...editedData, [field]: value });
    };

    const handleSaveClick = async () => {
        try {
            const formData = new FormData();

            // Thêm file ảnh vào formData (nếu có)
            if (editedData.avatarFile) {
                formData.append("avatar", editedData.avatarFile);

            }

            // Chuyển đổi object User sang JSON string và thêm vào formData
            const userToSend = { ...editedData };
            delete userToSend.avatarFile;
            const userJson = JSON.stringify(userToSend);

            formData.append("user", userJson);

            // Gửi request PUT tới Spring backend
            const response = await axios.put(`http://localhost:8081/api/users/edit/${userData.userId}`,

                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                // Cập nhật userData
                const updatedUser = response.data;

                const userToStore = { ...updatedUser };
                delete userToStore.password;
                sessionStorage.setItem('user', JSON.stringify(userToStore));

                setUserData(updatedUser);
                setEditedData(updatedUser);
                setEditing({ username: false, email: false, avatar: false });

            } else {
                if (response.status === 400) {
                    console.error("Ko co: " + response.data);

                    setError(response.data);
                } else {
                    // Xử lý lỗi
                    console.error("Lỗi khi cập nhật thông tin người dùng 1");
                    setError(null);

                }

            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin người dùng", error);
        }
    };

    const handleCancelClick = () => {
        setEditing({ username: false, email: false, avatar: false });
        setEditedData(userData); // Khôi phục dữ liệu ban đầu
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setEditedData({ ...editedData, avatarFile: file });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-white">
            <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-full overflow-hidden relative">
                    {console.log("Avatar : " + editedData.avatar)}
                    <img
                        src={
                            editedData.avatar ||
                            "https://ui-avatars.com/api/?name=" +
                            editedData.username +
                            "&background=random"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                    {editing.avatar && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </div>
                    )}
                    {!editing.avatar && (
                        <button
                            className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2"
                            onClick={() => handleEditClick("avatar")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                <div className="ml-4">
                    <div className="flex items-center">
                        {editing.username ? (
                            <input
                                type="text"
                                value={editedData.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                                className="border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <span className="font-medium text-lg">
                                {userData.username}
                            </span>
                        )}
                        <button
                            className="ml-2 text-gray-500 hover:text-blue-500"
                            onClick={() => handleEditClick("username")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>

                    </div>
                    {error != null && (<div className="text-red-400">{error}</div>)}
                    <div className="flex items-center mt-2">
                        {editing.email ? (
                            <input
                                type="email"
                                value={editedData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <span className="text-gray-600">{userData.email}</span>
                        )}
                        {/* <button
                            className="ml-2 text-gray-500 hover:text-blue-500"
                            onClick={() => handleEditClick("email")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button> */}
                    </div>

                    {(editing.username || editing.email || editing.avatar) && (
                        <div className="mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleSaveClick}
                            >
                                Lưu
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={handleCancelClick}
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex gap-2 ml-16">Loại tài khoản: <p className="font-bold">{userData.role === 'USER' ? "User Thường" : "Admin"}</p></div>
            </div>
        </div>
    );
}

export default UserProfile;