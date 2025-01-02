import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ErrorMessage from './ErrorMessage'; // Component hiển thị lỗi

function CategoryForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get('/api/categories'); // Thay /api/categories bằng endpoint API của bạn
    //             setCategories(response.data);
    //         } catch (error) {
    //             console.error('Lỗi khi lấy danh sách thể loại:', error);
    //             // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    //         }
    //     };

    //     fetchCategories();
    // }, []);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/categories', data);
            console.log('Thêm thể loại thành công:', response.data);
            // Cập nhật danh sách thể loại
            setCategories([...categories, response.data]);
            // Reset form
            reset();
        } catch (error) {
            console.error('Lỗi khi thêm thể loại:', error);
            // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý thể loại</h1>

            {/* Form thêm thể loại */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-bold mb-4">Thêm thể loại mới</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Tên thể loại <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name", { required: "Vui lòng nhập tên thể loại", maxLength: 255 })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Nhập tên thể loại"
                        />
                        <ErrorMessage message={errors.name?.message} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Mô tả
                        </label>
                        <textarea
                            {...register("description")}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Nhập mô tả"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Thêm thể loại
                        </button>
                    </div>
                </form>
            </div>

            {/* Danh sách thể loại */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                <h2 className="text-xl font-bold mb-4">Danh sách thể loại</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category.categoryId} className="border-b border-gray-200 py-2">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{category.name}</span>
                                <div>
                                    <button className="text-blue-500 hover:text-blue-700 mr-2">Chỉnh sửa</button>
                                    <button className="text-red-500 hover:text-red-700">Xóa</button>
                                </div>
                            </div>
                            {category.description && <p className="text-gray-600 text-sm">{category.description}</p>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryForm;