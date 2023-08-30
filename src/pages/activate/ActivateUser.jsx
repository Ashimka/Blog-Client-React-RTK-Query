import { useParams, Link } from "react-router-dom";

import { useActivateUserQuery } from "../../features/auth/registerApiSlice";

import "./activateUser.css";

const ActivateUser = () => {
  const { link } = useParams();
  useActivateUserQuery(link);

  return (
    <>
      <div className="avtivate-user">Аккаунт активирован!</div>
      <Link to={"/login"}> Войти</Link>
    </>
  );
};

export default ActivateUser;
