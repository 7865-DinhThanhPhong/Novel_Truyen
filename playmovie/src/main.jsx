import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import Home from './Home/Home.jsx'
import Search from './Search/Search.jsx'
import MoviePage from "./MoviePage/MoviePage.jsx"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './Admin/Admin.jsx'
import { initFlowbite } from 'flowbite';
import UserMenu from './UserMenu/UserMenu.jsx'


initFlowbite();

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>

      <React.Fragment >
        <Route path="/" element={<Home />} />
        <Route path="/movie-page/:id" element={<MoviePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user-menu" element={<UserMenu />} />
      </React.Fragment>
      <React.Fragment >
        <Route path="/admin" element={<Admin />} />
      </React.Fragment>

      {/* Thêm các route khác ở đây */}
    </Routes>
  </BrowserRouter>

)
