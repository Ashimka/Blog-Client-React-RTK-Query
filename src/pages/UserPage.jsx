import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import { useGetOneUserQuery } from "../features/users/usersApiSlice";

import "./styles/userPage.css";

const UserPage = () => {
  const { data: user, isSuccess, isLoading } = useGetOneUserQuery();
  const isAdmin = user?.role?.admin;

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isSuccess) {
    content = (
      <>
        <section className="user">
          <div className="user__header">
            <div className="user__header-avatar">
              {user.avatarURL ? (
                <img
                  className="user__avatar-image"
                  src={`${process.env.REACT_APP_BASE_URL}/uploads${user.avatarURL}`}
                  alt="avatar"
                />
              ) : (
                <FontAwesomeIcon
                  className="user__avatar-image"
                  icon={faCircleUser}
                />
              )}
            </div>
            <div className="user__name">{user.fullName}</div>
          </div>
          <div className="user__options">
            <Link to={"/user/profile"}>Загрузить аватар</Link>
            <Link to={"/post"}>Добавить пост</Link>
            <Link to={"/user/posts"}>Мои посты</Link>
          </div>
          <div className="user__admin">
            {isAdmin && (
              <>
                <div>
                  <Link to="/user/all">Список пользователей</Link>
                </div>
                <div>
                  <Link to="/post/cats">Создать тег</Link>
                </div>
              </>
            )}
          </div>
        </section>
      </>
    );
  }

  return content;
};

export default UserPage;
