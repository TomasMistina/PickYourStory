import React from "react";
import "./CompactWordDisplay.css";
import { Link } from "react-router-dom";


type Props = {
    selected: number;
    setSelected: React.Dispatch<React.SetStateAction<number>>;
};

const CompactHatThemeDisplay = ({ selected, setSelected }: Props) => {
    return(
        <div className="mobile__tab__container">
            <div className={(selected===1) ? "mobile__tab__bigger" : "mobile__tab"}> 
                <Link to="#" 
                className="mobile__hat__heading" 
                onClick={(e) => {
                e.preventDefault();
                setSelected(1);
                }}>
                    POSTAVY
                </Link>
            </div>
            <div className={(selected===2) ? "mobile__tab__bigger" : "mobile__tab"}>
                <Link to="#" 
                className="mobile__hat__heading" 
                onClick={(e) => {
                e.preventDefault();
                setSelected(2);
                }}>
                PREDMETY
                </Link>
            </div>
            <div className={(selected===3) ? "mobile__tab__bigger" : "mobile__tab"}>
                <Link to="#" 
                className="mobile__hat__heading" 
                onClick={(e) => {
                e.preventDefault();
                setSelected(3);
                }}>
                VÝROKY
                </Link>
            </div>
        </div>
    );
};

export default CompactHatThemeDisplay;


