import { useEffect, useRef, useState} from "react";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Email from "../Components/Email";
import { useQuery } from "@tanstack/react-query";

const CHANGE_MAIL_URL = "user/change-email";

//Stranka na zmenu emailu
//Stranky na zmenu mena emailu, hesla, atd, som vytvoril podla stranky na registraciu
const ChangeEmailPage = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const { currentUserId } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //Email useStates
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const {
    data,
    isError,
    isLoading,
    error
  } = useQuery({
    queryKey: ["current_email", currentUserId],
    queryFn: async () => {
      const response = await axios.get(`/user/get-email?userId=${currentUserId}`);
      return await response.data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(CHANGE_MAIL_URL, {
        userId: currentUserId,
        password: password,
        newEmail: email
      });
      setPassword("");
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else if (err.response?.status === 400) {
        setErrMsg("Neboli zadané všetky údaje");
      } else if (err.response?.status === 401) {
        setErrMsg("Nesprávne zadané heslo");
      } else if (err.response?.status === 409) {
        setErrMsg("Tento email už niekto používa");
      } else {
        setErrMsg("Nepodarilo sa zmeniť email");
      }
    }
  };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    
    const currentEmail = data.email;

  return (
    <section>
      {errMsg ? <p className="error__message">{errMsg}</p> : <></>}
      <h1>Zmena emailu</h1>
      <label>
        Aktuálny email: {currentEmail? currentEmail : "Email sa nenašiel"}
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
        <Email
          email={email}
          setEmail={setEmail}
          validEmail={validEmail}
          setValidEmail={setValidEmail}
          emailLabel="Nový email:"
        />
        
        <button disabled={!validEmail
              ? true
              : false
          }>Zmeniť email</button>
      </form>
    </section>
  );
};

export default ChangeEmailPage;
