import { useState, useEffect } from 'react';

import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import { BsDot } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from 'react-icons/fa';
import { rating } from '@material-tailwind/react';

function PlayMovie({ movie, onChangeAction }) {
    const ratingLevels = [
        "Cần cải thiện",
        "Chưa hay lắm",
        "Ổn",
        "Hay",
        "Rất hay",
    ];
    const [like, setLike] = useState(false);
    const [duration, setDuration] = useState(0);
    const [category, setCategory] = useState(movie.category);
    const [Rating, setRating] = useState(movie.averageRating);
    const [numOfRatings, setNumOfRatings] = useState(0);
    const [user, setUser] = useState(null);
    const averageRating = movie.averageRating ?? 0;


    // const urlMovie = 'https://www.youtube.com/watch?v=VmskDKBm9no'
    useEffect(() => {
        if (sessionStorage.getItem('user'))
            setUser(JSON.parse(sessionStorage.getItem('user')));


    }, []);
    console.log('user: ' + user);
    useEffect(() => {
        const setView = async () => {
            const res = await axios.post(`http://localhost:8081/api/movies/view/${movie.movieId}`);

        };
        const timeToSetView = setTimeout(() => {
            setView();
        }, 5000);


        return () => clearTimeout(timeToSetView);
    }, [user]);

    useEffect(() => {
        // const user = JSON.parse(sessionStorage.getItem('user'));
        if (user != null) {
            const getRaiting = async () => {
                try {
                    const res = await axios.get(`http://localhost:8081/api/ratings/${user.userId}-${movie.movieId}`);
                    console.log("rating123 : " + res.data.rating);
                    setRating(res.data.rating);
                } catch (error) {
                    console.error('Lỗi khi gọi API getRating:', error);
                }
            };
            const setHistory = async () => {
                try {
                    const res = await axios.post(`http://localhost:8081/api/histories/${user.userId}-${movie.movieId}`);
                } catch (error) {
                    console.log(error);
                }
            }
            if (user) {
                const getFavorites = async () => {
                    const res = await axios.get(`http://localhost:8081/api/favorites/${user.userId}-${movie.movieId}`);
                    console.log("Like: " + res.data);
                    if (res.data == true)
                        setLike(true);
                    else setLike(false);
                }
                getFavorites();
            }

            getRaiting();
            setHistory();
        }
        const getNumOfRatings = async () => {
            const res = await axios.get(`http://localhost:8081/api/ratings/count/${movie.movieId}`);
            setNumOfRatings(res.data);
        }
        getNumOfRatings();
    }, [movie]);

    useEffect(() => {

    }, [rating]);

    const ratingChanged = async (newRating) => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const userRating = {
                user: { userId: user.userId },
                movie: { movieId: movie.movieId },
                rating: newRating,
            };
            const response = await axios.post('http://localhost:8081/api/ratings', userRating);
            setRating(newRating);
        } catch (error) {
            console.log("Loi: " + error);
        }
    };

    const handleDeleteFavorites = async () => {
        console.log("Set DE: ");
        const res = await axios.delete(`http://localhost:8081/api/favorites/${user.userId}-${movie.movieId}`);
        console.log("Set Favorite: " + res.data);
        setLike(false);
    }

    const handleAddFavorites = async () => {
        console.log("Set ADD: ");
        const res = await axios.post(`http://localhost:8081/api/favorites/${user.userId}-${movie.movieId}`);
        console.log("Set Favorite: " + res.data);
        setLike(true);
    }


    // useEffect(() => {

    //     setCategory(movie.category);
    // }, [movie]);


    return (
        <div className=" rounded-md text-white">
            <ReactPlayer
                onDuration={setDuration}
                url={movie.trailerUrl}
                controls={true}
                width="100%"
                height="640px"
                className="rounded-lg border-2 border-gray-300"
            >
            </ReactPlayer>

            {/* <div className="w-full border-white flex gap-10 my-6 p-2">
                <div className='w-[55%] border-yellow-200 border-2'>
                    <h1 className="text-3xl font-mono font-bold mb-2" title="Spider-man">Spider-Man</h1>
                    <div className="flex gap-3 items-center my-3">
                        <div className="flex items-center  px-3 bg-slate-700 rounded-lg gap-1 text-lg">
                            <FaStar className="text-orange-500 mr-1" />
                            <p className="font-bold">4.8</p>
                            <p>(5)</p>
                        </div>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                            value={4.8} // Giá trị đánh giá
                            isHalf={true} // Cho phép đánh giá nửa sao
                            edit={true} // Không cho phép người dùng chỉnh sửa

                        />
                    </div >
                    <div className='flex gap-2 items-center my-2'>
                        <div>2002</div>
                        <BsDot className='text-lg text-slate-500' />
                        <div> {Math.floor(duration / 3600)} giờ {((duration % 3600) / 60).toFixed(0)} phút</div>
                        <BsDot className='text-lg text-slate-500' />
                        <div>Mỹ</div>
                    </div >
                    <p className='my-2 max-h-32'>Bộ phim đầu tiên của series siêu nhện đi vào quá trình hình thành nên một Peter Parker với sức mạnh siêu nhiên thông qua vết cắn của một con nhện biến đổi gen. Từ đây, anh khám phá ra hàng loạt khả năng đặc biệt của mình cũng như bắt đầu dấn thân vào nhiệm vụ giải cứu thế giới khỏi thế lực hắc ám.</p>

                </div>
                <div className=' border-yellow-200 border-2 ml-3 w-[45%]'>
                    <div classname="flex gap-2">

                        <div className="p-2 bg-slate-500 rounded-full w-10 ml-3">
                            <FaRegHeart className={`hover:text-red-500 ${like ? 'hidden' : ''} `} style={{ fontSize: '1.5rem' }} onClick={() => setLike(true)} />
                            <FaHeart className={`text-red-500 hover:scale-110 text-xl ${like ? '' : 'hidden'} `} onClick={() => setLike(false)} />

                        </div>
                        <p>Theo dõi</p>
                    </div>
                    <div className=' gap-4'>

                        <div classname="flex justify-between text-3xl bg-white w-full h-52">
                            <p>Diễn viên:</p>
                            <p>Tobey Maguire, Kirsten Dunst, Willem Dafoe</p>
                        </div>
                        <div>
                            <p>Đạo diễn:</p>
                            <p>Sam Raimi</p>
                        </div>
                        <div>
                            <p>Thể loại:</p>
                            <p>Hành động, Phiêu lưu, Viễn tưởng</p>
                        </div>
                        <div>
                            <p>Danh mục:</p>
                            <p>Phim lẻ Hành động</p>

                        </div>
                    </div>
                </div>
            </div> */}
            <div className="w-full border-white flex gap-10 my-6 p-2">
                <div className="w-[60%]">
                    <h1 className="text-3xl font-mono font-bold mb-2" title="Spider-man">
                        {movie.title}
                    </h1>
                    <div className="flex gap-3 items-center my-3">
                        <div className="flex items-center px-3 bg-slate-700 rounded-lg gap-1 text-lg">
                            <FaStar className="text-orange-500 mr-1" />
                            <p className="font-bold">{averageRating.toFixed(1)}</p>
                            <p>({numOfRatings})</p>
                        </div>
                        {console.log("Rating: " + Rating)
                        }
                        <ReactStars
                            key={Rating}
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                            value={user == null ? averageRating.toFixed(1) : Rating} // Giá trị đánh giá
                            isHalf={true} // Cho phép đánh giá nửa sao
                            edit={sessionStorage.getItem('user') ? true : false} // Cho phép người dùng chỉnh sửa
                            className="text-2xl transition-transform duration-300 hover:scale-110"

                        />
                        {console.log("Value: " + movie.averageRating)}
                    </div>
                    <div className="flex gap-2 items-center my-2">
                        <div>{movie.releaseYear}</div>
                        <BsDot className="text-lg text-slate-500" />
                        <div>
                            {" "}
                            {Math.floor(duration / 3600)} giờ{" "}
                            {((duration % 3600) / 60).toFixed(0)} phút
                        </div>
                        <BsDot className="text-lg text-slate-500" />
                        <div>{movie.country}</div>
                    </div>
                    <p className="my-2 max-h-32 mb-16" dangerouslySetInnerHTML={{ __html: movie.descriptionShow }} >

                    </p>
                </div>
                <div className=" w-[40%]">
                    {sessionStorage.getItem('user') &&
                        <div className="flex gap-2 items-center p-2">

                            <div className="p-2 bg-slate-500 rounded-full w-10 ml-3" onClick={() => onChangeAction('login')}>
                                <FaRegHeart
                                    className={`hover:text-red-500 ${like ? "hidden" : ""}`}
                                    style={{ fontSize: "1.5rem" }}
                                    onClick={handleAddFavorites}
                                />
                                <FaHeart
                                    className={`text-red-500 hover:scale-110 text-xl ${like ? "" : "hidden"
                                        }`}
                                    onClick={handleDeleteFavorites}
                                />
                            </div>
                            {like ? (
                                <p>Đang Theo dõi</p>
                            ) : (
                                <p>Theo dõi</p>
                            )}
                        </div>
                    }

                    <div className="p-2">
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-4">
                                <p className=''>Diễn viên:</p>
                                <p className='col-span-3'>{movie.actors} </p>
                            </div>
                            <div className="grid grid-cols-4">
                                <p>Đạo diễn:</p>
                                <p className='col-span-3'>{movie.director}</p>
                            </div>
                            <div className="grid grid-cols-4">
                                <p className=''>Thể loại:</p>
                                <p className='col-span-3'>{movie.genres}</p>
                            </div>
                            <div className="grid grid-cols-4">
                                <p >Danh mục:</p>
                                {console.log("---------------------------------")
                                }
                                <p className='col-span-3'>{movie.category?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayMovie;