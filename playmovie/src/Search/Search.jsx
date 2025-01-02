import { memo, useState } from "react";

import Navbar from "../Home/Components/Navbar";
import Footer from "../Home/Components/Footer";
import SearchBar from "./Component/SearchBar";
import SearchResult from "./Component/SearchResult";





function Search() {
    const [moviesSearch, setMoviesSearch] = useState('');
    const [sematicSearch, setSematicSearch] = useState(false);


    const handleSearch = (newMovies, value) => {
        setMoviesSearch(newMovies);
        console.log(newMovies, value);

        setSematicSearch(ss => value == 'true' ? true : false);
    };


    console.log("sematic: " + sematicSearch);


    return (
        <div className="w-[75%]  h-20 mx-auto">
            <Navbar className="mb-4 fixed"></Navbar>
            <div className="h-24"></div>
            <SearchBar onSearch={handleSearch} ></SearchBar>
            <br className="mt-10" />
            <div className="mt-10"></div>
            <h1 className="text-white text-2xl font-semibold p-2 pb-4"> Kết quả từ khóa "<p className="text-2xl font-bold inline">{moviesSearch}</p>"</h1>
            <SearchResult keyWord={moviesSearch} sematicSearchMode={sematicSearch}></SearchResult>


            <br />
            <br />
            <Footer></Footer>
        </div >


    )
}

export default memo(Search);