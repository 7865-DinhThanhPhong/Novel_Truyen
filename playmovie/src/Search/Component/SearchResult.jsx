import { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function SearchResult({ keyWord, sematicSearchMode }) {
    const [movies, setMovies] = useState([]);
    console.log("key: " + typeof (keyWord));
    // useEffect(() => {
    //     const fetchMovie = async () => {
    //         try {
    //             const API = '66b8c5f69fd816b32a23a5e2c278d645';
    //             const response = await
    //                 fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API}&query=${keyWord}`);

    //             const data = await response.json();
    //             console.log(data.results);

    //             setMovies(data.results);
    //         } catch (error) {
    //             console.log("Loi: ", e);
    //             setMovies([]);
    //         }
    //     };
    //     fetchMovie();
    // }, [keyWord]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {

                if (!sematicSearchMode) {
                    const response = await
                        fetch(`http://localhost:8081/api/movies/search-normal?query=${keyWord}`);
                    const data = await response.json();
                    console.log(data.results);

                    setMovies(data);
                } else {
                    const response = await fetch(`http://localhost:8081/api/movies/search?query=${keyWord}`);
                    const data = await response.json();
                    console.log(data.results);

                    setMovies(data);
                }


            } catch (error) {
                console.log("Loi: ", error);
                setMovies([]);
            }
        };
        if (keyWord != "") {
            fetchMovie();
        }
    }, [keyWord, sematicSearchMode]);



    return (
        <div className="w-full ">
            <div className="grid grid-cols-5 gap-5 gap-y-14 overflow-hidden items-center text-white cursor-pointer py-3">

                {movies.length > 0 &&
                    movies.map(movie =>
                        <Link to={`http://localhost:5173/movie-page/id=${movie.movieId}`}>
                            <div className=" h-[200px] hover:scale-110 transition-transform duration-300 hover:font-bold">
                                <img className="h-[75%] w-full "
                                    src={movie.bgUrl} alt="" />

                                <p className=" line-clamp-2 text-center p-1 " title={movie.title}>{movie.title}</p>
                            </div>
                        </Link>

                    )
                }

                {/* {movies.length > 0 &&
                    movies.map(movie =>
                        <div className=" h-[200px] hover:scale-110 transition-transform duration-300 hover:font-bold">
                            <img className="h-[75%] w-full "
                                src={`https://image.tmdb.org/t/p/w185${movie.backdrop_path
                                    }`} alt="" />

                            <p className=" line-clamp-2 text-center p-1 " title={movie.title}>{movie.title}</p>
                        </div>
                    )
                } */}
                {/* 
                <div className="bg-yellow-300"></div>
                <div className="bg-yellow-400"></div>
                <div className="bg-yellow-500"></div>
                <div className="bg-yellow-600"></div> */}
            </div>

        </div>
    )
}

export default memo(SearchResult);