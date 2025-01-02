import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { IoIosAddCircle } from "react-icons/io";

function Category() {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [addingCategory, setAddingCategory] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8082/categories');
                console.log("test: " + response.data[0]);

                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách category:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = () => {
        setAddingCategory(true);
        setEditingCategory({ categoryId: 0, name: '', description: '' });
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
    };

    const handleSave = async (category) => {
        try {
            if (category.categoryId === 0) {
                const response = await axios.post('http://localhost:8082/categories', category);
                setCategories([...categories, response.data]);
            } else {
                await axios.post(`http://localhost:8082/categories`, category);
                setCategories(categories.map(c => (c.id === category.id ? category : c)));
            }
            setEditingCategory(null);
            setAddingCategory(false);
        } catch (error) {
            console.error('Lỗi khi lưu category:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        setCategoryToDelete(categoryId);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8082/categories/${categoryToDelete}`);
            setCategories(categories.filter(category => category.id !== categoryToDelete));
            setCategoryToDelete(null);
        } catch (error) {
            console.error('Lỗi khi xóa category:', error);
        }
    };

    const cancelDelete = () => {
        setCategoryToDelete(null);
    };

    const handleCancel = () => {
        setEditingCategory(null);
        setAddingCategory(false);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black">
            <h1 className="text-2xl font-bold text-gray-800 col-span-full">Quản Lý Danh Mục</h1>

            {/* Nút thêm category mới */}
            <div
                className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center cursor-pointer"
                onClick={handleAddCategory}
            >
                <IoIosAddCircle className="h-10 w-10 text-gray-500" />
            </div>
            {/* {
                console.log(" categories11: " + categories)
            }
            {
                console.log(" categories2: " + categories[0])
            }
            {
                console.log(" categories3: " + categories[0].name)
            } */}
            {categories.map(category => (
                <div key={category.id} className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                    {editingCategory?.id === category.id ? (
                        // Form chỉnh sửa category
                        <div>
                            <input
                                type="text"
                                value={editingCategory.name}
                                onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                className="w-full border rounded-md p-2 mb-2"
                                placeholder='Tên'
                            />
                            {/* <textarea
                                value={editingCategory.description}
                                onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                className="w-full border rounded-md p-2 mb-2"
                                placeholder='Mô tả'
                            /> */}
                            <button
                                onClick={() => handleSave(editingCategory)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Lưu
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Hủy
                            </button>
                        </div>
                    ) : (
                        // Hiển thị thông tin category
                        <div className='flex items-center justify-between'>
                            <h3 className="font-bold text-lg text-gray-800 flext-1">{category.name}</h3>
                            {/* <p className="text-gray-600">{category.description}</p> */}
                            <div className="mt-2 flex gap-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-md"
                                >
                                    <PencilSquareIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Form thêm category mới */}
            {addingCategory && (
                <div className="border rounded-lg p-4 bg-white shadow-md col-span-full sm:col-span-2 md:col-span-1 lg:col-span-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Thêm Danh Mục</h3>
                    <input
                        type="text"
                        value={editingCategory.name}
                        onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                        className="w-full border rounded-md p-2 mb-2"
                        placeholder='Tên'
                    />
                    {/* <textarea
                        value={editingCategory.description}
                        onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                        className="w-full border rounded-md p-2 mb-2"
                        placeholder='Mô tả'
                    /> */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => handleSave(editingCategory)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            )}

            {/* Modal xác nhận xóa */}
            {categoryToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
                        <p className="mb-4">Bạn có chắc chắn muốn xóa danh mục này? Thao tác này sẽ xóa tất cả các phim thuộc danh mục này.</p>
                        <div className="flex justify-end">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Xóa
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;