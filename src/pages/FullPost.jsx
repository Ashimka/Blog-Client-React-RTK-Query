import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faEye,
  faTrashCan,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

import {
  useGetFullPostQuery,
  useRemovePostMutation,
  useRemoveCommentMutation,
} from "../features/posts/postsApiSlice";
import { useGetOneUserQuery } from "../features/users/usersApiSlice";

import "./styles/home.css";

const FullPost = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, isSuccess } = useGetFullPostQuery(params.id);
  const { data: user } = useGetOneUserQuery();
  const [removePost] = useRemovePostMutation();
  const [removeComment] = useRemoveCommentMutation();

  const handleRemovePost = async (id) => {
    if (window.confirm("Удалить пост?")) {
      await removePost(id);
      navigate("/user/me");
    }
  };

  const handleRemoveComment = async (id) => {
    if (window.confirm("Удалить комментарий?")) {
      await removeComment(id);
    }
  };

  let content;

  if (isLoading) content = <p>"Загрузка..."</p>;

  if (isSuccess) {
    content = (
      <>
        <section className="posts">
          <div className="post">
            <div className="post__header">
              <div className="header-avatar">
                {post?.post.user.avatarURL ? (
                  <img
                    className="avatar-image"
                    src={`${process.env.REACT_APP_BASE_URL}/uploads${post.post.user.avatarURL}`}
                    alt={"avatar"}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="avatar-image"
                    icon={faCircleUser}
                  />
                )}
              </div>
              <div className="header-name">{post.post.user.fullName}</div>
              <div className="header-time">{post.post.date}</div>
              {user?.role.admin && (
                <button
                  onClick={() => handleRemovePost(post.post.id)}
                  className="header-delete-post"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}
            </div>
            <div className="post__title">
              <h2 className="post__title-h2">{post.post.title}</h2>
            </div>
            <div className="post__img">
              {post.post.imageURL && (
                <img
                  className="post-image"
                  src={`${process.env.REACT_APP_BASE_URL}/uploads${post.post.imageURL}`}
                  alt={post.title}
                />
              )}
            </div>

            <div className="post__text">
              <ReactMarkdown children={post.post.text} />
            </div>

            <div className="post__footer">
              <div className="post__views">
                <FontAwesomeIcon className="views-image" icon={faEye} />
                <span>{post.post.viewsCount}</span>
              </div>
              <div className="post__tags">
                {post.post.tag_post?.tags.split(",").map((tag, index) => {
                  return <span key={index}>{tag}</span>;
                })}
              </div>
            </div>
            <div className="post__comment">
              <div>Комментарии:</div>
              {post.post.comments?.map((comm, index) => {
                return (
                  <div className="comment-item" key={index}>
                    <div className="comment-avatar">
                      {post?.post.user.avatarURL ? (
                        <img
                          className="avatar-image"
                          src={`${process.env.REACT_APP_BASE_URL}/uploads${post.post.user.avatarURL}`}
                          alt={"avatar"}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="avatar-image"
                          icon={faCircleUser}
                        />
                      )}
                      <div className="header-name">{comm.user.fullName}</div>
                      <div className="header-time">{comm.date}</div>
                      {user?.role.admin && (
                        <div
                          onClick={() => handleRemoveComment(comm.id)}
                          className="delete-comment"
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </div>
                      )}
                    </div>
                    <div className="comments-text">{comm.text}</div>
                  </div>
                );
              })}
            </div>
            <button
              className="comment-btn"
              onClick={() => navigate(`/post/${params.id}/comments`)}
            >
              Написать комментарий
            </button>
          </div>
        </section>
      </>
    );
  }

  return content;
};

export default FullPost;
