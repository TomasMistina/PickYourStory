import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiCircleCheck, CiCircleRemove, CiCircleInfo } from "react-icons/ci";
import axios from "./../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//Got this email regex from here: https://stackoverflow.com/questions/60282362/regex-pattern-for-email
const EMAIL_REGEX = /^[^\.\s][\w\-\.{2,}]+@([\w-]+\.)+[\w-]{2,}$/;
const REGISTER_URL = "user/register";

const RegisterPage = () => {
  const userRef = useRef<HTMLInputElement>(null);

  //User context setter here, this context is used in the whole application onwards
  const { setCurrentUser } = useAuth();

  //This ensures that after login/registration I get to desired page
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //Username useStates
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //Email useStates
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //Password useStates
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  //Repeat Password useStates
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);
  const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);

  //Message useStates
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === repeatPassword;
    setValidRepeatPassword(match);
  }, [password, repeatPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, password, repeatPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(REGISTER_URL, {
        username: user,
        email,
        password,
      });
      console.log(response.data);
      console.log(JSON.stringify(response));
      setCurrentUser(user);
      setUser("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else if (err.response?.status === 409) {
        setErrMsg("Meno alebo email sú už obsadené");
      } else {
        setErrMsg("Registrácia zlyhala");
      }
    }
  };

  return (
    <section>
      {errMsg ? <p className="error__message">{errMsg}</p> : <></>}
      <h1>Registrácia</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Meno:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        ></input>
        {userFocus && user && !validName ? (
          <p>
            <span className="mini__icon">
              <CiCircleInfo />
            </span>
            4 až 24 znakov <br />
            Musí začínať písmenom <br />
            Povolené sú písmená, číslice, podtržníky a pomlčky.
          </p>
        ) : (
          <></>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        ></input>
        {emailFocus && !validEmail ? (
          <p>
            <span className="mini__icon">
              <CiCircleInfo />
            </span>
            Musí obsahovať @ <br />
            Nemôže začínať ani končiť bodkou <br />
            Nemôže mať bodku susediacu s @ <br />
            Nemôže mať 2 bodky za sebou <br />
            Musí obsahovať aspoň jednu bodku v časti za @.
          </p>
        ) : (
          <></>
        )}
        <label htmlFor="password">Heslo:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        ></input>
        {passwordFocus && !validPassword ? (
          <p>
            <span className="mini__icon">
              <CiCircleInfo />
            </span>
            8 až 24 znakov <br />
            Musí obsahovať veľké a malé písmená, číslice a špeciálne znaky
            <br />
            Povolené špeciálne znaky sú: ! @ # $ %
          </p>
        ) : (
          <></>
        )}
        <label htmlFor="repeatpassword">Zopakovanie Hesla:</label>
        <input
          type="password"
          id="repeatpassword"
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          onFocus={() => setRepeatPasswordFocus(true)}
          onBlur={() => setRepeatPasswordFocus(false)}
        ></input>
        {repeatPasswordFocus && !validRepeatPassword ? (
          <p>
            <span className="mini__icon">
              <CiCircleInfo />
            </span>
            Musí sa zhodovať s heslom v poli heslo.
          </p>
        ) : (
          <></>
        )}
        <button
          disabled={
            !validName || !validEmail || !validPassword || !validRepeatPassword
              ? true
              : false
          }
        >
          Sign Up
        </button>
      </form>
      <p>
        Už ste zaregistrovaní? <br />
        <span className="line">
          <Link className="signin__link" to="/login">
            Prihlásiť sa
          </Link>
        </span>
      </p>
    </section>
  );
};

export default RegisterPage;
