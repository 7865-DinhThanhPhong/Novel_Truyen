import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import { Editor } from "@tinymce/tinymce-react";
import he from "he";
import DOMPurify from "dompurify";

function EditChapter({ chapter: initialChapter, onContentChange, onGetData }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();
    const editorRef = useRef(null);
    const [chapter, setChapter] = useState(initialChapter);
    const [story, setStory] = useState(null);

    useEffect(() => {
        if (initialChapter) {
            // Set giá trị ban đầu cho form từ initialChapter
            setValue("title", initialChapter.title);
            setValue("chapterNumber", initialChapter.chapterNumber);

            // Set giá trị ban đầu cho TinyMCE Editor
            if (editorRef.current) {
                editorRef.current.setContent(initialChapter.content || "");
            }
        }
    }, [initialChapter, setValue]);

    const onSubmit = async (data) => {
        const editorContent = editorRef.current.getContent();
        const cleanText = DOMPurify.sanitize(editorContent, { ALLOWED_TAGS: [] });
        const decodedText = he.decode(cleanText);
        try {
            const chapterData = {
                title: data.title,
                content: editorContent,
                chapterNumber: data.chapterNumber,
            };

            const response = await axios.put(
                `http://localhost:8082/chapters/${initialChapter.id}`,
                chapterData
            );

            console.log("Cập nhật chapter thành công:", response.data);
            onGetData(response.data);
            onContentChange("chapter-list"); // Quay lại trang danh sách chapter


        } catch (error) {
            console.error("Lỗi khi cập nhật chapter:", error);
            // Xử lý lỗi, hiển thị thông báo lỗi
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
                Chỉnh sửa Chapter
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                {/* Số chapter */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="chapterNumber"
                    >
                        Số Chapter <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("chapterNumber", {
                            required: "Vui lòng nhập số chapter",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Số chapter phải lớn hơn 0",
                            },
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="chapterNumber"
                        type="number"
                        placeholder="Nhập số chapter"
                    />
                    <ErrorMessage message={errors.chapterNumber?.message} />
                </div>

                {/* Tiêu đề chapter */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="title"
                    >
                        Tiêu đề Chapter <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("title", {
                            required: "Vui lòng nhập tiêu đề chapter",
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Nhập tiêu đề chapter"
                    />
                    <ErrorMessage message={errors.title?.message} />
                </div>

                {/* Nội dung chapter */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="content"
                    >
                        Nội dung <span className="text-red-500">*</span>
                    </label>
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={initialChapter.content}
                        apiKey="a867jls6ocsfakgfqn9djd6mh2pda0egoacn0f83b1im3xcc"
                        init={{
                            plugins: [
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                'importword', 'exportword', 'exportpdf'
                            ],
                            toolbar:
                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            mergetags_list: [
                                { value: "First.Name", title: "First Name" },
                                { value: "Email", title: "Email" },
                            ],
                            ai_request: (request, respondWith) =>
                                respondWith.string(() =>
                                    Promise.reject("See docs to implement AI Assistant")
                                ),
                        }}
                    />
                    <ErrorMessage message={errors.content?.message} />
                </div>

                {/* Nút submit */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Cập nhật
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => onContentChange("chapter-list")}
                    >
                        Hủy bỏ
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditChapter;