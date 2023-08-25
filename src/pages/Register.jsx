import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useNewUserMutation } from "../features/auth/registerApiSlice";

const Register = () => {
  const [createUser, { isSuccess }] = useNewUserMutation();

  const emailRef = useRef();
  const loginRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, login, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ email, login, password }).unwrap();

      setEmail("");
      setLogin("");
      setPassword("");
    } catch (error) {
      console.log(error);

      if (error.status === 500) {
        setErrMsg("Сервер не отвечает");
      }

      if (error.status === 409) {
        setErrMsg(error.data.message);
      }

      if (error.status === 400) {
        setErrMsg(error.data.message);
      }

      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleLoginInput = (e) => setLogin(e.target.value);
  const handlePassordInput = (e) => setPassword(e.target.value);

  const clickSignUp = () => {
    navigate("/login");
  };

  let content;

  content = (
    <>
      {isSuccess ? (
        <section className="login">
          <h2 className="login-title">Вы зарегистрировались!</h2>
          <div className="login-subtitle">
            <Link to={"/login"}>Вход</Link>
          </div>
        </section>
      ) : (
        <div className="login-page">
          <section className="login">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="login-title">Регистация</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="login">Логин:</label>
              <input
                type="text"
                id="login"
                ref={loginRef}
                value={login}
                onChange={handleLoginInput}
                autoComplete="off"
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
              />

              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                onChange={handlePassordInput}
                value={password}
                required
              />
              <button
                disabled={!login || !email || !password}
                className="btn-signin"
              >
                Создать
              </button>
              <button
                className="btn-signup"
                type="button"
                onClick={clickSignUp}
              >
                У меня уже есть аккаунт
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );

  return content;
};

export default Register;
