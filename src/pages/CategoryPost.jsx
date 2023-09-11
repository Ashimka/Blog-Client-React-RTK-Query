import { useParams } from "react-router-dom";
import { useState } from "react";

import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";
import Pagination from "../components/pagination/Pagination";

import { useGetCategoryPostsQuery } from "../features/posts/postsApiSlice";

const CategoryPost = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { cat } = useParams();

  const data = {
    page: currentPage,
    cat,
  };

  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoryPostsQuery(data);
  const postItems = postsList?.posts;

  return (
    <>
      <div className="wrapper">
        <Nav />

        <div className="main__inner">
          {isLoading && <p>"Загрузка..."</p>}

          {isError && <p>{error?.data?.message}</p>}

          <div className="main__posts">
            {isSuccess &&
              postItems &&
              postItems?.map((post) => (
                <Post
                  key={post.id}
                  postId={post.id}
                  avatarURL={post.user?.avatarURL}
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

            {postItems?.length === 0 && (
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

export default CategoryPost;
