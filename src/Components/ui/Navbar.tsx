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
              <li onClick={() => setIsNavModalOpen(false)}><CustomLink to="/mentored-groups">Moje skupiny - Mentor</CustomLink></li>
              <li onClick={() => setIsNavModalOpen(false)}><CustomLink to="/participant-groups">Moje skupiny - Účastník</CustomLink></li>
              <li onClick={() => setIsNavModalOpen(false)}><CustomLink to="/my-drawn-words">Moje vytiahnuté zoznamy</CustomLink></li>
              <li onClick={() => setIsNavModalOpen(false)}><CustomLink to="/hat-themes/browse">Verejné klobúky</CustomLink></li>
              <li onClick={() => setIsNavModalOpen(false)}><CustomLink to="/hat-themes/my-hats">Moje klobúky</CustomLink></li>
              <li onClick={() => setIsNavModalOpen(false)}><CustomLink to="/create-hat">Vytvoriť klobúk</CustomLink></li>
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
          Rozprávkový koktejl
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
};

function CustomLink({ to, children, ...props }: Props) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
