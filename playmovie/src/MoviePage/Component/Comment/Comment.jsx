import React, { useState } from 'react';

function Comment({ comment, allComments, level = 0, onReply, onEdit, onDelete, currentUser }) {
    const [showReplies, setShowReplies] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [replyContent, setReplyContent] = useState('');
    const [showReplyForm, setShowReplyForm] = useState({});
    const [showMenu, setShowMenu] = useState({});
    const replyTo = comment.parentId == null ? null : allComments.filter(cm => cm.movieId == comment.parentId);

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const handleShowMenu = (commentId) => {
        setShowMenu(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId]
        }));
    };

    const handleEdit = (comment) => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(comment.content);
    };

    const handleSaveEdit = (comment) => {
        onEdit(comment.commentId, editedContent);
        setIsEditing(false);
    };

    const handleDelete = (commentId) => {
        onDelete(commentId);
    };

    const handleShowReplyForm = (commentId) => {
        setShowReplyForm(prevState => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const handleReply = (parentCommentId) => {
        onReply(parentCommentId, replyContent);
        setReplyContent('');
        setShowReplyForm(prevState => ({ ...prevState, [parentCommentId]: false }));
    };


    const renderReply = (reply, level) => {
        return (
            <div key={reply.commentId} className={`ml-${level * 4} py-2 border-b border-gray-200 flex gap-3 `}>
                <div className='bg-green-300'>
                    <img src={reply.user.avatar == null || reply.user.avatar == "" ? "/avatar.jpg" : reply.user.avatar} alt="" className='w-[3rem] rounded-full' />
                </div>
                <div className='w-full'>
                    <div className='flex gap-3 items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <div className="font-medium">
                                {reply.user.username}{' '}
                                {replyTo && (
                                    <span className="text-gray-500"> trả lời <span className='text-blue-500'>{replyTo.username}</span> :</span>
                                )}
                            </div>
                            <div className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</div>
                        </div>

                        <div className="flex-none relative">
                            {currentUser && currentUser.userId === reply.user.userId && (
                                <button onClick={() => handleShowMenu(reply.commentId)} className="text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            )}
                            {showMenu[reply.commentId] && (
                                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded shadow w-32 z-10">
                                    <ul>
                                        <li onClick={() => handleEdit(reply)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            Sửa
                                        </li>
                                        <li onClick={() => handleDelete(reply.commentId)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                                            Xóa
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {isEditing && comment.commentId === reply.commentId ? (
                        <div>
                            <textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <div className="mt-2">
                                <button
                                    onClick={() => handleSaveEdit(reply)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Lưu
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>{reply.content}</div>
                    )}

                    <button
                        onClick={() => handleShowReplyForm(reply.commentId)}
                        className="text-blue-500 mt-2"
                    >
                        Trả lời
                    </button>
                    {showReplyForm[reply.commentId] && (
                        <div className="ml-4 mt-2">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder="Viết trả lời..."
                            />
                            <button
                                onClick={() => handleReply(reply.commentId)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            >
                                Gửi trả lời
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderChildren = (comment, level) => {
        const replies = allComments.filter(reply => reply.parentId === comment.commentId);

        return (
            <div key={comment.commentId}>
                {replies.map(reply => (
                    <div key={reply.commentId}>
                        {renderReply(reply, level)}
                        {renderChildren(reply, level + 1)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`ml-${level * 4} py-2 border-b border-gray-200 flex pr-1`}>
            {comment.parentId == null && (
                <div>
                    <img src={comment.user.avatar == null || comment.user.avatar == "" ? "/avatar.jpg" : comment.user.avatar} alt="" className='w-[4rem] rounded-full' />
                </div>
            )
            }
            < div className='w-full '>
                {comment.parentId == null && (
                    <div>
                        <div className="flex items-center justify-between ">
                            <div className='flex gap-3 items-center'>
                                <div className="font-medium flex-grow text-base">{comment.user.username}</div>
                                <div className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</div>
                            </div>

                            <div className="flex-none relative">
                                {currentUser && currentUser.userId === comment.user.userId && (
                                    <button onClick={() => handleShowMenu(comment.commentId)} className="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                )}
                                {showMenu[comment.commentId] && (
                                    <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded shadow w-32 z-10">
                                        <ul>
                                            <li onClick={() => handleEdit(comment)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                Sửa
                                            </li>
                                            <li onClick={() => handleDelete(comment.commentId)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                                                Xóa
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        {isEditing ? (
                            <div>
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleSaveEdit(comment)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>{comment.content}</div>
                        )}
                        <button
                            onClick={() => handleShowReplyForm(comment.commentId)}
                            className="text-blue-500 mt-2"
                        >
                            Trả lời
                        </button>
                        {showReplyForm[comment.commentId] && (
                            <div className=" mt-2">
                                <div className='flex '>
                                    <img src="/avatar.jpg" alt="" className='w-[4rem] rounded-full' />
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2"
                                        placeholder="Viết trả lời..."
                                    />
                                </div>

                                <button
                                    onClick={() => handleReply(comment.commentId)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                                >
                                    Gửi trả lời
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {comment.parentId == null && renderChildren(comment, 1)}
            </div>
        </div >
    );
}

export default Comment;