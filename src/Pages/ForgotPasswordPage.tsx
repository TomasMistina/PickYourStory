import { useEffect, useRef, useState} from "react";
import axios from "./../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './pages.css';
import { FaArrowsRotate } from "react-icons/fa6";
import CodeInput from "../Components/ui/CodeInput";
import Passwords from "../Components/Passwords";
import Email from "../Components/Email";

const RECOVERY_EMAIL_URL = "user/forgot-password";
const RECOVERY_CODE_URL = "user/validate-recovery-code";
const CHANGE_PASS_URL = "user/reset-password";

const ForgotPasswordPage = () => {
  const userRef = useRef<HTMLInputElement>(null);

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [validCode, setValidCode] = useState<string | null>(null);
  const [isPasswordChanged, setPasswordChanged] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  //Email useStates
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  //Password useStates
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  //Repeat Password useStates
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(RECOVERY_EMAIL_URL, {
        email: email
      });
      setIsEmailSent(true);
      setInfoMsg("Kód bol zaslaný na Vami zadaný email");
      setSuccessMsg("");
      setErrMsg("");
    } catch (err: any) {
      setSuccessMsg("");
      setInfoMsg("");
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else if (err.response?.status === 400) {
        setErrMsg("Neboli zadané všetky údaje");
      } else if (err.response?.status === 401) {
        setErrMsg("Nesprávne zadaný email");
      } else {
        setErrMsg("Nepodarilo sa poslať email");
      }
    }
  };

  const handleCodeSubmit = async ( code : string) => {
    try {
      const response = await axios.post(RECOVERY_CODE_URL, {
        email: email,
        code: code,
      });
      setValidCode(code);
      setIsCodeValid(true);
      setSuccessMsg("Kód je správny, môžete zmeniť heslo");
      setErrMsg("");
      setInfoMsg("");
    } catch (err: any) {
      setSuccessMsg("");
      setInfoMsg("");
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else if (err.response?.status === 400) {
        setErrMsg("Neboli zadané všetky údaje");
      } else if (err.response?.status === 401) {
        setErrMsg("Nesprávny zadaný kód");
      } else {
        setErrMsg("Nesprávny zadaný kód");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(CHANGE_PASS_URL, {
        email: email,
        code: validCode,
        newPassword: password
      });
      setRepeatPassword("");
      setPassword("");
      setPasswordChanged(true);
      setSuccessMsg("Heslo bolo úspešne zmenené");
      setInfoMsg("");
      setErrMsg("");
    } catch (err: any) {
      setSuccessMsg("");
      setInfoMsg("");
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

  const handleSwitchEmail = async(e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setIsEmailSent(false);
    setValidEmail(false);
    setIsCodeValid(false);
    setValidCode(null);
    setSuccessMsg("");
    setInfoMsg("");
    setErrMsg("");
  };

  function handleLogIn(){
    navigate("/login");
  };
  
  return (
    <section>
        {errMsg ? <p className="error__message">{errMsg}</p> : <></>}
        {successMsg ? <p className="success__message">{successMsg}</p> : <></>}
        {infoMsg ? <p className="info__message">{infoMsg}</p> : <></>}
        {!isPasswordChanged ?
        <>
        <h1>Zabudnuté heslo</h1>
            {!isEmailSent 
                ? 
                <form onSubmit={handleEmailSubmit}>
                    <Email
                        email={email}
                        setEmail={setEmail}
                        validEmail={validEmail}
                        setValidEmail={setValidEmail}
                        emailLabel="Email na obnovenie hesla"
                        /> 
                    <button disabled={!validEmail
                            ? true
                            : false
                        }>Poslať kód na obnovenie</button>
                </form>
                :
                <div>
                    <label>
                        Email na obnovenie: {email}
                        <label className="close_xmark" onClick={handleSwitchEmail} title="Zmeniť email na obnovenie"><FaArrowsRotate/></label>
                    </label>
                </div>
            }
            {isEmailSent && !isCodeValid &&
                <>
                    <label>Zadajte kód na obnovenie</label>
                    <CodeInput onComplete={(code) => handleCodeSubmit(code)} />
                </>
            }
            {isCodeValid && 
                <form onSubmit={handleSubmit}>
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
            }
        </> 
        : 
      <button className="action__button" onClick={() => handleLogIn()}>Prihlásiť sa</button>
      }
    </section>
  );
};

export default ForgotPasswordPage;
