import { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

type Props = {
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    repeatPassword: string,
    setRepeatPassword: React.Dispatch<React.SetStateAction<string>>,
    validPassword: boolean,
    setValidPassword: React.Dispatch<React.SetStateAction<boolean>>,
    validRepeatPassword: boolean,
    setValidRepeatPassword: React.Dispatch<React.SetStateAction<boolean>>,
    passwordLabel: string,
    repeatPasswordLabel: string
}
const PASSWORD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Passwords = ({password, setPassword, repeatPassword, setRepeatPassword, validPassword, setValidPassword, validRepeatPassword , setValidRepeatPassword, passwordLabel, repeatPasswordLabel}: Props) => {  
    //Password useStates
    const [passwordFocus, setPasswordFocus] = useState(false);

    //Repeat Password useStates
    const [repeatPasswordFocus, setRepeatPasswordFocus] = useState(false);

    useEffect(() => {
          const result = PASSWORD_REGEX.test(password);
          setValidPassword(result);
          const match = password === repeatPassword;
          setValidRepeatPassword(match);
        }, [password, repeatPassword]);

  return (
    <>
        <label htmlFor="password">{passwordLabel}</label>
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
            Musí obsahovať veľké písmená, malé písmená a číslice
        </p>
        ) : (
            <></>
        )}
        <label htmlFor="repeatpassword">{repeatPasswordLabel}</label>
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
            Musí sa zhodovať s heslom v poli nové heslo.
        </p>
        ) : (
            <></>
        )}
    </>
  );
};

export default Passwords;

