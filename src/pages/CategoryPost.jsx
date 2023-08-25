import { useSearchParams } from "react-router-dom";
import Post from "../components/post/Post";
import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";

import { useGetPostsQuery } from "../features/posts/postsApiSlice";

const CategoryPost = () => {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("category");

  const posts = [];

  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();
  const postItems = postsList?.posts;

  postItems?.forEach((element) => {
    const category = element.cat_post?.cats.split(",").includes(cat);

    if (category) {
      posts.push(element);
    }
  });

  return (
    <>
      <Nav />
      <div className="main__inner">
        {isLoading && <p>"Загрузка..."</p>}

        {isError && <p>{error?.data?.message}</p>}

        <div className="main__posts">
          {isSuccess &&
            postItems &&
            posts?.map((post) => (
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

          {posts?.length === 0 && <div className="post">Постов не найдено</div>}
        </div>

        <Sidebar />
      </div>
    </>
  );
};

export default CategoryPost;
