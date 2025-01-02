import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function ChapterList({ story, onContentChange, onGetData }) {
    const [chapters, setChapters] = useState([]);
    const [expandedDescriptions, setExpandedDescriptions] = useState({}); // Cái này bạn có thể bỏ đi, vì không còn dùng để show/hide description nữa
    console.log("Chapters: " + chapters);

    useEffect(() => {
        const getChapters = async () => {
            const res = await axios.get(`http://localhost:8082/chapters/story/${story.id}`);
            setChapters(res.data);
        }
        // setChapters(story.chapters);
        getChapters();
    }, []);
    const handleAddChapter = () => {
        onContentChange("add-chapter");
    };

    const handleEditChapter = (chapter) => {
        onContentChange("chapter-edit");
        onGetData(chapter);
    };

    const handleDeleteChapter = (chapterId) => {

        if (window.confirm('Bạn có chắc chắn muốn xóa chapter này?')) {
            axios.delete(`http://localhost:8082/chapters/${chapterId}`)
                .then(response => {
                    console.log("Xóa chapter thành công:", response.data);

                    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
                })
                .catch(error => {
                    console.error("Lỗi khi xóa chapter:", error);
                    // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
                });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
                Quản lý Chapter
            </h1>

            {/* Thông tin Story */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-bold mb-4">Thông tin Truyện</h2>
                <div className="flex">
                    {/* Cột ảnh */}
                    <div className="w-1/3 pr-4">
                        <img
                            src={story.coverImageUrl}
                            alt={story.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Cột thông tin */}
                    <div className="w-2/3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tiêu đề:
                                </label>
                                <p className="text-gray-900">{story.title}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Tác giả:
                                </label>
                                <p className="text-gray-900">{story.author}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Ngày tạo:
                                </label>
                                <p className="text-gray-900 text-black">
                                    {/* {story.createdAt} */}
                                    {console.log("date--: " + story.createdAt)}
                                    {/* {format(new Date(story.createdAt), "dd/MM/yyyy")} */}
                                    {story.createdAt}
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Lượt xem:
                                </label>
                                <p className="text-gray-900">{story.views}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Trạng thái:
                                </label>
                                <p className="text-gray-900">
                                    {story.isCompleted ? "Hoàn thành" : "Đang ra"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Danh mục:
                                </label>
                                <p className="text-gray-900">
                                    {story.categories.map((cat) => cat.name).join(", ")}
                                </p>
                            </div>
                        </div>

                        {/* DescriptionShow */}
                        <div className="mt-4 col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mô tả:
                            </label>
                            <div
                                className="text-gray-900 prose"
                                dangerouslySetInnerHTML={{ __html: story.descriptionShow }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách Chapter */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Danh sách Chapter</h2>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleAddChapter}
                    >
                        Thêm Chapter
                    </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                STT
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Tiêu đề
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Ngày tạo
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Lượt xem
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Hành động</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {chapters.map((chapter, index) => (
                            <tr key={chapter.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{index + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{chapter.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">

                                        {format(new Date(chapter.createAt), "dd/MM/yyyy")}

                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{chapter.view}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                        onClick={() => handleEditChapter(chapter)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDeleteChapter(chapter.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ChapterList;