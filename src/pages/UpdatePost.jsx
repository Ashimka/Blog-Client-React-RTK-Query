import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import SimpleMDE from "react-simplemde-editor";

import {
  useGetFullPostQuery,
  useUpdatePostMutation,
  useUploadImageMutation,
  useGetTagsListQuery,
} from "../features/posts/postsApiSlice";

import "easymde/dist/easymde.min.css";
import "./styles/createPost.css";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetFullPostQuery(id);
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [fileUpload] = useUploadImageMutation();
  const { data: postCats } = useGetTagsListQuery();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImageURL, setOldImageURL] = useState("");
  const [newImageURL, setNewImageURL] = useState("");
  const [catsPost, setCatsPost] = useState([]);

  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef();

  const errRef = useRef();

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

  const editPost = useCallback(() => {
    if (data) {
      setTitle(data.post.title);
      setText(data.post.text);
      setOldImageURL(data.post.imageURL);
      setCatsPost([data.post.cat_post?.cats]);
    }
  }, [data]);

  useEffect(() => {
    if (id && data) {
      editPost();
    }
  }, [id, data, editPost]);

  const HandleImageInput = async (e) => {
    try {
      const formData = new FormData();

      formData.append("image", e.target.files[0]);

      const file = await fileUpload(formData).unwrap();
      setNewImageURL(file.url);
      setOldImageURL("");
    } catch (error) {
      console.log(error);
      if (error.originalStatus === 413) {
        setErrMsg(
          "Ошибка при загрузке изображения, размер изображений не больше 1 Mb"
        );
      }
    }
  };

  const getCats = (e) => {
    if (!catsPost) {
      return setCatsPost([e.target.innerText]);
    }

    if (catsPost.includes(e.target.innerText)) {
      return;
    }

    if (catsPost.length === 1) {
      return;
    }

    setCatsPost([...catsPost, e.target.innerText]);
  };

  const removeTags = (e) => {
    setCatsPost(catsPost.filter((cat) => cat !== e.target.innerText));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUpdate;
      if (!newImageURL) {
        imageUpdate = oldImageURL;
      }
      if (newImageURL) {
        imageUpdate = newImageURL;
      }
      await updatePost({
        id,
        title,
        text,
        imageURL: imageUpdate,
        cats: catsPost.join(),
      }).unwrap();

      setTitle("");
      setText("");
      setNewImageURL("");
      setCatsPost("");
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);

      if (error.status === 500) {
        setErrMsg("Internal Server Error");
      }
    }
  };

  useEffect(() => {
    editPost();
  }, [editPost]);

  const CustomInputFile = () => imageRef.current.click();

  const HandleTitleInput = (e) => setTitle(e.target.value);

  if (isLoading) content = <p>Загрузка...</p>;

  content = (
    <>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form
        className="create-post"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="image">
          <button
            disabled={!!newImageURL || !!oldImageURL}
            type="button"
            className="btn-form-image"
            onClick={CustomInputFile}
          >
            Добавить изорбажение
          </button>
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, image/webp"
            id="image"
            ref={imageRef}
            onChange={HandleImageInput}
            hidden
          />
          {!oldImageURL && !newImageURL && (
            <div className="image-info">
              <span>допустимый размер изображения 1 Mb</span>
            </div>
          )}
          <div className="create-post__image">
            {oldImageURL && (
              <>
                <button
                  className="create-post__btn-delete-img"
                  onClick={() => setOldImageURL("")}
                >
                  удалить
                </button>
                <img
                  className="post__img"
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${oldImageURL}`}
                  alt={oldImageURL.name}
                />
              </>
            )}
            {newImageURL && (
              <>
                <button
                  className="create-post__btn-delete-img"
                  onClick={() => setNewImageURL("")}
                >
                  удалить
                </button>
                <img
                  className="post__img"
                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${newImageURL}`}
                  alt={newImageURL.name}
                />
              </>
            )}
          </div>
        </label>

        <label htmlFor="title">
          <input
            className="create-post__title"
            type="text"
            placeholder="Заголовок"
            id="title"
            value={title}
            onChange={HandleTitleInput}
          />
        </label>
        <label htmlFor="simplemde-editor-1">
          <SimpleMDE value={text} onChange={onChange} options={options} />
        </label>
        <div className="block-tags">
          <div className="block-tags__out" onClick={removeTags}>
            {catsPost &&
              catsPost?.map((cat, index) => {
                return (
                  <span className="tag-out" key={index}>
                    {cat}
                  </span>
                );
              })}
          </div>

          <div className="block-tags__list">
            <ul className="tags-list" onClick={getCats}>
              {postCats?.map((cat, index) => {
                return (
                  <li className="tag-item" key={index} value={cat.cat}>
                    {cat.cat}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <button className="btn-form-submit">Редактировать</button>
      </form>
    </>
  );

  return content;
};

export default UpdatePost;
