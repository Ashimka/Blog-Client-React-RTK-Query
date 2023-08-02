import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";

const Header = () => {
  const isAuth = Boolean(
    useSelector((state) => state.persistedReducer.auth.token)
  );

  const avatarDefault = "profile.png";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    navigate("/");
    await logoutUser();
    dispatch(logOut());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrap">
          <div className="header__logo">
            <Link className="link-logo" to="/">
              Ashimka-blog
            </Link>
          </div>
          <div className="header__right">
            {isAuth ? (
              <>
                <Link to={`/user/me`}>
                  <div className="header-avatar">
                    <img
                      className="avatar-image"
                      src={`${process.env.REACT_APP_BASE_URL}/uploads/${avatarDefault}`}
                      alt={"avatar"}
                    />
                  </div>
                </Link>
                <button className="btn-out" onClick={handleLogout}>
                  Выход
                </button>
              </>
            ) : (
              <Link className="header-link" to={"/login"}>
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
