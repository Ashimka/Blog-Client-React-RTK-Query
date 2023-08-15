import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

import "./styles/login.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [authUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [login, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await authUser({ login, password }).unwrap();

      dispatch(setCredentials({ ...userData, login }));

      setLogin("");
      setPassword("");
      navigate("/user/me");
    } catch (error) {
      if (!error.response) {
        setErrMsg("Сервер не отвечает");
        if (error.status === 400) setErrMsg("Нет имени или пароля");
        if (error.status === 401) setErrMsg("Неверный логин или пароль");
        if (error.response) setErrMsg("Ошибка входа");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setLogin(e.target.value);
  const handlePassInput = (e) => setPassword(e.target.value);

  const clickSignUp = () => {
    navigate("/register");
  };

  const content = isLoading ? (
    <h1>Загрузка...</h1>
  ) : (
    <>
      <div className="login-page">
        <section className="login">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1 className="login-title">Вход</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              value={login}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              onChange={handlePassInput}
              value={password}
              required
            />
            <button className="btn-signin">Вход</button>
            <button className="btn-signup" type="button" onClick={clickSignUp}>
              Создать аккаунт
            </button>
          </form>
        </section>
      </div>
    </>
  );

  return content;
};

export default Login;
