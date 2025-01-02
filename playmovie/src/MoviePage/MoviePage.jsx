import { useState, useEffect, createContext } from "react";
import Navbar from "../Home/Components/Navbar";
import Footer from "../home/Components/Footer";
import PlayMovie from "./Component/PlayMovie";
import Recommentdation from "./Component/Recommentdation";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from "../Admin/Component/ErrorMessage";
import Login from "../Home/Components/Login";
import CommentList from "./Component/Comment/CommentList";

const actionContext = createContext()

function MoviePage() {
    const id = useParams();
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
    let i = id.id.split('=')[1];
    const [user, setUser] = useState(null);
    const [action, setAction] = useState('none');


    // useEffect (() => {
    //     const getHistory = async () => {
    //         const response = await axios.post(`http://localhost:8081/api/movies/${i}`)
    //     }
    // })

    useEffect(() => {

        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/movies/${i}`);
                setMovie(response.data);

                // setUser (JSON.parse(sessionStorage.getItem('user')));
            } catch (error) {
                <ErrorMessage message={error}></ErrorMessage>
            }
        };
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/movies");
                console.log(response.data);
                setMovies(response.data);

            } catch (error) {
                <ErrorMessage message={error}></ErrorMessage>
            }
        }
        fetchMovies();
    }, [id, user]);

    const onChangeAction = (value) => {
        console.log(value);

        setAction(value);
    }

    return (
        <div className="max-w-[75%] mx-auto">
            <Navbar action={action}></Navbar>

            <div className="h-24"></div>
            <div>
                <PlayMovie movie={movie} onChangeAction={onChangeAction}></PlayMovie>
                <br />
                <div classname="text-white">
                    {sessionStorage.getItem('user') &&
                        <h1 className="text-white my-3 text-2xl font-bold">TOP 10 movie đề xuất cho bạn</h1>
                    }
                    {!sessionStorage.getItem('user') &&
                        <h1 className="text-white my-3 text-2xl font-bold">Movie Đề Xuất</h1>

                    }

                    <Recommentdation movies={movies} onChangeAction={onChangeAction}></Recommentdation>
                </div>

            </div>
            <br />
            {movie ? (
                <CommentList movieId={movie.movieId}></CommentList>
            ) : (
                <CommentList movieId={4}></CommentList>
            )}
            <br />
            <Footer></Footer>
        </div>
    )
}

export default MoviePage;