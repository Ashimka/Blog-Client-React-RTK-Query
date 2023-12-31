import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEye,
  faMessage,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

import { useGetUserPostsQuery } from "../features/posts/postsApiSlice";

const UserPosts = () => {
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
                    {post.user.avatarURL ? (
                      <img
                        className="avatar-image"
                        src={`${process.env.REACT_APP_BASE_URL}/uploads${post.user.avatarURL}`}
                        alt={"avatar"}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="avatar-image"
                        icon={faCircleUser}
                      />
                    )}
                  </div>
                  <div className="header-name">{post.user.login}</div>
                  <div className="header-time">{post.date}</div>
                  <div className="header-options">
                    <Link to={`/post/${post.id}/edit`}>
                      <FontAwesomeIcon
                        className="header-options-image"
                        icon={faPenToSquare}
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

                <div className="post__text">
                  <ReactMarkdown children={post.text} />
                </div>

                <div className="post__footer">
                  <div className="post__views">
                    <FontAwesomeIcon className="views-image" icon={faEye} />
                    <span>{post.viewsCount}</span>
                  </div>
                  <div className="post__comment-count">
                    <FontAwesomeIcon
                      className="image-comment-btn"
                      icon={faMessage}
                    />
                    <span>{post?.comments.length}</span>
                  </div>
                  <div className="post__tags">
                    {post.cat_post?.cats.split(",").map((cat, index) => {
                      return <span key={index}>{cat}</span>;
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
