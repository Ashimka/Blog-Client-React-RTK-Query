import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import UsersList from "./components/UsersList";
import UserAvatar from "./components/UserAvatar";
import Home from "./pages/Home";
import FullPost from "./pages/FullPost";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import UserPosts from "./pages/UserPosts";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import CreateTags from "./pages/CreateTags";
import CreateComment from "./pages/CreateComment";

const ROLES = {
  "admin": 777,
  "user": 333,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<FullPost />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected route for the user */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/user/me" element={<UserPage />} />
          <Route path="/user/posts" element={<UserPosts />} />
          <Route path="/user/profile" element={<UserAvatar />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/post/:id/edit" element={<UpdatePost />} />
          <Route path="/post/:id/comments" element={<CreateComment />} />
        </Route>
        {/* protected route for admin */}
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path="/user/all" element={<UsersList />} />
          <Route path="/post/tags" element={<CreateTags />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
