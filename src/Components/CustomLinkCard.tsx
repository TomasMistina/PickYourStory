import "./styles.css";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  owner: string | null;
  customLink: string;
};

const CustomLinkCard = ({ title, owner, customLink }: Props) => {
  return (
    <Link to={customLink} className="single__card">
      <h3>{title}</h3>
      {owner ? <p>Owner: {owner}</p> : <></>}
    </Link>
  );
};

export default CustomLinkCard;