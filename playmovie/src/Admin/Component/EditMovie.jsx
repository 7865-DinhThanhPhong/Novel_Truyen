import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { Editor } from '@tinymce/tinymce-react';
import he from 'he';
import DOMPurify from 'dompurify';

function EditStory({ story, onContentChange }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm();

    const [categories, setCategories] = useState([]);
    const [coverImagePreview, setCoverImagePreview] = useState(story.coverImageUrl ?? null);
    const [coverImageSource, setCoverImageSource] = useState("url"); // "url" hoặc "file"
    const editorRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error("Lỗi: ", error);
            }
        };
        fetchCategories();

        // Set giá trị mặc định cho các trường (bao gồm cả TinyMCE Editor)
        setValue("title", story.title);
        setValue("author", story.author);
        setValue("categories", story.categories.map(cat => cat.id.toString()));
        setValue("coverImageUrl", story.coverImageUrl);

        if (editorRef.current) {
            editorRef.current.setContent(story.descriptionShow || ""); // descriptionShow cho editor
        }

    }, [story]);


    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImagePreview(URL.createObjectURL(file));
        } else {
            setCoverImagePreview(null);
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            if (coverImageSource === "file" && data.coverImageFile[0]) {
                formData.append('coverImageFile', data.coverImageFile[0]);
            }

            const editorContent = editorRef.current.getContent();
            const cleanText = DOMPurify.sanitize(editorContent, { ALLOWED_TAGS: [] });
            const decodedText = he.decode(cleanText);

            const storyData = {
                title: data.title,
                descriptionShow: editorContent,
                description: decodedText, // description gốc
                author: data.author,
                categories: data.categories.map(categoryId => ({ id: parseInt(categoryId) })),
                coverImageUrl: coverImageSource === "url" ? data.coverImageUrl : null,
            };

            formData.append('storyData', JSON.stringify(storyData));
            const response = await axios.put(
                `http://localhost:8082/stories/${story.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Cập nhật truyện thành công:", response.data);
            // window.location.reload(); // Có thể reload lại trang nếu cần

            onContentChange('movie-list'); // Chuyển hướng về danh sách truyện
            // reset(); // Có thể không cần reset form
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessages = error.response.data;
                console.error("Lỗi validate từ backend:", errorMessages);
            } else {
                console.error("Lỗi khi cập nhật truyện:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Chỉnh sửa truyện</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {/* Tiêu đề */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Tiêu đề <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("title", {
                            required: "Vui lòng nhập tiêu đề",
                            maxLength: 255,
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Nhập tiêu đề truyện"
                    />
                    <ErrorMessage message={errors.title?.message} />
                </div>

                {/* Mô tả */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Mô tả
                    </label>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={story.descriptionShow}
                        apiKey='a867jls6ocsfakgfqn9djd6mh2pda0egoacn0f83b1im3xcc'
                        init={{
                            plugins: [
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                'importword', 'exportword', 'exportpdf'
                            ],
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        }}
                    />
                </div>

                {/* Tác giả */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="author"
                    >
                        Tác giả
                    </label>
                    <input
                        {...register("author", { maxLength: 255 })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="author"
                        type="text"
                        placeholder="Nhập tên tác giả"
                    />
                </div>

                {/* Đường dẫn ảnh bìa */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Đường dẫn ảnh bìa
                    </label>

                    {/* Chọn nguồn ảnh bìa */}
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            id="coverImageUrlRadio"
                            value="url"
                            checked={coverImageSource === "url"}
                            onChange={(e) => setCoverImageSource(e.target.value)}
                        />
                        <label htmlFor="coverImageUrlRadio" className="ml-2 text-black">
                            URL
                        </label>

                        <input
                            type="radio"
                            id="coverImageFileRadio"
                            value="file"
                            checked={coverImageSource === "file"}
                            onChange={(e) => setCoverImageSource(e.target.value)}
                            className="ml-4"
                        />
                        <label htmlFor="coverImageFileRadio" className="ml-2 text-black">
                            Upload file
                        </label>
                    </div>

                    {/* Nhập URL hoặc upload file */}
                    {coverImageSource === "url" ? (
                        <input
                            {...register("coverImageUrl")}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="coverImageUrl"
                            type="text"
                            placeholder="Nhập đường dẫn ảnh bìa"
                            onBlur={(e) => setCoverImagePreview(e.target.value)}
                        />
                    ) : (
                        <input
                            type="file"
                            {...register("coverImageFile")}
                            onChange={handleCoverImageChange}
                        />
                    )}
                    {coverImagePreview && (
                        <img
                            src={coverImagePreview}
                            alt="Preview"
                            className="mt-2 w-32 h-48 object-cover"
                        />
                    )}
                </div>

                {/* Danh mục (checkbox) */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Danh Mục <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category) => {
                            const isChecked = story.categories.some(cat => cat.id == category.id);
                            console.log(category.name + " " + isChecked);

                            return (
                                <div key={category.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        value={category.id}
                                        {...register("categories", {
                                            required: "Vui lòng chọn ít nhất một danh mục",
                                        })}
                                        defaultChecked={false} // Giữ defaultChecked để thiết lập trạng thái ban đầu
                                        className="mr-2"
                                    />
                                    <label htmlFor={`category-${category.id}`}>
                                        {category.name}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                    <ErrorMessage message={errors.categories?.message} />
                </div>

                {/* Nút submit */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditStory;