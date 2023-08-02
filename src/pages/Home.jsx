import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useGetPostsQuery } from "../features/posts/postsApiSlice";

import "./styles/home.css";

const Home = () => {
  const avatarDefault = "/profile.png";
  const views = "/show.png";
  const comment = "/comment.png";

  const {
    data: postsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  let content;

  if (isLoading) content = <p>"Загрузка..."</p>;
  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { posts } = postsList;
    content = (
      <>
        <section className="posts">
          {posts.map((post, id) => {
            return (
              <div key={id} className="post">
                <div className="post__header">
                  <div className="header-avatar">
                    <img
                      className="avatar-image"
                      src={`${process.env.REACT_APP_BASE_URL}/uploads${
                        post.user.avatarURL || avatarDefault
                      }`}
                      alt={"avatar"}
                    />
                  </div>
                  <div className="header-name">{post.user.fullName}</div>
                  <div className="header-time">{post.date}</div>
                </div>
                <div className="post__title">
                  <Link to={`/post/${post.id}`}>
                    <h2 className="post__title-h2">{post.title}</h2>
                  </Link>
                </div>
                <div className="post__img">
                  {post.imageURL && (
                    <img
                      className="post-image"
                      src={`${process.env.REACT_APP_BASE_URL}/uploads${post.imageURL}`}
                      alt={post.title}
                    />
                  )}
                </div>

                <div className="post__text">
                  <ReactMarkdown children={post.text} />
                </div>

                <div className="post__footer">
                  <div className="post__views">
                    <img
                      className="views-image"
                      src={`${process.env.REACT_APP_BASE_URL}/uploads${views}`}
                      alt="views"
                    />
                    <span>{post.viewsCount}</span>
                  </div>
                  <div className="post__comment-count">
                    <img
                      className="image-comment-btn"
                      src={`${process.env.REACT_APP_BASE_URL}/uploads${comment}`}
                      alt="comment"
                    />
                    <span>{post?.comments.length}</span>
                  </div>
                  <div className="post__tags">
                    {post.tag_post?.tags.split(",").map((tag, index) => {
                      return <span key={index}>{tag}</span>;
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </>
    );
  }
  return content;
};

export default Home;
