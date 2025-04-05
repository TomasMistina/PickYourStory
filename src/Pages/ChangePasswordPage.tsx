import { useEffect, useRef, useState} from "react";
import axios from "./../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Passwords from "../Components/Passwords";

const CHANGE_PASS_URL = "user/change-password";

const ChangePasswordPage = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const { currentUserId } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //Password useStates
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  //Repeat Password useStates
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(CHANGE_PASS_URL, {
        userId: currentUserId,
        oldPassword: oldPassword,
        newPassword: password
      });
      setOldPassword("");
      setRepeatPassword("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else if (err.response?.status === 400) {
        setErrMsg("Neboli zadané všetky údaje");
      } else if (err.response?.status === 401) {
        setErrMsg("Nesprávne zadané staré heslo");
      } else {
        setErrMsg("Nepodarilo sa zmeniť heslo");
      }
    }
  };

  return (
    <section>
      {errMsg ? <p className="error__message">{errMsg}</p> : <></>}
      <h1>Zmena hesla</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldpassword">Staré Heslo:</label>
        <input
          type="password"
          id="oldpassword"
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
          required
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
            passwordLabel="Nové heslo:"
            repeatPasswordLabel="Zopakovanie nového hesla:"
            />
        <button disabled={!validPassword || !validRepeatPassword
              ? true
              : false
          }>Zmeniť heslo</button>
      </form>
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

export default ChangePasswordPage;



