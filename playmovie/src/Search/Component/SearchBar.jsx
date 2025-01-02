import { useState, useEffect, useRef, memo } from "react";
import Switch from "react-switch";

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchResultRef = useRef(null);
    const [searchMode, setSearchMode] = useState(false);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchMovies = async () => {
        try {
            const apiKey = "66b8c5f69fd816b32a23a5e2c278d645"; // Thay bằng API key của bạn
            const response = await fetch(
                `http://localhost:8081/api/movies/search-normal?query=${searchTerm}`
            );

            const data = await response.json();
            console.log("Ket qua: " + data);

            setSearchResults(data);
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        }
    };


    //Ham dalay de tranh goi api lien tuc
    useEffect(() => {
        if (searchTerm && searchMode == false) {
            const delayDebounceFn = setTimeout(() => {
                searchMovies();
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!searchResultRef.current.contains(event.target) && searchResultRef.current) {
                setSearchResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => (
            document.removeEventListener("mousedown", handleClickOutside)
        );
    }, []);

    const searchResultsConfirm = (result) => {
        if (result) {
            const searchInput = document.getElementById('default-search');

            searchInput.value = result.title;
            setSearchResults([]);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchInput = event.target.elements.searchInput.value;
        if (searchMode) onSearch(searchTerm, 'true');
        else onSearch(searchTerm, 'false');

        // setSearchResults([]);

    }

    return (
        <div className="relative w-2/3 mx-auto ">
            <div className="flex w-full justify-center items-center gap-5 ">
                <form className="w-[100%]" onSubmit={handleSubmit}>

                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

                    <div className="relative">

                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">

                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />

                            </svg>

                        </div>

                        <input type="search" id="default-search" name="searchInput" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required
                            onChange={handleSearchChange}
                        />

                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

                    </div>

                </form>
                <div className=" w-[35%] ">
                    <label htmlFor="search-mode-switch" className="flex">

                        <Switch
                            onChange={setSearchMode}
                            checked={searchMode}
                            id="search-mode-switch"
                            onColor="#86d3ff"
                            offColor="#ccc"
                            checkedIcon={false}
                            uncheckedIcon={false}
                            height={20}
                            width={40}
                        />
                        <p style={{ marginLeft: "10px", color: 'white' }}>
                            {searchMode ? "Semantic Search" : "Bình thường"}
                        </p>
                    </label>

                </div>
            </div>


            <div className="search-results absolute  bg-[#272727] text-white w-full rounded-md max-h-96 overflow-y-clip mx-auto"
                ref={searchResultRef}
            >
                {searchResults.length > 0 && !searchMode && (
                    <ul className="rounded-md p-1">
                        {searchResults.map((result) => (
                            <li key={result.movieId} className=" p-1  hover:bg-slate-500 hover:font-semibold line-clamp-1 cursor-pointer"
                                onClick={() => searchResultsConfirm(result)} title={result.title}
                            >
                                {result.title} - {result.releaseYear}

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default memo(SearchBar);