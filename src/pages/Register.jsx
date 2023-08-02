import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useNewUserMutation } from "../features/auth/registerApiSlice";

const Register = () => {
  const [createUser, { isSuccess }] = useNewUserMutation();

  const userRef = useRef();
  const fullNameRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, fullName, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ email, fullName, password }).unwrap();

      setEmail("");
      setFullName("");
      setPassword("");
    } catch (error) {
      console.log(error);

      if (error.status === 500) {
        setErrMsg("Сервер не отвечает");
      }

      if (error.status === 409) {
        setErrMsg("Пользователь с таким email уже существует");
      }

      if (error.status === 400) {
        setErrMsg("Пользователь или пароль не найдены");
      }

      errRef.current.focus();
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleFullNameInput = (e) => setFullName(e.target.value);
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
              <label htmlFor="username">Email:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
              />
              <label htmlFor="fullname">Никнейм:</label>
              <input
                type="text"
                id="fullname"
                ref={fullNameRef}
                value={fullName}
                onChange={handleFullNameInput}
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
              <button className="btn-signin">Создать</button>
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
