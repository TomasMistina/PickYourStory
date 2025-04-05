import { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";

type Props = {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    validEmail: boolean,
    setValidEmail: React.Dispatch<React.SetStateAction<boolean>>,
    emailLabel: string,
}

//Got this email regex from here: https://stackoverflow.com/questions/60282362/regex-pattern-for-email
const EMAIL_REGEX = /^[^\.\s][\w\-\.{2,}]+@([\w-]+\.)+[\w-]{2,}$/;

const Passwords = ({email, setEmail, validEmail, setValidEmail, emailLabel}: Props) => {  
    const [emailFocus, setEmailFocus] = useState(false);
    useEffect(() => {
          const result = EMAIL_REGEX.test(email);
          setValidEmail(result);
        }, [email]);

    return (
        <>
            <label htmlFor="email">{emailLabel}</label>
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
                Email musí byť v správnom formáte <br />
                </p>
            ) : (
                <></>
            )}
        </>
  );
};

export default Passwords;






        