import { useState, useEffect, useRef, memo } from "react";
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from 'react-icons/fa';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ErrorMessage from "../../Admin/Component/ErrorMessage";
import axios from "axios";
import { data, Link } from "react-router-dom";




const Banner = () => {
    const [like, setLike] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(0)
    const bannerRef = useRef(null);
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        console.log(JSON.parse(storedUser));
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [sessionStorage.getItem('user')]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/movies/new');
                setMovies(response.data);


            } catch (error) {
                <ErrorMessage message={error}></ErrorMessage>
            }
        };

        const fetchFavorites = async (userId) => {
            try {
                const res = await axios.get(`http://localhost:8081/api/favorites/user/${userId}`);
                setFavorites(res.data);
            } catch (error) {
                <ErrorMessage message={error}></ErrorMessage>
            }
        }
        fetchMovies();
        if (user != null)
            fetchFavorites(user.userId);
    }, [like, user]);



    const isMovieInFavorites = (movieId) => {
        return favorites.some(fav => fav.movie.movieId === movieId);
    };
    useEffect(() => {
        const interval = setInterval(() => {

            setCurrentBanner(preBanner => (preBanner + 1) % movies.length)
        }, 5000);

        return () => clearInterval(interval);
    }, [currentBanner]);

    const handleDeleteFavorites = async (movieId) => {
        console.log("Set DE: ");
        const res = await axios.delete(`http://localhost:8081/api/favorites/${user.userId}-${movieId}`);
        console.log("Set Favorite: " + res.data);
        setLike(false);
    }

    const handleAddFavorites = async (movieId) => {
        console.log("Set ADD: ");
        const res = await axios.post(`http://localhost:8081/api/favorites/${user.userId}-${movieId}`);
        console.log("Set Favorite: " + res.data);
        setLike(true);
    }

    const nextBanner = () => {


        setCurrentBanner(preBanner => (preBanner + 1) % movies.length);
    }
    const prevBanner = () => {
        setCurrentBanner(preBanner => (preBanner - 1 + movies.length) % movies.length);
    }

    useEffect(() => {
        if (bannerRef.current) {
            const bannerSlider = bannerRef.current;

            bannerSlider.style.transform = `translateX(-${(currentBanner) * 100}%)`;
        }
    }, [currentBanner]);

    return (
        <div className="relative my-2 w-full min-h-96  overflow-hidden z-0">

            <div className="flex min-h-96 max-h-[600px] relative bg-cover border border-black transition-transform duration-500 ease-in-out"
                ref={bannerRef}
            >
                {
                    movies.map(movie =>
                        <div key={movie.movieId} className="flex-shrink-0 w-full relative ">
                            <img className="object-cover max-h-[600px] w-[100%] bg-gradient-to-bl  from-white to-black " src={movie.bgUrl} alt={movie.title} />
                            <div className=" absolute opacity-90 break-words text-white bottom-0 left-0 p-4 pl-8 rounded-r-3xl  bg-slate-900  max-w-[45%] max-h-[45%] overflow-hidden ">
                                <h1 className="mb-4 line-clamp-1 bg-transparent  font-extrabold uppercase font-playfair text-3xl">{movie.title}</h1>
                                <p className="line-clamp-3 leading-5 max-w-[100%] mb-2" dangerouslySetInnerHTML={{ __html: movie.description }}></p>
                                <div className="mb-3 bg-transparent flex gap-4">
                                    <h3>{movie.releaseYear}</h3>
                                    {/* <h3> {movie.episodes}/{movie.totalEpisode} tập</h3> */}
                                    <h3> {movie.country}</h3>

                                </div>
                                <div className="flex gap-5 items-center space-x-6">
                                    <Link to={`http://localhost:5173/movie-page/id=${movie.movieId}`}>
                                        <button className="p-2 px-6 flex items-center gap-3 bg-[#ff5833] rounded-lg hover:scale-110 transition-transform duration-150">
                                            <FaPlay />
                                            <h1 className="text-lg font-bold">Xem ngay</h1>
                                        </button>
                                    </Link>
                                    {sessionStorage.getItem('user') &&
                                        <div className="p-2 bg-black rounded-full" >
                                            {isMovieInFavorites(movie.movieId) ? (
                                                <FaHeart className={`text-red-500 hover:scale-110 text-xl `} onClick={() => handleDeleteFavorites(movie.movieId)} />
                                            ) : (
                                                <FaRegHeart className={`hover:text-red-500 `} style={{ fontSize: '1.5rem' }} onClick={() => handleAddFavorites(movie.movieId)} />
                                            )}


                                        </div>

                                    }


                                </div>
                            </div>
                        </div>
                    )
                }



            </div>
            <div className="w-full  absolute top-1/3 left-0 bg-transparent flex items-center justify-between">
                <GrFormPrevious className="text-[5rem] text-black  h-full opacity-50 hover:opacity-100 hover:text-orange-400 " onClick={prevBanner} />

                <GrFormNext className="text-[5rem] text-black  h-full opacity-50 hover:opacity-100 hover:text-orange-400" onClick={nextBanner} />

            </div>

            <div>

            </div>
        </div>
    );
};

export default memo(Banner);