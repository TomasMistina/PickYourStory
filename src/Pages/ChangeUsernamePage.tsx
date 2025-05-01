import { useEffect, useRef, useState} from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { CiCircleInfo } from "react-icons/ci";

const CHANGE_USER_URL = "user/change-username";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

//Stranka na zmenu mena
//Stranky na zmenu mena emailu, hesla, atd, som vytvoril podla stranky na registraciu
const ChangeUsernamePage = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const { currentUser, currentUserId, setCurrentUser} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

   //Username useStates
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);


  useEffect(() => {
      const result = USER_REGEX.test(user);
      setValidName(result);
    }, [user]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(CHANGE_USER_URL, {
        userId: currentUserId,
        newUsername: user,
        password: password,
      });
      setCurrentUser(user);
      setPassword("");
      setUser("");
      setErrMsg("");
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else if (err.response?.status === 400) {
        setErrMsg("Neboli zadané všetky údaje");
      } else if (err.response?.status === 401) {
        setErrMsg("Nesprávne zadané heslo");
      } else if (err.response?.status === 409) {
        setErrMsg("Toto meno už niekto používa");
      } else {
        setErrMsg("Nepodarilo sa zmeniť meno");
      }
    }
  };

  return (
    <section>
      {errMsg ? <p className="error__message">{errMsg}</p> : <></>}
      <h1>Zmena mena</h1>
      <label>
        Aktuálne meno: {currentUser? currentUser : "Meno používateľa sa nenašlo"}
      </label>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Heslo:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <label htmlFor="username">Nové meno:</label>
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
        
        <button disabled={!validName
              ? true
              : false
          }>Zmeniť meno</button>
      </form>
    </section>
  );
};

export default ChangeUsernamePage;
