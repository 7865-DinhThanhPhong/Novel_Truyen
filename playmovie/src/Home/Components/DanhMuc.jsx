import { useState, useContext, createContext, useEffect, useRef, memo } from "react";
import { MoviesContext } from '../Home';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";



const DanhMuc = () => {
    const movies = useContext(MoviesContext);


    const [currentIndex, setCurrentIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const sliderRef = useRef(null);
    const moviesPerPage = 5;  // so luong movie trong moi list hien thi
    const widthCard = 19;
    const moviesLength = movies.length;



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

            <div className="flex transition-transform duration-500 ease-in-out gap-4 pr-2 justify-around"
                ref={sliderRef}
            >
                {movies.map((movie, index) => (
                    <a
                        key={movies.id}
                        className={`h-[240px] cursor-pointer rounded-md w-[${widthCard}%] flex-shrink-0`} // Di chuyển transition vào đây
                    >
                        <div className="flex w-full">
                            <div className="w-[40%] bg-black/50 flex items-center justify-center text-white text-[3rem] font-bold">
                                {index + 1}
                            </div>
                            <img
                                src={movie.image}
                                alt={movie.name}
                                className="w-[60%] h-[85%] mb-1 hover:scale-105 transition-all duration-300"
                            />

                        </div>

                        <p className="pt-1 leading-snug w-full text-ellipsis overflow-hidden line-clamp-2 text-center">
                            {movie.name}
                        </p>
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

export default memo(DanhMuc);