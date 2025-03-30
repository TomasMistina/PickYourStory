import React from "react";
import "./CompactWordDisplay.css";
import { Item } from "../../model";
import CompactWordItem from "./CompactWordItem";

type Props = {
  title: string;
  items: Item[];
  sectionStyle: string;
};

const CompactWordDisplay = ({title, items, sectionStyle}: Props) => {
  return (
    <section className={sectionStyle}>
        <div className="section__title">{title}</div>
        <div className="tag__style__list">
            {items.map((item) => (
            <CompactWordItem
                text={item.value}
                key={item.id}
            />
            ))}
        </div>
</section>

  );
};

export default CompactWordDisplay;



