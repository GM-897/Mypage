import React from 'react'
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent'
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { Bio } from '../../data/constants';
import { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();
  const { data: bio } = useApi('/bio', {});
  const { data: sectionStatus } = useApi('/section-status', null);
  const hidden = bio?.hiddenSections || [];

  // Returns true only if the section is not manually hidden AND has at least one item.
  // While sectionStatus is still loading (null), defaults to true so links don't flicker away.
  const show = (key) => !hidden.includes(key) && (sectionStatus === null || sectionStatus[key] === true);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='/'>
          <div style={{ display: "flex", alignItems: "center", color: "white", cursor: 'pointer' }}>
            <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
          </div>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          {show('skills')       && <NavLink href='#skills'>Skills</NavLink>}
          {show('experience')   && <NavLink href='#experience'>Experience</NavLink>}
          {show('achievements') && <NavLink href='#achievements'>Achievements</NavLink>}
          {show('projects')     && <NavLink href='#projects'>Projects</NavLink>}
          {show('education')    && <NavLink href='#education'>Education</NavLink>}
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">Github</GitHubButton>
          <GitHubButton href={Bio.linkedin} target="_blank">LinkedIn</GitHubButton>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8, color: theme.text_secondary, textDecoration: 'none', fontSize: 14, opacity: 0.7, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
            <MdOutlineAdminPanelSettings size="1.2rem" /> Admin Panel
          </Link>
        </ButtonContainer>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink href="#about" onClick={() => setIsOpen(false)}>About</MobileLink>
            {show('skills')       && <MobileLink href='#skills'       onClick={() => setIsOpen(false)}>Skills</MobileLink>}
            {show('experience')   && <MobileLink href='#experience'   onClick={() => setIsOpen(false)}>Experience</MobileLink>}
            {show('achievements') && <MobileLink href='#achievements' onClick={() => setIsOpen(false)}>Achievements</MobileLink>}
            {show('projects')     && <MobileLink href='#projects'     onClick={() => setIsOpen(false)}>Projects</MobileLink>}
            {show('education')    && <MobileLink href='#education'    onClick={() => setIsOpen(false)}>Education</MobileLink>}
            <GitHubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href={Bio.github} target="_blank">Github</GitHubButton>
            <GitHubButton style={{padding: '10px 16px',background: `${theme.primary}`, color: 'white',width: 'max-content'}} href={Bio.linkedin} target="_blank">LinkedIn</GitHubButton>
            <Link to="/admin" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: theme.text_secondary, textDecoration: 'none', fontSize: 14 }}>
              <MdOutlineAdminPanelSettings size="1.2rem" /> Admin Panel
            </Link>
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar