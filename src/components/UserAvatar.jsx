import { useState, useRef, useEffect } from "react";

import { useUploadImageMutation } from "../features/posts/postsApiSlice";
import {
  useUpdateAvatarUserMutation,
  useGetOneUserQuery,
} from "../features/users/usersApiSlice";

const UserAvatar = () => {
  const [avatar, setAvatar] = useState("");
  const [oldAvatar, setOldAvatar] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const imageRef = useRef(null);
  const errRef = useRef();

  const { data: user } = useGetOneUserQuery();
  const [fileUpload] = useUploadImageMutation();
  const [createAvatar, { isLoading, isSuccess }] =
    useUpdateAvatarUserMutation();

  let content;

  useEffect(() => {
    setOldAvatar(user?.avatarURL);
  }, [user]);

  const HandleImageInput = async (e) => {
    try {
      const formData = new FormData();

      formData.append("image", e.target.files[0]);

      const file = await fileUpload(formData).unwrap();

      setAvatar(file.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        "avatarURL": avatar,
      };

      await createAvatar(data).unwrap();

      setAvatar("");
    } catch (error) {
      console.log(error);
      setErrMsg(error);
    }
  };

  const CustomInputFile = () => imageRef.current.click();

  if (isLoading) content = <p>Загрузка....</p>;

  content = (
    <>
      {isSuccess ? (
        <p>Avatar добавлен</p>
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
            className="avatar-form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="create-post__image">
              {oldAvatar && (
                <>
                  <button
                    className="create-post__btn-delete-img"
                    onClick={() => setOldAvatar("")}
                  >
                    удалить
                  </button>
                  <img
                    className="avatar-user"
                    src={`${process.env.REACT_APP_BASE_URL}/uploads${oldAvatar}`}
                    alt={oldAvatar.name}
                  />
                </>
              )}
              {!avatar && !oldAvatar && (
                <>
                  <label htmlFor="image">
                    <button
                      type="button"
                      className="btn-form-image"
                      onClick={CustomInputFile}
                    >
                      Добавить аватарку
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

                    <div className="image-info">
                      <span>допустимый размер изображения 1 Mb</span>
                    </div>
                  </label>
                </>
              )}
              {avatar && (
                <>
                  <button
                    className="create-post__btn-delete-img"
                    onClick={() => setAvatar("")}
                  >
                    удалить
                  </button>
                  <img
                    className="post__img"
                    src={`${process.env.REACT_APP_BASE_URL}/uploads${avatar}`}
                    alt={avatar.name}
                  />
                </>
              )}
            </div>
            <button className="btn-form-submit">Сохранить</button>
          </form>
        </>
      )}
    </>
  );

  return content;
};

export default UserAvatar;
