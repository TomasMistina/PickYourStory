import React from "react";
import "./CompactWordDisplay.css";
import { ExtendedHatThemePreview } from "../../model";
import CompactWordDisplay from "./CompactWordDisplay";

type Props = {
    lessonHatTheme: ExtendedHatThemePreview;
};

const CompactHatThemeDisplay = ({lessonHatTheme}: Props) => {
  return (
    <div className="multisection__container">
        <div className="multisection__title">{lessonHatTheme.title}</div>
        <CompactWordDisplay title="Postavy" items={lessonHatTheme.hats[0].items}/>
        <CompactWordDisplay title="Predmety" items={lessonHatTheme.hats[1].items}/>
        <CompactWordDisplay title="Frázy" items={lessonHatTheme.hats[2].items}/>
    </div>
  );
};

export default CompactHatThemeDisplay;


