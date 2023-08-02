import { useState, useRef } from "react";

import { useCreateTagsMutation } from "../features/posts/postsApiSlice";

import "./styles/createTags.css";

const CreateTags = () => {
  const [tag, setTag] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();

  const [createTag, { isLoading, isSuccess }] = useCreateTagsMutation();

  let content;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!tag) {
        return setErrMsg("Введите название тега");
      }

      await createTag({ tag }).unwrap();
      setTag("");
    } catch (error) {
      setErrMsg(error.data.message);
    }
  };

  const HandleTagsInput = (e) => setTag(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      {isSuccess ? (
        <p>Тег создан</p>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form className="create-tags" onSubmit={handleSubmit}>
            <label htmlFor="tags">
              <input
                className="input-tags"
                type="text"
                value={tag}
                id="tags"
                placeholder="Название тега"
                onChange={HandleTagsInput}
              />
            </label>
            <button className="btn-form-submit">Создать</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default CreateTags;
