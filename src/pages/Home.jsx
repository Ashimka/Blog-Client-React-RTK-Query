import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";

import { useGetPostsQuery } from "../features/posts/postsApiSlice";

const Home = () => {
  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const postItems = postsList?.posts;

  return (
    <>
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
            postItems &&
            postItems.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                avatarURL={post.user.avatarURL}
                fullName={post.user.fullName}
                date={post.date}
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
    </>
  );
};

export default Home;
