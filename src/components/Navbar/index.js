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
  const hidden = bio?.hiddenSections || [];

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
          {!hidden.includes('skills') && <NavLink href='#skills'>Skills</NavLink>}
          {!hidden.includes('experience') && <NavLink href='#experience'>Experience</NavLink>}
          {!hidden.includes('projects') && <NavLink href='#projects'>Projects</NavLink>}
          {!hidden.includes('education') && <NavLink href='#education'>Education</NavLink>}
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">Github Profile</GitHubButton>
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
            {!hidden.includes('skills') && <MobileLink href='#skills' onClick={() => setIsOpen(false)}>Skills</MobileLink>}
            {!hidden.includes('experience') && <MobileLink href='#experience' onClick={() => setIsOpen(false)}>Experience</MobileLink>}
            {!hidden.includes('projects') && <MobileLink href='#projects' onClick={() => setIsOpen(false)}>Projects</MobileLink>}
            {!hidden.includes('education') && <MobileLink href='#education' onClick={() => setIsOpen(false)}>Education</MobileLink>}
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