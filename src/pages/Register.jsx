import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

import { useNewUserMutation } from "../features/auth/registerApiSlice";

const LOGIN_REGEX = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9!@#$%&*+=._-]{1,20}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [createUser, { isSuccess }] = useNewUserMutation();

  const emailRef = useRef();
  const loginRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [loginFocus, setLoginFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [validLogin, setValidLogin] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, login, password]);

  useEffect(() => {
    setValidLogin(LOGIN_REGEX.test(login));
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPassword(PASS_REGEX.test(password));
  }, [login, email, password]);

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
          <p>
            Для завершения регистрации активируйте аккаунт в письме,
            отправленном на Ваш email, указанный при регистрации.
          </p>
          <p>P.S. письмо могло попасть в папку спам</p>
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
              <label htmlFor="login">
                Логин:
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={validLogin ? "icon-check" : "icon-hidden"}
                />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={
                    validLogin || !login ? "icon-hidden" : "icon-xmark"
                  }
                />
              </label>
              <input
                type="text"
                id="login"
                ref={loginRef}
                value={login}
                aria-invalid={validLogin ? "false" : "true"}
                aria-describedby="loginnote"
                onFocus={() => setLoginFocus(true)}
                onChange={handleLoginInput}
                autoComplete="off"
                required
              />
              <p
                id="loginnote"
                className={
                  loginFocus && login && !validLogin ? "options" : "icon-hidden"
                }
              >
                Логин пользователя от 2 до 20 символов на латинице или
                кириллице, цифры и спецсимволы. Первый символ обязательно буква
              </p>
              <label htmlFor="email">
                Email:
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={validEmail ? "icon-check" : "icon-hidden"}
                />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={
                    validEmail || !email ? "icon-hidden" : "icon-xmark"
                  }
                />
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail ? "options" : "icon-hidden"
                }
              >
                Введите Ваш действующий email
              </p>

              <label htmlFor="password">
                Пароль:
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={validPassword ? "icon-check" : "icon-hidden"}
                />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className={
                    validPassword || !password ? "icon-hidden" : "icon-xmark"
                  }
                />
              </label>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                onChange={handlePassordInput}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
              />
              <div className="show-password">
                <label htmlFor="show-password">Показать пароль</label>
                <input
                  className="input-checkbox"
                  type="checkbox"
                  id="show-password"
                  onChange={() => setShowPass(!showPass)}
                />
              </div>
              <p
                id="passwordnote"
                className={
                  passwordFocus && password && !validPassword
                    ? "options"
                    : "icon-hidden"
                }
              >
                Пароль должен состоять от 8 до 24 символов, из хотя бы одной
                заглавной и строчной буквы, цифр и специальных символов
              </p>
              <button
                disabled={!validLogin || !validEmail || !validPassword}
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
