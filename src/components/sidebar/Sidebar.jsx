import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import { useGetOneUserQuery } from "../../features/users/usersApiSlice";
import { useGetTagsListQuery } from "../../features/posts/postsApiSlice";

import "./sidebar.css";
import { useState } from "react";
import { useEffect } from "react";

const Sidebar = () => {
  const { data: user } = useGetOneUserQuery();
  const { data: tags } = useGetTagsListQuery();

  const [userIsAuth, setUserIsAuth] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setUserIsAuth(user);
    setAvatarURL(user?.avatarURL);
  }, [user]);

  useEffect(() => {
    setCategories(tags);
  }, [tags]);

  return (
    <>
      <div className="main__sidebar">
        <div className="sidebar">
          <div className="sidebar__content">
            {userIsAuth ? (
              <div className="user-sidebar">
                {avatarURL ? (
                  <img
                    className="user-sidebar__image"
                    src={`${process.env.REACT_APP_BASE_URL}/uploads${avatarURL}`}
                    alt="avatar"
                  />
                ) : (
                  <FontAwesomeIcon
                    className="user-sidebar__icon"
                    icon={faCircleUser}
                  />
                )}
                <div className="user-sidebar__name">{user?.fullName}</div>
                <div className="user-sidebar__posts">
                  Постов у пользователя: 10
                </div>
              </div>
            ) : (
              <div className="sidebar__link">
                <Link to={"/login"}>Войти</Link>
                <Link to={"/register"}>Регистрация</Link>
              </div>
            )}
          </div>
          <div className="sidebar__posts">
            <div className="sidebar__posts-item">Новые посты</div>
            <div className="sidebar__posts-item">Популярные посты</div>
          </div>
          <div className="sidebar__categories cat">
            <div className="cat__title">Категории</div>
            <div className="cat__list">
              {categories?.map((cat, index) => (
                <span className="cat__link" key={index}>
                  {cat.tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
