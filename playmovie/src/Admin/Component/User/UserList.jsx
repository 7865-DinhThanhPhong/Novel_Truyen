import { useState, useEffect } from "react";
import { Modal, Button } from 'flowbite-react';
import { button } from "@material-tailwind/react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [message, setMessage] = useState(null);
    const admin = JSON.parse(sessionStorage.getItem('admin'));
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); //Cais nay dung de set so luong user moi trang

    useEffect(() => {
        fetch('http://localhost:8082/api/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleDelete = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        fetch(`http://localhost:8082/api/users/${userToDelete.userId}`, { method: 'DELETE' })
            .then(() => {
                setUsers(users.filter(u => u.userId !== userToDelete.userId));
                setIsDeleteModalOpen(false);
                setMessage({ type: 'success', text: 'Xóa người dùng thành công!' });
            })
            .catch(error => {
                console.error('Lỗi khi xóa người dùng:', error);
                setMessage({ type: 'error', text: 'Xóa người dùng thất bại!' });
            });
    };

    const handleSaveEdit = (updatedUser) => {
        fetch(`http://localhost:8082/api/users/${updatedUser.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
            .then(() => {
                setUsers(users.map(u => u.userId === updatedUser.userId ? updatedUser : u));
                setEditingUser(null);
                setMessage({ type: 'success', text: 'Cập nhật người dùng thành công!' });
            })
            .catch(error => {
                console.error('Lỗi khi cập nhật người dùng:', error);
                setMessage({ type: 'error', text: 'Cập nhật người dùng thất bại!' });
            });
    };
    // Cho nay de set cho message 
    useEffect(() => {
        const timeoutMessage = setTimeout(() => {
            if (message != '' || message == null) {
                setMessage(null);
            }
        }, 3000);

        return () => clearTimeout(timeoutMessage);

    }, [message]);

    //Tinh cho phan trang
    const lastUser = currentPage * itemsPerPage; //Vi tri user cuoi moi trang
    const firstUser = lastUser - itemsPerPage; // Vi tri user dau trang de cho dung ham slice
    const currentUsers = users.slice(firstUser, lastUser); // slice se lay cac user tu vi tri firstUser den truoc lastUser

    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-4 ">Danh sách người dùng</h1>

            {/* Hiển thị thông báo */}
            {message && (
                <div className={`p-4 mb-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border border-gray-300">ID</th>
                        <th className="px-4 py-2 border border-gray-300">Tên đăng nhập</th>
                        <th className="px-4 py-2 border border-gray-300">Email</th>
                        <th className="px-4 py-2 border border-gray-300">Vai trò</th>
                        <th className="px-4 py-2 border border-gray-300">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.userId} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{user.userId}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.role}</td>
                            <td className="border px-4 py-2">
                                {admin.userId === user.userId ? (<div className="text-blue-600 text-center italic font-bold">Đang Hiện Hoạt</div>)
                                    : (
                                        <div>
                                            <button onClick={() => handleEdit(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                                                Sửa
                                            </button>
                                            <button onClick={() => handleDelete(user)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                                Xóa
                                            </button>
                                        </div>
                                    )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Day la lamf Phan trang */}
            <div className="text-black flex justify-center mt-5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-400'} hover:bg-blue-400`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            {/* Modal chỉnh sửa */}
            {editingUser && (
                <div className="text-white">
                    <Modal className="w-[50%] mx-auto" show={!!editingUser} onClose={() => setEditingUser(null)}>
                        <Modal.Header className="my-3">
                            <h2 className="text-center px-5">Chỉnh sửa người dùng</h2>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Form chỉnh sửa */}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const updatedUser = {
                                    userId: editingUser.userId,
                                    username: e.target.username.value,
                                    email: e.target.email.value,
                                    role: e.target.role.value
                                };
                                handleSaveEdit(updatedUser);
                            }}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2 text-white">Tên đăng nhập:</label>
                                    <input type="text" id="username" name="username" defaultValue={editingUser.username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-white">Email:</label>
                                    <input type="email" id="email" name="email" defaultValue={editingUser.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="role" className="block text-gray-700 font-bold mb-2 text-white">Vai trò:</label>
                                    <select id="role" name="role" defaultValue={editingUser.role} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-end">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>

            )}

            {/* Modal xác nhận xóa */}
            <Modal className="fixed top-1/2  w-1/3 mx-auto text-white" show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <Modal.Header>
                    <h2 className="text-center p-2">Xác nhận xóa</h2>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa người dùng này?
                </Modal.Body>
                <Modal.Footer className="flex justify-between">
                    <Button color="gray" className="bg-gray-500 hover:bg-gray-600 hover:text-white hover:font-bold" onClick={() => setIsDeleteModalOpen(false)}>
                        Hủy
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-400" onClick={handleConfirmDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;