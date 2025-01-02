import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DeleteStory from './DeleteStory';

function StoryList({ onContentChange, onGetData }) {
    const [stories, setStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [storiesPerPage] = useState(10);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('http://localhost:8082/stories');
                console.log("data: " + response.data);
                setLoad(true);
                setStories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách truyện:', error);
            }
        };

        fetchStories();
    }, [load]);

    const handleEditStory = (story) => {
        onContentChange('movie-edit'); // Chuyển hướng đến component EditStory (cần tạo component này)
        onGetData(story);
    }
    const handleShowChapters = (story) => {
        onContentChange('chapter-list');
        onGetData(story);
    }

    const onStoryDeleted = () => {
        setLoad(false);
    }

    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-black">Danh sách Truyện</h1>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-green-800 ">
                                        <tr>
                                            <th scope='col'
                                                className='px-1 py-3 text-center text-xs font-bold bg-red-500 text-white uppercase tracking-wider'
                                            >
                                                STT
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-center text-xs font-bold  text-white uppercase tracking-wider"
                                            >
                                                Tiêu đề
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-center text-xs font-bold  text-white uppercase tracking-wider"
                                            >
                                                Tác giả
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-2 py-3 text-center text-xs font-bold max-w-[25%] text-white uppercase tracking-wider"
                                            >
                                                Danh mục
                                            </th>

                                            <th scope="col" className="relative px-6 py-3 font-bold text-white" >
                                                <span className="sr-only font-bold text-white">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentStories.length > 0 && currentStories.map((story, index) => (
                                            <tr key={story.id}>
                                                <td className=' py-4 whitespace-nowrap bg-green-400'>
                                                    <div className='flex items-center text-black justify-center'>
                                                        {indexOfFirstStory + index + 1}
                                                    </div>
                                                </td>
                                                <td className="px-2 py-4 max-w-[250px]">
                                                    <div className="flex items-center">
                                                        <div className="ml-4 cursor-pointer">
                                                            {/* <Link to={`/story-page/id=${story.id}`}>
                                                                
                                                            </Link> */}
                                                            <div className="text-sm font-medium text-gray-900  hover:text-blue-600 line-clamp-1" title={story.title} onClick={() => handleShowChapters(story)}>{story.title}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{story.author}</div>
                                                </td>
                                                <td className="px-2 py-4 max-w-[200px] bg-red-300">
                                                    <div className="text-sm text-gray-900 line-clamp-1" title={story.categories.map(cat => cat.name).join(", ")}>{story.categories.map(cat => cat.name).join(", ")}</div>
                                                </td>

                                                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEditStory(story)}>
                                                        Chỉnh sửa
                                                    </button>
                                                    {console.log("T: --- " + story)
                                                    }
                                                    <DeleteStory story={story} onStoryDeleted={onStoryDeleted}></DeleteStory>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phân trang */}
                <div className="mt-4">
                    <ul className="flex justify-center">
                        {Array.from({ length: Math.ceil(stories.length / storiesPerPage) }, (_, i) => (
                            <li key={i + 1} className="mx-1">
                                <button
                                    onClick={() => paginate(i + 1)}
                                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default memo(StoryList);