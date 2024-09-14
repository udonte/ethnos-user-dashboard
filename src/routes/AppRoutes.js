import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Users from "../Features/users/users";
import Posts from "../Features/posts/Posts";
import Todos from "../Features/todos/Todos";
import Albums from "../Features/albums/Albums";
import Settings from "../Features/settings/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="todos" element={<Todos />} />
        <Route path="albums" element={<Albums />} />
        <Route path="Settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
