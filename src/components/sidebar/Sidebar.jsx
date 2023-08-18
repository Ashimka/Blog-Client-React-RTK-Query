import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import { useGetOneUserQuery } from "../../features/users/usersApiSlice";

import "./sidebar.css";

const Sidebar = () => {
  const isAuth = Boolean(
    useSelector((state) => state.persistedReducer.auth.token)
  );

  const { data: user } = useGetOneUserQuery();

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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
