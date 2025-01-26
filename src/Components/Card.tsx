import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  owner: string | null;
  id: string;
};

const Card = ({ title, owner, id }: Props) => {
  const value = `${id}`;
  return (
    <Link to={value} className="single__card">
      <h3>{title}</h3>
      {owner ? <p>Owner: {owner}</p> : <></>}
    </Link>
  );
};

export default Card;
