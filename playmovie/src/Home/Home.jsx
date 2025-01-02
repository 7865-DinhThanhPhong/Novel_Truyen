import { memo, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Slider from "./Components/Slider";
import Footer from "./Components/Footer";
import TopMovies from "./Components/TopMovies";
import ErrorMessage from "../Admin/Component/ErrorMessage";
import Recommentdation from "../MoviePage/Component/Recommentdation";
import MovieSuggestionForm from "./Components/Gemini/MovieSuggestionForm"; // Import component MovieSuggestionForm


export const MoviesContext = createContext(null);


function Home() {
    const [movies, setMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [suggestedMovies, setSuggestedMovies] = useState([]);
    const [suggestChange, setSuggestChange] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUser(user);
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/movies/hybird/${user.userId}`);

                setMovies(response.data);
            } catch (error) {
                <ErrorMessage message={error}></ErrorMessage>
            }
        };
        const fetchNewMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/movies/new`);

                setNewMovies(response.data);
            } catch (error) {
                console.log("Loi newMovies: " + error);
            }
        };
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/movies/top-movies`);

                setPopularMovies(response.data);
            } catch (error) {
                console.log("Loi newMovies: " + error);
            }
        };
        if (user) {
            fetchMovies();
        }
        fetchNewMovies();
        fetchPopularMovies();

    }, []);

    // useEffect(() => {
    //     // const user = JSON.parse(sessionStorage.getItem('user'));
    //     if (user) {
    //         const getSuggestedMovies = async () => {
    //             const response = await axios.get(`http://localhost:8081/api/movies/suggest-user/${user.userId}`);
    //             console.log("Test: " + response.data);

    //             setSuggestedMovies(response.data);

    //         }
    //         getSuggestedMovies();
    //     }


    // }, []);

    // const handleSuggestChange = () => {
    //     setSuggestChange(!suggestChange);
    // }
    return (

        <MoviesContext.Provider value={movies}>
            <div className="w-full h-20 mx-auto Home_layout">
                <Navbar className="mb-4 fixed"></Navbar>

                <div className="h-24"></div>

                <Banner ></Banner>
                <br />

                {user != null &&
                    <div className="text-center mb-4">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setIsFormOpen(true)}
                        >
                            Tìm kiếm phim theo mô tả
                        </button>
                    </div>}

                <MovieSuggestionForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    setSuggestedMovies={setSuggestedMovies} // Truyền hàm setSuggestedMovies vào
                />

                {suggestedMovies.length > 0 && (
                    <div className="text-white">
                        <h1 className="text-white my-3 text-2xl font-bold">Phim được đề xuất</h1>
                        <Slider movies={suggestedMovies} />
                    </div>
                )}

                {sessionStorage.getItem('user') &&
                    <div classname="text-white">
                        <h1 className="text-white my-3 text-2xl font-bold">Movie đề xuất </h1>
                        <Recommentdation movies={movies} ></Recommentdation>
                    </div>
                }

                <br />


                <div classname="text-white">
                    <h1 className="text-white my-3 text-2xl font-bold">Gemiini</h1>
                    {console.log("New Movie: " + newMovies)}
                    <Slider sticker1="New" movies={suggestedMovies}></Slider>
                </div>


                <br />
                <div classname="text-white">
                    <h1 className="text-white my-3 text-2xl font-bold">MỚI RA MẮT</h1>
                    {console.log("New Movie: " + newMovies)}
                    <Slider sticker1="New" movies={newMovies}></Slider>
                </div>
                <br />


                <div classname="text-white">
                    <h1 className="text-white my-3 text-2xl font-bold">TOP 10 </h1>
                    <TopMovies />
                </div>
                <br />
                <div classname="text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white my-3 text-2xl font-bold ">MỚI RA MẮT</h1>

                        <a href="" className="text-lg underline underline-offset-4 text-blue-600 opacity-100 transition-opacity hover:opacity-90
                  duration-400 p-0 m-[-5px] mr-1 pr-2">Xem Tất cả --></a>
                    </div>

                    <Slider sticker2="Hot" movies={popularMovies}></Slider>
                </div>
                <br />
                <br />
                <Footer></Footer>
            </div>
        </MoviesContext.Provider>
    )
}

export default memo(Home);