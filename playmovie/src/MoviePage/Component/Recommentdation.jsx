import { useState, useRef, useEffect, memo } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";

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

function Recommentdation({ movies, onChangeAction }) {
    const [Movies, setMovies] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const sliderRef = useRef(null);
    const moviesPerPage = 5;  // so luong movie trong moi list hien thi
    const widthCard = 19;
    const moviesLength = movies.length;


    useEffect(() => {
        // Xáo trộn danh sách phim khi component được mount
        //  const shuffledMovies = shuffleArray(movies);


        setMovies(movies);

    }, [movies]); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần

    // Hàm xáo trộn mảng (Fisher-Yates Shuffle algorithm)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


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
                {Movies.map(movie => (
                    <a
                        key={movie.movieId}
                        className={`h-[380px] cursor-pointer rounded-md w-[19%] flex-shrink-0 relative`} // Di chuyển transition vào đây
                    >

                        <Link to={`http://localhost:5173/movie-page/id=${movie.movieId}`}>
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-[85%] mb-1 hover:scale-105 transition-all duration-300"
                            />
                            <p className="pt-1 leading-snug w-full text-ellipsis overflow-hidden line-clamp-2 text-center">
                                {movie.title}
                            </p>
                        </Link>
                        {/* {props.sticker1 &&
                            <div className="absolute bg-red-400  px-3 text-center top-1 right-1 rounded-lg">
                                {props.sticker1}
                            </div>
                        }
                        {props.sticker2 &&
                            <div className="absolute bg-blue-400  px-3 text-center top-1 left-1 rounded-lg">
                                {props.sticker2}
                            </div>
                        } */}
                    </a>
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



export default memo(Recommentdation);