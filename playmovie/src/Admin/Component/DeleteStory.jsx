import React, { useState } from "react";
import { Modal } from 'flowbite-react'; // Import từ flowbite-react
import axios from 'axios';

const DeleteStory = ({ story, onMovieDeleted }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteMovie = () => setShowModal(true);

    const confirmDeleteMovie = async () => {
        try {
            await axios.delete(`http://localhost:8082/stories/${story.id}`);
            setShowModal(false);
            onMovieDeleted(story.id);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div >
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={handleDeleteMovie}
            >
                Xóa phim
            </button>

            <Modal show={showModal} onClose={() => setShowModal(false)} id="popup-modal" className="w-1/3  bg-white mx-auto"> {/* Sửa id thành popup-modal */}
                <div className="relative p-4 w-full max-w-md max-h-full bg-white mx-auto text-red-400">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setShowModal(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" color="red">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div className="">
                                <div className="flex gap-5  text-black justify-center mb-4 text-lg  bg-white">
                                    <img src={story.coverImageUrl} alt="" className="w-10" />
                                    <p>{story.title}</p>
                                </div>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Bạn có chắc chắn muốn xóa phim này?
                                </h3>
                            </div>

                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                onClick={confirmDeleteMovie}
                            >
                                Xóa
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteStory;