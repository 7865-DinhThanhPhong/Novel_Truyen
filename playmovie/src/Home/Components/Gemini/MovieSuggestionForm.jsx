import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaSpinner } from "react-icons/fa";

function MovieSuggestionForm({ isOpen, onClose, setSuggestedMovies }) {
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            setUser(JSON.parse(sessionStorage.getItem('user')));
        }
    }, [sessionStorage.getItem('user')]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuggestedMovies([]);

        try {
            const response = await axios.get(
                `http://localhost:8081/api/movies/gemini-suggest/${user.userId}?description=${encodeURIComponent(description)}`
            );
            setSuggestedMovies(response.data);
            onClose();
        } catch (error) {
            setError("Đã xảy ra lỗi khi tìm kiếm phim.");
            console.error("Error searching movies:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-20 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Tìm kiếm phim theo mô tả
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Mô tả:
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả nội dung phim bạn muốn xem..."
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                            rows="4"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <FaSearch className="mr-2" />
                            )}
                            Tìm kiếm
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                        >
                            Đóng
                        </button>
                    </div>
                </form>

                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        </div>
    );
}

export default MovieSuggestionForm;