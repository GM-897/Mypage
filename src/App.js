import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js'
import { useApi } from './hooks/useApi';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import CodingProfiles from "./components/CodingProfiles/index.js";
import AdminLogin from "./components/Admin/Login";
import AdminDashboard from "./components/Admin/Dashboard";
import ProtectedRoute from "./components/Admin/ProtectedRoute";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`
function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const { data: bio } = useApi('/bio', {});
  const hidden = bio?.hiddenSections || [];

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <>
              <Navbar />
              <Body>
                <HeroSection />
                {(!hidden.includes('skills') || !hidden.includes('experience')) && (
                  <Wrapper>
                    {!hidden.includes('skills') && <Skills />}
                    {!hidden.includes('experience') && <Experience />}
                  </Wrapper>
                )}
                <Wrapper>
                  <CodingProfiles />
                </Wrapper>
                {!hidden.includes('projects') && <Projects openModal={openModal} setOpenModal={setOpenModal} />}
                <Wrapper>
                  {!hidden.includes('education') && <Education />}
                  <Contact />
                </Wrapper>
                <Footer />
                {openModal.state &&
                  <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
                }
              </Body>
            </>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;