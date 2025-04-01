import React from "react";
import "./CompactWordDisplay.css";
import { ExtendedHatThemePreview } from "../../model";
import CompactWordDisplay from "./CompactWordDisplay";
import { useIsMobile } from "../../mobile/useIsMobile";

type Props = {
    lessonHatTheme: ExtendedHatThemePreview;
};

const CompactHatThemeDisplay = ({lessonHatTheme}: Props) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile
        ?
        <div className="mobile__multisection__container__other">
          <div className="multisection__title">{lessonHatTheme.title}</div>
          <CompactWordDisplay title="Postavy" items={lessonHatTheme.hats[0].items} sectionStyle="mobile__section__container__hat__preview"/>
          <CompactWordDisplay title="Predmety" items={lessonHatTheme.hats[1].items} sectionStyle="mobile__section__container__hat__preview"/>
          <CompactWordDisplay title="Frázy" items={lessonHatTheme.hats[2].items} sectionStyle="mobile__section__container__hat__preview"/>
        </div>
        :
        <div className="multisection__container__other">
          <div className="multisection__title">{lessonHatTheme.title}</div>
          <CompactWordDisplay title="Postavy" items={lessonHatTheme.hats[0].items} sectionStyle="section__container__hat__preview"/>
          <CompactWordDisplay title="Predmety" items={lessonHatTheme.hats[1].items} sectionStyle="section__container__hat__preview"/>
          <CompactWordDisplay title="Frázy" items={lessonHatTheme.hats[2].items} sectionStyle="section__container__hat__preview"/>
      </div>
      }
    </>
  );
};

export default CompactHatThemeDisplay;


