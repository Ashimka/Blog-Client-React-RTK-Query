import { useState, useRef } from "react";

import { useCreateCommentMutation } from "../features/posts/postsApiSlice";

import "./styles/createComment.css";

const CreateComment = ({ id, user }) => {
  const [comment, setComment] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();

  const [createComment, { isLoading }] = useCreateCommentMutation();

  let content;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!comment) {
        return setErrMsg("Пустой комментарий");
      }
      await createComment({ text: comment, id }).unwrap();
      setComment("");
    } catch (error) {
      console.log(error.originalStatus);
      if (error.originalStatus === 500) {
        setErrMsg("Зарегистрируйтесьб чтобы оставить комментарий");
        setComment("");
      }
    }
  };

  const handleCommentInput = (e) => setComment(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      <>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form className="create-comment" onSubmit={handleSubmit}>
          <label htmlFor="comment">
            <textarea
              className="comment-text"
              type="text"
              id="comment"
              value={comment}
              onChange={handleCommentInput}
              placeholder="Добавить комментарий"
            />
          </label>
          <button disabled={!user?.isActivated} className="comment-btn-form">
            Опубликовать
          </button>
        </form>
      </>
    </>
  );

  return content;
};

export default CreateComment;
