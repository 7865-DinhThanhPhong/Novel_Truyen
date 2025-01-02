import { useState, useEffect } from "react";
import Comment from "./Comment";

function CommentList({ movieId }) {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    const [newCommentContent, setNewCommentContent] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchComments = async () => {
            const response = await fetch(`http://localhost:8081/api/comments/${movieId}`);
            const data = await response.json();
            console.log("Comment: " + data);
            setComments(data);
        };
        setUser(JSON.parse(sessionStorage.getItem('user')));
        fetchComments();
    }, [movieId]);

    const handleNewCommentChange = (e) => {
        setNewCommentContent(e.target.value);
    };

    const handleCreateComment = async () => {
        const newComment = {
            content: newCommentContent,
            movieId: movieId,
            userId: user.userId, // Thay thế bằng ID người dùng thực tế
        };

        try {
            const response = await fetch('http://localhost:8081/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (response.ok) {
                const data = await response.json();
                setComments([data, ...comments]);
                setNewCommentContent('');
            } else {
                console.error('Lỗi khi tạo bình luận');
            }
        } catch (error) {
            console.error('Lỗi khi tạo bình luận:', error);
        }
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.length > 0 ? comments.slice(
        indexOfFirstComment,
        indexOfLastComment,
    ) : comments;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = async (commentId, newContent) => {


        try {
            const response = await fetch(`http://localhost:8081/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newContent,
            });

            if (response.ok) {
                const data = await response.json();


                setComments(comments.map(comment =>
                    comment.commentId === commentId ? data : comment
                ));
            } else {
                console.error('Lỗi khi cập nhật bình luận');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật bình luận:', error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/comments/${commentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setComments(comments.filter((comment) => comment.commentId !== commentId));
            } else {
                console.error('Lỗi khi xóa bình luận');
            }
        } catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
        }
    };

    const handleReply = async (parentId, content) => {
        const newComment = {
            content: content,
            movieId: movieId,
            userId: user.userId, // Thay thế bằng ID người dùng thực tế
            parentId: parentId
        };

        try {
            const response = await fetch('http://localhost:8081/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });

            if (response.ok) {
                const data = await response.json();
                // Tìm comment cha và thêm comment mới vào children
                setComments(comments.map(comment => {
                    if (comment.commentId === parentId) {
                        const updatedChildren = comment.children ? [...comment.children, data] : [data];
                        return {
                            ...comment,
                            children: updatedChildren
                        };
                    }
                    return comment;
                }));

                setReplyContent('');
            } else {
                console.error('Lỗi khi tạo bình luận');
            }
        } catch (error) {
            console.error('Lỗi khi tạo bình luận:', error);
        }
    };

    return (
        <div className="mt-4 bg-white px-2 ">
            <h3 className="text-lg font-medium">Bình luận</h3>
            {user && (


                <div>
                    <div className="flex gap-2">
                        <img src={`${user.avatar != "" ? user.avatar : "/avatar.jpg"}`} alt="" className=" bg-black w-[4rem] rounded-full" />
                        <textarea
                            value={newCommentContent}
                            onChange={handleNewCommentChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Viết bình luận..."
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handleCreateComment}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ml-auto"
                        >
                            Đăng bình luận
                        </button>
                    </div>

                </div>

            )}

            {currentComments.length > 0 && (
                <div>
                    <ul className="mt-4">
                        {currentComments.map((comment) => (
                            <Comment
                                key={comment.commentId}
                                comment={comment}
                                onReply={handleReply}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                user={user}
                                allComments={comments}
                                currentUser={user}
                            />
                        ))}
                    </ul>
                    <div className="mt-4 text-center mx-auto w-full bg-red-200">
                        {Array(Math.ceil(comments.length / commentsPerPage))
                            .fill()
                            .map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`mr-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                    </div>
                </div>
            )

            }

        </div>
    );
}

export default CommentList;