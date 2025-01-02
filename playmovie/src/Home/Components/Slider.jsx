import { useState, useRef, useEffect, memo } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

// const movies = [
//     {
//         id: 1,
//         name: 'Vợ tôi là học sinh tiểu học',
//         year: 2024,
//         totalEpisode: 24,
//         episodes: 16,
//         country: 'Nhật Bản',
//         image: 'https://upload.wikimedia.org/wikipedia/vi/a/ab/Tsuma%2C_Sh%C5%8Dgakusei_ni_Naru_vol._1_cover.jpg'
//     }, {
//         id: 2,
//         name: 'Trở thành giáo viên tại trường học quái vật',
//         year: 2024,
//         totalEpisode: 12,
//         episodes: 11,
//         country: 'Nhật Bản',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZL_dFTMrtXSL9M6N8d4D6R1s6HvdrVsXTkA&s'
//     },
//     {
//         id: 3,
//         name: 'Bleach - Huyết chiến ngàn năm',
//         year: 2024,
//         totalEpisode: 13,
//         episodes: 8,
//         country: 'Nhật Bản',
//         image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/f/f0/%C3%81p_ph%C3%ADch_phim_Huy%E1%BA%BFt_chi%E1%BA%BFn_ng%C3%A0n_n%C4%83m.jpg/220px-%C3%81p_ph%C3%ADch_phim_Huy%E1%BA%BFt_chi%E1%BA%BFn_ng%C3%A0n_n%C4%83m.jpg'
//     },
//     {
//         id: 4,
//         name: 'Dandadan',
//         year: 2024,
//         totalEpisode: 26,
//         episodes: 20,
//         country: 'Nhật Bản',
//         image: 'https://upload.wikimedia.org/wikipedia/it/thumb/1/1e/DanDaDan_Volume_1.jpg/1200px-DanDaDan_Volume_1.jpg'
//     },
//     {
//         id: 5,
//         name: 'Chú thuật hồi chiến 1',
//         year: 2022,
//         totalEpisode: 26,
//         episodes: 26,
//         country: 'Nhật Bản',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSViswWMN1gKtvv9esXjEYwMfBtGBXPkoLPSA&s'
//     },
//     {
//         id: 6,
//         name: 'Thanh gươm diệt quỷ 1',
//         year: 2020,
//         totalEpisode: 24,
//         episodes: 24,
//         country: 'Nhật Bản',
//         image: 'https://upload.wikimedia.org/wikipedia/vi/e/ed/Thanh_G%C6%B0%C6%A1m_Di%E1%BB%87t_Qu%E1%BB%B7_Chuy%E1%BA%BFn_T%C3%A0u_V%C3%B4_T%E1%BA%ADn_Poster.jpg'
//     },
//     {
//         id: 7,
//         name: 'Đại chiến titan 1',
//         year: 2020,
//         totalEpisode: 24,
//         episodes: 24,
//         country: 'Nhật Bản',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp-aHR-SlFEkjXQglZ0NZC3QfNslKXA6myRg&s'
//     },
//     {
//         id: 8,
//         name: 'Đại chiến titan 1',
//         year: 2020,
//         totalEpisode: 24,
//         episodes: 24,
//         country: 'Nhật Bản',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp-aHR-SlFEkjXQglZ0NZC3QfNslKXA6myRg&s'
//     },
//     {
//         id: 9,
//         name: 'Đại chiến titan 1',
//         year: 2020,
//         totalEpisode: 24,
//         episodes: 24,
//         country: 'Nhật Bản',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp-aHR-SlFEkjXQglZ0NZC3QfNslKXA6myRg&s'
//     }, {
//         id: 10,
//         name: 'Trở thành giáo viên tại trường học quái vật',
//         year: 2024,
//         totalEpisode: 12,
//         episodes: 11,
//         country: 'Nhật Bản',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZL_dFTMrtXSL9M6N8d4D6R1s6HvdrVsXTkA&s'
//     }, {
//         id: 11,
//         name: 'Trở thành giáo viên tại trường học quái vật',
//         year: 2024,
//         totalEpisode: 12,
//         episodes: 11,
//         country: 'Nhật Bản',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZL_dFTMrtXSL9M6N8d4D6R1s6HvdrVsXTkA&s'
//     }
// ]

function Slider(props) {
    const [movies, setMovies] = useState(props.movies);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const sliderRef = useRef(null);
    const moviesPerPage = 5;  // so luong movie trong moi list hien thi
    const widthCard = 19;
    const moviesLength = props.movies.length;
    console.log("length: " + moviesLength);


    useEffect(() => {
        setMovies(props.movies);
    }, [props.movies]);

    const handleNext = () => {
        setStartIndex(preStarIndex => startIndex == moviesLength - moviesPerPage ? 0 :
            Math.min(preStarIndex + moviesPerPage, moviesLength - moviesPerPage));
    }

    const handlePrevious = () => {
        setStartIndex(preStarIndex => Math.max(preStarIndex - moviesPerPage, 0));
    }

    useEffect(() => {
        if (sliderRef.current) {
            const slider = sliderRef.current;
            slider.style.transform = `translateX(-${(startIndex / moviesPerPage) * 100}%)`;
        }
    }, [startIndex]);



    return (
        <div className="text-white w-full flex relative overflow-hidden">

            <div className="flex transition-transform duration-500 ease-in-out gap-3 pr-2 justify-evenly"
                ref={sliderRef}
            >
                {movies.map(movie => (
                    <div
                        key={movie.movieId}
                        className={`h-[380px] cursor-pointer rounded-md w-[${widthCard}%] flex-shrink-0 relative`} // Di chuyển transition vào đây
                    >
                        <Link to={`/movie-page/id=${movie.movieId}`}>
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-[85%] mb-1 hover:scale-105 transition-all duration-300"
                            />
                            <p className="pt-1 leading-snug w-full text-ellipsis overflow-hidden line-clamp-2 text-center">
                                {movie.title}
                            </p>
                        </Link>

                        {props.sticker1 &&
                            <div className="absolute bg-red-400  px-3 text-center top-1 right-1 rounded-lg">
                                {props.sticker1}
                            </div>
                        }
                        {props.sticker2 &&
                            <div className="absolute bg-blue-400  px-3 text-center top-1 left-1 rounded-lg">
                                {props.sticker2}
                            </div>
                        }
                    </div>

                ))}
            </div>
            {
                (startIndex > 0 &&
                    <div className="absolute top-0 left-0 h-[85%] ">
                        <GrFormPrevious className="text-[3rem] py-28 h-full cursor-pointer transition-opacity duration-150 bg-gradient-to-r from-slate-900 to-slate-400 opacity-0  hover:opacity-90 active:text-red-500"
                            onClick={handlePrevious}
                        ></GrFormPrevious>
                    </div>
                )
            }

            <div className="absolute top-0 right-0 h-[90%] cursor-pointer">
                <GrFormNext className="text-[3rem] py-28 h-full  bg-gradient-to-r from-slate-200 to-slate-900 opacity-0 transition-opacity duration-150 hover:opacity-90 active:text-red-500"
                    onClick={handleNext}
                ></GrFormNext>
            </div>
        </div>
    )
}

// const Content = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const sliderRef = useRef(null);
//     const moviesPerPage = 3;
//     const setWidth = 50;

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) => ((prevIndex + 1) * moviesPerPage < movies.length) ? prevIndex + 1 : 0);
//     };

//     const handlePrevious = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? Math.floor(movies.length / moviesPerPage) : prevIndex - 1
//         );
//     };

