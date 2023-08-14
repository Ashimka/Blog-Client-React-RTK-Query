import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";

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
                avatarURL={post.avatarURL}
                fullName={post.fullName}
                date={post.date}
                title={post.title}
                imageURL={post.imageURL}
                text={post.text}
                viewsCount={post.viewsCount}
                comments={post.comments}
                categorie={post.tag_post}
              />
            ))}
        </div>

        <Sidebar />
      </div>
    </>
  );
};

export default Home;
