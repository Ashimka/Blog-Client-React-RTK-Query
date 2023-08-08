import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEye,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import { useGetPostsQuery } from "../../features/posts/postsApiSlice";

import "./post.css";

const Post = () => {
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
        <section className="main__posts">
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

export default Post;
