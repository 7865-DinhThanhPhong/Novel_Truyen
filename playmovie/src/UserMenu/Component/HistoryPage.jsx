import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HistoryPage() {
    const [histories, setHistories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [historiesPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState("desc");
    const [action, setAction] = useState(false);

    useEffect(() => {
        const u = JSON.parse(sessionStorage.getItem("user"));

        const fetchHistories = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/histories/user/${u.userId}`
                );
                setHistories(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử xem phim", error);
            }
        };

        fetchHistories();
    }, [action]);

    const handleDelete = async (userId, movieId) => {
        try {
            const res = await axios.delete(`http://localhost:8081/api/histories/${userId}-${movieId}`);
            setAction(!action);
        } catch (error) {
            console.error("Loi khi xoa history userId: " + userId + ", movieId: " + movieId);
        }
    }

    // Hàm xử lý sắp xếp
    const handleSortChange = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    // Sắp xếp danh sách histories
    const sortedHistories = [...histories].sort((a, b) => {
        const dateA = new Date(a.watchedAt);
        const dateB = new Date(b.watchedAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    // Logic phân trang
    const indexOfLastHistory = currentPage * historiesPerPage;
    const indexOfFirstHistory = indexOfLastHistory - historiesPerPage;
    const currentHistories = sortedHistories.slice(
        indexOfFirstHistory,
        indexOfLastHistory
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Lịch sử xem phim</h1>

            {/* Nút sắp xếp */}
            <div className="mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSortChange}
                >
                    Sắp xếp: {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
                </button>
            </div>

            {/* Bảng lịch sử */}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-1 py-2">STT</th>
                        <th className="px-4 py-2">Tên phim</th>
                        <th className="px-4 py-2">Thể Loại</th>
                        <th className="px-1 py-22">Danh Mục</th>
                        <th className="px-22 py-2">Thời gian xem</th>
                        <th className="py-2 px-22"></th>
                    </tr>
                </thead>
                <tbody>
                    {currentHistories.map((history, index) => (
                        <tr key={index}>
                            <td className="border-b px-1 py-2">
                                {(currentPage - 1) * historiesPerPage + index + 1}
                            </td>
                            <td className="border-b px-4 py-2 text-blue-700 hover:cursor-pointer hover:text-blue-500 hover:underline">
                                <Link to={`http://localhost:5173/movie-page/id=${history.movie.movieId}`}>{history.movie.title}</Link>
                            </td>
                            <td className="border-b px-4 py-2">{history.movie.genres}</td>
                            <td className="border-b px-4 py-2">{history.movie.category.name}</td>
                            <td className="border-b px-4 py-2">
                                {new Date(history.watchedAt).toLocaleString()}
                            </td>
                            <td ><button className="text-blue-400 hover:text-blue-600 underline" onClick={() => handleDelete(history.user.userId, history.movie.movieId)}>delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Phân trang */}
            <div className="mt-4 bg-white">
                <div></div>
                {histories.length > historiesPerPage && (
                    <ul className="flex justify-center">
                        {Array(Math.ceil(histories.length / historiesPerPage))
                            .fill()
                            .map((_, index) => (
                                <li key={index} className="mx-2">
                                    <button
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${currentPage === index + 1 ? "bg-blue-700" : ""
                                            }`}
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default HistoryPage;