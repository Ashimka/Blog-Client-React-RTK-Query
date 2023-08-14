import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEye,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

// import { useGetPostsQuery } from "../../features/posts/postsApiSlice";

import "./post.css";

const Post = ({
  postId,
  avatarURL,
  fullName,
  date,
  title,
  imageURL,
  text,
  viewsCount,
  comments,
  categorie,
}) => {
  // const {
  //   data: postsList,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetPostsQuery();

  // let content;

  // if (isLoading) content = <p>"Загрузка..."</p>;
  // if (isError) content = <p>{error?.data?.message}</p>;

  // if (isSuccess) {
  // const { posts } = postsList;
  return (
    <>
      <section className="main__post">
        <div className="post">
          <div className="post__header">
            <div className="header-avatar">
              {avatarURL ? (
                <img
                  className="avatar-image"
                  src={`${process.env.REACT_APP_BASE_URL}/uploads${avatarURL}`}
                  alt={"avatar"}
                />
              ) : (
                <FontAwesomeIcon className="avatar-image" icon={faCircleUser} />
              )}
            </div>
            <div className="header-name">{fullName}</div>
            <div className="header-time">{date}</div>
          </div>
          <div className="post__title">
            <Link to={`/post/${postId}`}>
              <h2 className="post__title-h2">{title}</h2>
            </Link>
          </div>
          <div className="post__img">
            {imageURL && (
              <img
                className="post-image"
                src={`${process.env.REACT_APP_BASE_URL}/uploads${imageURL}`}
                alt={imageURL}
              />
            )}
          </div>

          <div className="post__text">
            <ReactMarkdown children={text} />
          </div>

          <div className="post__footer">
            <div className="post__views">
              <FontAwesomeIcon className="views-image" icon={faEye} />
              <span>{viewsCount}</span>
            </div>
            <div className="post__comment-count">
              <FontAwesomeIcon className="image-comment-btn" icon={faMessage} />
              <span>{comments?.length}</span>
            </div>
            <div className="post__tags">
              <span>{categorie?.tags}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  // }
  // return content;
};

export default Post;
