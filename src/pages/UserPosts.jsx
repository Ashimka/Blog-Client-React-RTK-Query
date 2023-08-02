import { Link } from "react-router-dom";

import { useGetUserPostsQuery } from "../features/users/usersApiSlice";

const UserPosts = () => {
  const avatarDefault = "/profile.png";
  const views = "/show.png";
  const comment = "/comment.png";

  const {
    data: posts,
    isLoading,
    isSuccess,
    currentData,
  } = useGetUserPostsQuery();

  let content;

  if (isLoading) content = <p>"Загрузка..."</p>;

  if (isSuccess && !currentData?.message) {
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
                  <div className="header-options">
                    <Link to={`/post/${post.id}/edit`}>
                      <img
                        className="header-options-image"
                        src={`${process.env.REACT_APP_BASE_URL}/uploads/edit.png`}
                        alt={"options"}
                      />
                    </Link>
                  </div>
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

                <div className="post__text">{post.text}</div>

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

  if (currentData?.message) {
    content = (
      <div className="container">
        <div className="post">У вас нет постов</div>
      </div>
    );
  }

  return content;
};

export default UserPosts;
