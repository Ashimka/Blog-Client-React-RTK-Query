import { useSearchParams } from "react-router-dom";
import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";

import { useGetCategoryPostsQuery } from "../features/posts/postsApiSlice";

const CategoryPost = () => {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("category");

  const {
    data: postItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoryPostsQuery(cat);

  return (
    <>
      <Nav />
      <div className="main__inner">
        {isLoading && <p>"Загрузка..."</p>}

        {isError && <p>{error?.data?.message}</p>}

        <div className="main__posts">
          {isSuccess &&
            postItems &&
            postItems.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                avatarURL={post.user?.avatarURL}
                fullName={post.user.login}
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
    </>
  );
};

export default CategoryPost;
