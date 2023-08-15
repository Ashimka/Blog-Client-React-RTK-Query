import { useState, useRef } from "react";

import { useCreateTagsMutation } from "../features/posts/postsApiSlice";

import "./styles/createTags.css";

const CreateTags = () => {
  const [cat, setCat] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();

  const [createCat, { isLoading, isSuccess }] = useCreateTagsMutation();

  let content;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!cat) {
        return setErrMsg("Введите название тега");
      }

      await createCat({ cat }).unwrap();
      setCat("");
    } catch (error) {
      setErrMsg(error.data.message);
    }
  };

  const HandleTagsInput = (e) => setCat(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      {isSuccess ? (
        <p>Categorie создан</p>
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
                value={cat}
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
