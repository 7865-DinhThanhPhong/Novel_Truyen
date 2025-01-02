import React, { useState, useEffect } from 'react';
import AdminLayout from './Component/AdminLayout';
import MovieList from "./Component/MovieList";
import CategoryForm from "./Component/CategoryForm";
import AddStory from "./Component/AddStory";
import Category from "./Component/Category";
import EditMovie from './Component/EditMovie';
import AdminLogin from './Component/AdminLogin';
import { AccordionContent } from 'flowbite-react';
import UserList from './Component/User/UserList';
import ChapterList from './Component/ChapterList';
import AddChapter from './Component/AddChapter';
import EditChapter from './Component/EditChapter';

function Admin() {
    const [activeContent, setActiveContent] = useState('movie-list');
    const [data, setData] = useState();
    const [login, setLogin] = useState(false);
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('admin');
        console.log(JSON.parse(storedUser));
        if (storedUser) {
            setAdmin(JSON.parse(storedUser));
            setLogin(true);
        }
    }, [sessionStorage.getItem('admin')]);

    const onLogined = () => {
        setLogin(true);
    }

    const handleContentChange = (content) => {
        setActiveContent(content);

    };
    const handleGetData = (data) => {
        setData(data);
    }
    console.log(activeContent + " --------------------------------------------------");

    return (
        <div className="text-white">
            {login ? (
                <AdminLayout onContentChange={handleContentChange} activeContent={activeContent}>
                    {activeContent === 'movie-list' && <MovieList onContentChange={handleContentChange} onGetData={handleGetData} />}
                    {activeContent === 'movie-edit' && <EditMovie story={data} onContentChange={handleContentChange} />}
                    {activeContent === 'add-movie' && <AddStory />}
                    {activeContent === 'category-form' && <CategoryForm />}
                    {activeContent === 'category' && <Category />}
                    {activeContent === 'user-list' && <UserList />}
                    {activeContent === 'chapter-list' && <ChapterList story={data} onContentChange={handleContentChange} onGetData={handleGetData} />}
                    {activeContent === 'add-chapter' && <AddChapter story={data} onContentChange={handleContentChange} />}
                    {activeContent === 'chapter-edit' && <EditChapter chapter={data} onContentChange={handleContentChange} onGetData={handleGetData} />}

                </AdminLayout>
            ) : (
                <AdminLogin onLogined={onLogined}></AdminLogin>
            )

            }

        </div>
    );
}

export default Admin;