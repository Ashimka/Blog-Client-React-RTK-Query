import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import { useCreateCommentMutation } from "../features/posts/postsApiSlice";

import "./styles/createComment.css";

const CreateComment = () => {
  const idPost = useParams();
  const [comment, setComment] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();

  const [createComment, { isLoading, isSuccess }] = useCreateCommentMutation();

  let content;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComment({ text: comment, id: idPost.id }).unwrap();
      setComment("");
    } catch (error) {
      setErrMsg(error.data.message);
    }
  };

  const handleCommentInput = (e) => setComment(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      {isSuccess ? (
        <>
          <p>Комментарий добавлен</p>
          <Link to={`/post/${idPost.id}`}>Вернуться к посту</Link>
        </>
      ) : (
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
                placeholder="Напишите комментарий"
              />
            </label>
            <button className="comment-btn-form">Добавить</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default CreateComment;