//     useEffect(() => {
//         if (sliderRef.current) {
//             const slider = sliderRef.current;
//             slider.style.transform = `translateX(-${currentIndex * 100}%)`;
//         }
//     }, [currentIndex]);
//     const mo = movies.slice(currentIndex * 4, (currentIndex + 1) * 4)
//     return (
//         <div className="relative w-full overflow-hidden">
//             <h1 className={`bg-white   h-[360px]`}>wq
//                 <div className={`bg-red-500  w-[${setWidth}px] h-[360px]`}></div>
//             </h1>
//             <div
//                 className="flex transition-transform duration-500 ease-in-out gap-3 "
//                 ref={sliderRef}
//             >
//                 {movies.map((movie) => (
//                     <div key={movie.id} className={`w-[${setWidth}px] h-[360px]  `}>
//                         <img
//                             src={movie.image}
//                             alt={movie.name}
//                             className={`w-[${setWidth}px] h-[330px]`}
//                         />
//                         <div className="text-center">
//                             <h3 className="text-lg font-semibold text-white">{currentIndex}/{setWidth}</h3>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="absolute inset-y-0 left-0 flex items-center">
//                 <button
//                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"
//                     onClick={handlePrevious}
//                 >
//                     Previous
//                 </button>
//             </div>
//             <div className="absolute inset-y-0 right-0 flex items-center">
//                 <button
//                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r"
//                     onClick={handleNext}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// }

// const Content = () => {
//     return (
//         <div className="w-full gap-3 pr-2">
//             <Carousel responsive={responsive} className="flex gap-1 text-white">

//                 {movies.map(movie => (
//                     <a
//                         key={movie.id}
//                         className="h-[360px] cursor-pointer rounded-md transition-transform duration-300 ease-in-out" // Di chuyển transition vào đây
//                     >
//                         <img
//                             src={movie.image}
//                             alt={movie.name}
//                             className="w-full h-[85%] mb-1 hover:scale-105 transition-all duration-300"
//                         />
//                         <p className="pt-1 leading-snug w-full text-ellipsis overflow-hidden line-clamp-2 text-center">
//                             {movie.name}
//                         </p>
//                     </a>
//                 ))}
//             </Carousel>
//             <br />
//         </div>

//     )
// }

// const Content = () => {
//     const [startIndex, setStartIndex] = useState(0);
//     const moviesPerPage = 5;

//     const handleNext = () => {
//         setStartIndex(preStarIndex => Math.min(preStarIndex + moviesPerPage, movies.length - moviesPerPage));
//     }

//     const handlePrevious = () => {
//         setStartIndex(preStarIndex => Math.max(preStarIndex - moviesPerPage, 0));
//     }

//     const currentMovie = movies.slice(startIndex, startIndex + moviesPerPage);

//     return (
//         <div className="text-white w-full flex relative ">

//             <div className="grid grid-cols-5 w-full gap-3 pr-2">
//                 {currentMovie.map(movie => (
//                     <a
//                         key={movie.id}
//                         className="h-[360px] cursor-pointer rounded-md transition-transform duration-300 ease-in-out" // Di chuyển transition vào đây
//                     >
//                         <img
//                             src={movie.image}
//                             alt={movie.name}
//                             className="w-full h-[90%] mb-1 hover:scale-105 transition-all duration-300"
//                         />
//                         <p className="pt-1 leading-snug w-full text-ellipsis overflow-hidden line-clamp-2 text-center">
//                             {movie.name}
//                         </p>
//                     </a>
//                 ))}
//             </div>
//             <div className="absolute top-0 left-0 h-[90%] ">
//                 <GrFormPrevious className="text-[3rem] py-28 h-full cursor-pointer transition-opacity duration-150 bg-gradient-to-r from-slate-900 to-slate-400 opacity-0  hover:opacity-90 active:text-red-500"
//                     onClick={handlePrevious}
//                 ></GrFormPrevious>
//             </div>



//             <div className="absolute top-0 right-0 h-[90%] cursor-pointer">
//                 <GrFormNext className="text-[3rem] py-28 h-full  bg-gradient-to-r from-slate-200 to-slate-900 opacity-0 transition-opacity duration-150 hover:opacity-90 active:text-red-500"
//                     onClick={handleNext}
//                 ></GrFormNext>
//             </div>
//         </div>
//     )
// }

export default memo(Slider);