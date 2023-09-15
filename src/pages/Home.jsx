import { useState } from "react";

import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";
import Pagination from "../components/pagination/Pagination";

import { useGetPostsQuery } from "../features/posts/postsApiSlice";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery(currentPage);
  const postItems = postsList?.posts;

  return (
    <>
      <div className="wrapper">
        <Nav />
        <div className="main__inner">
          {isLoading && <p>"Загрузка..."</p>}

          {isError && (
            <div>
              <p className="errmsg">Произошла ошибка, посты не загружены</p>
              <p>{error?.data?.message}</p>
            </div>
          )}

          <div className="main__posts">
            {isSuccess &&
              postItems.map((post) => (
                <Post
                  key={post.id}
                  postId={post.id}
                  avatarURL={post.user.avatarURL}
                  login={post.user.login}
                  date={post.date}
                  title={post.title}
                  imageURL={post.imageURL}
                  text={post.text}
                  viewsCount={post.viewsCount}
                  comments={post.comments}
                  cat={post.cat_post}
                />
              ))}

            {isSuccess && postItems.length === 0 && (
              <div className="post">Постов не найдено</div>
            )}
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
      </div>
    </>
  );
};

export default Home;
