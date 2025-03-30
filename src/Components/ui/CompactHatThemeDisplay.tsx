import React from "react";
import "./CompactWordDisplay.css";
import { ExtendedHatThemePreview } from "../../model";
import CompactWordDisplay from "./CompactWordDisplay";

type Props = {
    lessonHatTheme: ExtendedHatThemePreview;
};

const CompactHatThemeDisplay = ({lessonHatTheme}: Props) => {
  return (
    <div className="multisection__container__other">
        <div className="multisection__title">{lessonHatTheme.title}</div>
        <CompactWordDisplay title="Postavy" items={lessonHatTheme.hats[0].items} sectionStyle="section__container__hat__preview"/>
        <CompactWordDisplay title="Predmety" items={lessonHatTheme.hats[1].items} sectionStyle="section__container__hat__preview"/>
        <CompactWordDisplay title="Frázy" items={lessonHatTheme.hats[2].items} sectionStyle="section__container__hat__preview"/>
    </div>
  );
};

export default CompactHatThemeDisplay;


