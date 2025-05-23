import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiCircleCheck, CiCircleRemove, CiCircleInfo } from "react-icons/ci";
import axios from "./../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import Passwords from "../Components/Passwords";
import Email from "../Components/Email";

//Tuto stranku a Login som vytvoril s velkou inspiraciou podla videa: https://www.youtube.com/watch?v=brcHK3P6ChQ
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//Email regex je z: https://stackoverflow.com/questions/60282362/regex-pattern-for-email
const EMAIL_REGEX = /^[^\.\s][\w\-\.{2,}]+@([\w-]+\.)+[\w-]{2,}$/;
const REGISTER_URL = "user/register";

const RegisterPage = () => {
  const userRef = useRef<HTMLInputElement>(null);

  const { setCurrentUser, setCurrentUserId } = useAuth();

  //Po login/registration ma to presunie na spravnu stranku
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

  //Password useStates
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  //Repeat Password useStates
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);

  //Message useStates
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

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
      setCurrentUser(user);
      setCurrentUserId(response.data.data._id);
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
        <Email
          email={email}
          setEmail={setEmail}
          validEmail={validEmail}
          setValidEmail={setValidEmail}
          emailLabel="Email"
          /> 
        <Passwords
            password={password} 
            setPassword={setPassword} 
            repeatPassword={repeatPassword} 
            setRepeatPassword={setRepeatPassword}
            validPassword={validPassword} 
            setValidPassword={setValidPassword} 
            validRepeatPassword={validRepeatPassword} 
            setValidRepeatPassword={setValidRepeatPassword}
            passwordLabel="Heslo:"
            repeatPasswordLabel="Zopakovanie hesla:"
            />
        <button
          disabled={
            !validName || !validEmail || !validPassword || !validRepeatPassword
              ? true
              : false
          }
        >
          Zaregistrovať sa
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
