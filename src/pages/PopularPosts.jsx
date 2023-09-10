import { useState } from "react";
import { useResolvedPath } from "react-router-dom";

import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";
import Pagination from "../components/pagination/Pagination";

import { useGetPopularPostsQuery } from "../features/posts/postsApiSlice";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPopularPostsQuery(currentPage);

  const postItems = postsList?.posts;
  const { pathname } = useResolvedPath();

  return (
    <>
      <Nav />
      <div className="main__inner">
        {isLoading && <p>"Загрузка..."</p>}

        {isError && <p>{error?.data?.message}</p>}

        <div className="main__posts">
          {isSuccess &&
            postItems &&
            pathname === "/popular" &&
            postItems
              .slice()
              .sort((a, b) => b.viewsCount - a.viewsCount)
              .map((post) => (
                <Post
                  key={post.id}
                  postId={post.id}
                  avatarURL={post.user.avatarURL}
                  login={post.user.login}
                  createdAt={post.createdAt}
                  title={post.title}
                  imageURL={post.imageURL}
                  text={post.text}
                  viewsCount={post.viewsCount}
                  comments={post.comments}
                  cat={post.cat_post}
                />
              ))}
        </div>

        <Sidebar />
      </div>
      {postsList?.totalPages > 1 && (
        <Pagination
          totalPages={postsList?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Home;
