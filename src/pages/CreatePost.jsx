import { useState, useRef, useMemo, useCallback } from "react";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import "./styles/createPost.css";

import {
  useCreateNewPostMutation,
  useUploadImageMutation,
  useGetTagsListQuery,
} from "../features/posts/postsApiSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tagsPost, setTagsPost] = useState([]);
  const [searchTag, setSearchTag] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef(null);

  const errRef = useRef();

  const [createPost, { isLoading, isSuccess }] = useCreateNewPostMutation();
  const [fileUpload] = useUploadImageMutation();
  const { data: tags } = useGetTagsListQuery();

  const filterTags = tags?.filter((tagList) => {
    return tagList.tag.toLowerCase().includes(searchTag.toLowerCase());
  });

  const getTags = (e) => {
    setTagsPost([...tagsPost, e.target.innerText]);
  };

  const removeTags = (e) => {
    setTagsPost(tagsPost.filter((tag) => tag !== e.target.innerText));
  };

  let content;

  const onChange = useCallback((text) => {
    setText(text);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "350px",
      autofocus: false,
      placeholder: "Содержимое поста...",
      status: false,
      autosave: {
        enabled: true,
        uniqueId: "text-blog",
        delay: 1000,
      },
    }),
    []
  );

  const HandleImageInput = async (e) => {
    try {
      const formData = new FormData();

      formData.append("image", e.target.files[0]);

      const file = await fileUpload(formData).unwrap();
      console.log(file);
      setImageURL(file.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !text) {
        return setErrMsg("Не заполнен заголовок или содержимое поста");
      }

      const postData = {
        title,
        text,
        imageURL,
        tags: tagsPost.join(),
      };

      await createPost(postData).unwrap();

      setTitle("");
      setText("");
      setImageURL("");
      setTagsPost("");
    } catch (error) {
      console.log(error);

      if (error.status === 400) {
        setErrMsg("Не заполнен заголовок или содержимое поста");
      }
      if (error.status === 500) {
        setErrMsg("Internal Server Error");
      }
    }
  };
  const CustomInputFile = () => imageRef.current.click();
  const HandleTitleInput = (e) => setTitle(e.target.value);
  const HandleSearchTag = (e) => setSearchTag(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      {isSuccess ? (
        <p>Пост создан</p>
      ) : (
        <>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form
            onSubmit={handleSubmit}
            className="create-post"
            encType="multipart/form-data"
          >
            <label htmlFor="image">
              <button
                type="button"
                className="btn-form-image"
                onClick={CustomInputFile}
              >
                Добавить изорбажение
              </button>
              <input
                name="image"
                type="file"
                accept=".jpeg, .jpg, .png, .webp"
                id="image"
                ref={imageRef}
                onChange={HandleImageInput}
                hidden
              />
            </label>
            <div className="create-post__image">
              {imageURL && (
                <>
                  <button
                    className="create-post__btn-delete-img"
                    onClick={() => setImageURL("")}
                  >
                    удалить
                  </button>
                  <img
                    className="post__img"
                    src={`${process.env.REACT_APP_BASE_URL}/uploads${imageURL}`}
                    alt={imageURL.name}
                  />
                </>
              )}
            </div>
            <label htmlFor="title">
              <input
                className="create-post__title"
                type="text"
                placeholder="  Заголовок"
                id="title"
                value={title}
                onChange={HandleTitleInput}
              />
            </label>
            <label htmlFor="simplemde-editor-2">
              <SimpleMDE value={text} onChange={onChange} options={options} />
            </label>
            <div className="block-tags">
              <input
                type="text"
                className="block-tags__input"
                placeholder="Введите название тега"
                onChange={HandleSearchTag}
              />
              <div className="block-tags__out" onClick={removeTags}>
                {tagsPost &&
                  tagsPost.map((tag, index) => {
                    return (
                      <span className="tag-out" key={index}>
                        {tag}
                      </span>
                    );
                  })}
              </div>

              <div className="block-tags__list">
                <ul className="tags-list" onClick={getTags}>
                  {filterTags?.map((tag, index) => {
                    return (
                      <li className="tag-item" key={index} value={tag.tag}>
                        {tag.tag}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <button className="btn-form-submit">Добавить</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default CreatePost;
