import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects as fallbackProjects } from '../../data/constants'
import { useApi } from '../../hooks/useApi'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle] = useState('all');
  const { data, loading } = useApi('/projects', fallbackProjects);
  const projects = data || fallbackProjects;

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. Here are some of my projects.
        </Desc>
        <CardContainer>
          {!loading && toggle === 'all' && projects
            .map((project) => (
              <ProjectCard key={project._id || project.id} project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {!loading && toggle !== 'all' && projects
            .filter((item) => item.category === toggle)
            .map((project) => (
              <ProjectCard key={project._id || project.id} project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects