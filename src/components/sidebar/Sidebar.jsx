import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import { useGetOneUserQuery } from "../../features/users/usersApiSlice";
import { useGetTagsListQuery } from "../../features/posts/postsApiSlice";

import "./sidebar.css";

const Sidebar = () => {
  const isAuth = Boolean(
    useSelector((state) => state.persistedReducer.auth.token)
  );

  const { data: user } = useGetOneUserQuery();
  const { data: getCats } = useGetTagsListQuery();

  return (
    <>
      <div className="main__sidebar">
        <div className="sidebar">
          <div className="sidebar__content">
            {isAuth ? (
              <div className="user-sidebar">
                {user?.avatarURL ? (
                  <img
                    className="user-sidebar__image"
                    src={`${process.env.REACT_APP_BASE_URL}/uploads${user.avatarURL}`}
                    alt="avatar"
                  />
                ) : (
                  <FontAwesomeIcon
                    className="user-sidebar__icon"
                    icon={faCircleUser}
                  />
                )}
                <div className="user-sidebar__name">{user?.login}</div>
                <div className="user-sidebar__posts">
                  {`Дата регистрации: ${new Date(
                    user?.createdAt
                  ).toLocaleDateString()}`}
                </div>
                <div className="user-sidebar__posts">
                  {`Постов: ${user?.posts?.length}`}
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
            <Link to={"/popular"} className="sidebar__posts-title">
              Популярные посты
            </Link>
            <Link to={"/"} className="sidebar__posts-title">
              Новые посты
            </Link>
          </div>
          <div className="sidebar__categories cat">
            <div className="cat__title">Категории</div>
            <div className="cat__list">
              {getCats?.map((cat, index) => (
                <Link
                  to={`/post?category=${cat.cat}`}
                  className="cat__link"
                  key={index}
                >
                  {cat.cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
