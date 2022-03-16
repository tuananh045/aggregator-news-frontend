import AdminCategory from 'pages/admin/Category';
import Login from 'pages/admin/Login';
import Category from 'pages/client/Category';
import Home from 'pages/client/Home';
import Post from 'pages/client/Post';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from 'utils/Auth';
import Dashboard from 'pages/admin/Dashboard';
import Posts from 'pages/admin/Posts';
import News from 'pages/admin/News';
import PostForm from 'pages/admin/PostForm';
import NewsForm from 'pages/admin/NewsForm';
import Tags from 'pages/admin/Tags';
import Author from 'pages/admin/Author';
import Tag from 'pages/client/Tag';

function Routers(props) {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/:category" element={<Category />} />
            <Route path="/bai-viet/:slug" element={<Post />} />
            <Route path="/tag/:tag" element={<Tag />} />
            <Route path="/login" element={<Login />} />
            <Route path='/admin/' element={<RequireAuth />}>
            {/* <Route path='/admin/'> */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="" element={<Dashboard />} />
                <Route path="posts" element={<Posts />} />
                <Route path="tags" element={<Tags />} />
                <Route path="authors" element={<Author />} />
                <Route path="categories" element={<AdminCategory />} />
                <Route path="news" element={<News />} />
                <Route path="post/add" exact element={<PostForm />} />
                <Route path="post/update/:id" exact element={<PostForm />} />
                <Route path="news/add" element={<NewsForm />} />
            </Route>
        </Routes>
    );
}

export default Routers;