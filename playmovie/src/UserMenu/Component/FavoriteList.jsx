import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FavoriteList = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/favorites/user/${userId}`);
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [userId]);

    const handleRemoveFavorite = async (userId, movieId) => {
        try {
            await axios.delete(`http://localhost:8081/api/favorites/${userId}-${movieId}`);
            // Cập nhật lại danh sách yêu thích sau khi xóa
            setFavorites(favorites.filter(fav => fav.movie.movieId !== movieId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl font-bold mb-4 text-white">Phim yêu thích</h1>
            {favorites.length === 0 ? (
                <p className='text-white'>Bạn chưa có phim yêu thích nào.</p>
            ) : (
                <ul className="space-y-4 max-h-[720px] overflow-y-auto">
                    {favorites.map((fav) => (
                        <li key={`${fav.movie.movieId}`} className="bg-white shadow rounded-lg overflow-hidden flex">

                            <div className="relative pb-56/100 w-1/3"> {/* Tỷ lệ khung hình 16:9 */}
                                <Link to={`http://localhost:5173/movie-page/id=${fav.movie.movieId}`}>
                                    <img
                                        src={fav.movie.bgUrl}
                                        alt={fav.movie.title}
                                        className="absolute top-0 left-0 w-full h-full object-cover"
                                    />
                                </Link>
                            </div>


                            <div className="p-4 flex-grow">
                                <Link to={`http://localhost:5173/movie-page/id=${fav.movie.movieId}`}>
                                    <h2 className="text-xl font-semibold hover:text-blue-400">{fav.movie.title}</h2>
                                </Link>


                                <div className="mt-4">
                                    <p>
                                        <span className="font-medium">Đạo diễn:</span> {fav.movie.director}
                                    </p>
                                    <p>
                                        <span className="font-medium">Diễn viên:</span> {fav.movie.actors}
                                    </p>
                                    <p>
                                        <span className="font-medium">Thể loại:</span> {fav.movie.genres}
                                    </p>
                                    <p>
                                        <span className="font-medium">Năm phát hành:</span> {fav.movie.releaseYear}
                                    </p>
                                    <p>
                                        <span className="font-medium">Quốc gia:</span> {fav.movie.country}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="p-4 hover:bg-red-100"
                                onClick={() => handleRemoveFavorite(fav.user.userId, fav.movie.movieId)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    );
};

export default FavoriteList;