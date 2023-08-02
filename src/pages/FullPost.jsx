import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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

  const avatarDefault = "profile.png";
  const views = "show.png";
  const comment = "comment.png";

  const handleRemovePost = async (id) => {
    window.confirm("Удалить пост?");
    await removePost(id);
    navigate("/user/me");
  };

  const handleRemoveComment = async (id) => {
    window.confirm("Удалить комментарий?");
    await removeComment(id);
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
                <img
                  className="avatar-image"
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${
                    post.post.user.avatarURL || avatarDefault
                  }`}
                  alt="avatar"
                />
              </div>
              <div className="header-name">{post.post.user.fullName}</div>
              <div className="header-time">{post.post.date}</div>
              {user?.role.admin && (
                <button
                  onClick={() => handleRemovePost(post.post.id)}
                  className="header-delete-post"
                >
                  delete
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
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${post.post.imageURL}`}
                  alt={post.title}
                />
              )}
            </div>

            <div className="post__text">
              <ReactMarkdown children={post.post.text} />
            </div>

            <div className="post__footer">
              <div className="post__views">
                <img
                  className="views-image"
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${views}`}
                  alt="views"
                />
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
                      <img
                        className="avatar-image"
                        src={`${process.env.REACT_APP_BASE_URL}/uploads/${
                          comm.user.avatarURL || avatarDefault
                        }`}
                        alt="avatar"
                      />
                      <div className="header-name">{comm.user.fullName}</div>
                      <div className="header-time">{comm.date}</div>
                      {user?.role.admin && (
                        <div
                          onClick={() => handleRemoveComment(comm.id)}
                          className="delete-comment"
                        >
                          x
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
              <img
                className="image-comment-btn"
                src={`${process.env.REACT_APP_BASE_URL}/uploads/${comment}`}
                alt="comment"
              />
            </button>
          </div>
        </section>
      </>
    );
  }

  return content;
};

export default FullPost;
