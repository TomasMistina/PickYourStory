import { useState } from "react";
import "./HomePage.css";
import { useIsMobile } from "../mobile/useIsMobile";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

//Domovska stranka
//Vacsinu tejto stranky a jej stylov som podla svojich preferencii vygeneroval v chatgpt a potom upravil
const HomePage = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleClick = (index: number) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className={isMobile ? "mobile__homepage-container" : "homepage-container"}>
        <div></div>
          <div className={isMobile ? "mobile__sections" : "sections"}>
            {/* Section 1 */}
            <section className={`section_home ${selected === 1 ? "active" : ""}`} onClick={() => handleClick(1)}>
              <div className="phrase">Vyber si klobúk</div>
              {selected === 1 && <p className="description">
                Vyber si klobúk, z ktorého budeš náhodne vyberať papieriky.
                Ak máš mentora, tak nájdi klobúk, ktorý ti on odporučil.
                Ak nie, tak vyber niektorý z verejných klobúkov, ktorý ťa zaujme.
                Ak si nič nenašiel, máš možnosť vytvoriť si svoj vlastný klobúk s vlastnými papierikmi.
                </p>}
            </section>

            <div className="arrow">{isMobile ? <FaArrowDown /> : <FaArrowRight />}</div>

            {/* Section 2 */}
            <section className={`section_home ${selected === 2 ? "active" : ""}`} onClick={() => handleClick(2)}>
              <div className="phrase">Vytiahni si papieriky</div>
              {selected === 2 && <p className="description">
                Vytiahni si papieriky z klobúka, ktorý si si vybral.
                Papieriky sú v 3 rôznych kategóriach: Postavy, Predmety a Frázy.
                Kliknutím na kategóriu náhodne vyberieš papierik z tejto kategórie.
                Vyberaj rovnomerne. Je odporúčané vytiahnuť najviac papierikov z kategórie Postavy a najmenej z kategórie Frázy.
                Ak sa ti nejaký z papierikov nepáči, nič sa nedeje, odstráň ho zo zoznamu a vyber si iný.        
                </p>}
            </section>

            <div className="arrow">{isMobile ? <FaArrowDown /> : <FaArrowRight />}</div>

            {/* Section 3 */}
            <section className={`section_home ${selected === 3 ? "active" : ""}`} onClick={() => handleClick(3)}>
              <div className="phrase">Napíš svoj príbeh</div>
              {selected === 3 && <p className="description">
                Napíš príbeh z papierikov, ktoré si vytiahol.
                Je odporúčané aby si si najprv vyhradil čas na rozvrhnutie toho, ako
                do svojho príbehu zaintegruješ jednotlivé postavy, predmety a frázy, na
                základe ktorých budeš písať svoj príbeh. Pri písaní príbehu 
                nemusíš použiť všetky papieriky, ktoré si vytiahol. Keby si využil všetky papieriky 
                a príbeh ešte nemáš dopísaný, nič sa nedeje, môžeš si dotiahnuť ďalšie.
                </p>}
            </section>
          </div>
          <a className="link__style" href="https://docs.google.com/forms/d/e/1FAIpQLSd8wUHlRPUKh8G1PX5TSAf9THILde-h0O4OQ98kEagSskB_jQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
            Prejsť na formulár
          </a>
      </div>
  );
};

export default HomePage;
