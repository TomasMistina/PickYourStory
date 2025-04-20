import { useRef, useState} from "react";
import axios from "./../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const LOGIN_URL = "user/login";

const LoginPage = () => {
  const userRef = useRef<HTMLInputElement>(null);

  const { setCurrentUser, setCurrentUserId } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password,
      });
      setCurrentUser(user);
      setCurrentUserId(response.data.data);
      setUser("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else if (err.response?.status === 400) {
        setErrMsg("Chýba meno alebo heslo");
      } else if (err.response?.status === 401) {
        setErrMsg("Nesprávne meno alebo heslo");
      } else {
        setErrMsg("Nepodarilo sa prihlásiť");
      }
    }
  };

  return (
    <section>
      {errMsg ? <p className="error__message">{errMsg}</p> : <></>}
      <h1>Prihlásenie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Meno:</label>
        <input
          className="input__field"
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Heslo:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Prihlásiť sa</button>
      </form>
      <p>
        Nemáte ešte konto?
        <br />
        <span className="line">
          <Link className="signin__link" to="/register">
            Zaregistrovať sa
          </Link>
        </span>
      </p>

      <p>
        Zabudli ste heslo?
        <br />
        <span className="line">
          <Link className="signin__link" to="/forgot-password">
            Prejsť na obnovenie hesla
          </Link>
        </span>
      </p>
    </section>
  );
};

export default LoginPage;
