import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "../styles.css";
import ProfileButton from "./ProfileButton";
import { useIsMobile } from "../../mobile/useIsMobile";
import MenuButton from "./MenuButton";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  
  if (isMobile){
    return (
      <nav className="nav__mobile">
        <div className="nav__mobile__top__bar">
          <MenuButton elementId="navLinks" isModalOpen={isNavModalOpen} setIsModalOpen={setIsNavModalOpen} />
          <Link to="/" className="nav__mobile__site__title">
            PickYourStory
          </Link>
          <ProfileButton/>
        </div>
        { isNavModalOpen 
          ? 
          (
            <ul id="navLinks">
              <CustomLink to="/mentored-groups" setIsNavModalOpen={setIsNavModalOpen}>Moje skupiny - Mentor</CustomLink>
              <CustomLink to="/participant-groups" setIsNavModalOpen={setIsNavModalOpen}>Moje skupiny - Účastník</CustomLink>
              <CustomLink to="/my-drawn-words" setIsNavModalOpen={setIsNavModalOpen}>Moje vytiahnuté zoznamy</CustomLink>
              <CustomLink to="/hat-themes/browse" setIsNavModalOpen={setIsNavModalOpen}>Verejné klobúky</CustomLink>
              <CustomLink to="/hat-themes/my-hats" setIsNavModalOpen={setIsNavModalOpen}>Moje klobúky</CustomLink>
              <CustomLink to="/create-hat" setIsNavModalOpen={setIsNavModalOpen}>Vytvoriť klobúk</CustomLink>
            </ul>
          ) 
          : 
          <></>
        }
      </nav>
    );
  }else {
    return (
      <nav className="nav">
        <Link to="/" className="site__title">
          PickYourStory
        </Link>
          <ul>
            <CustomLink to="/mentored-groups">Moje skupiny - Mentor</CustomLink>
            <CustomLink to="/participant-groups">Moje skupiny - Účastník</CustomLink>
            <CustomLink to="/my-drawn-words">Moje vytiahnuté zoznamy</CustomLink>
            <CustomLink to="/hat-themes/browse">Verejné klobúky</CustomLink>
            <CustomLink to="/hat-themes/my-hats">Moje klobúky</CustomLink>
            <CustomLink to="/create-hat">Vytvoriť klobúk</CustomLink>
            <ProfileButton/>
          </ul>
      </nav>
    );
  }
};

export default Navbar;

type Props = {
  to: string;
  children: React.ReactNode;
  setIsNavModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
};

function CustomLink({ to, children, setIsNavModalOpen, ...props }: Props) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""} onClick={() => setIsNavModalOpen? setIsNavModalOpen(false) : <></>}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
