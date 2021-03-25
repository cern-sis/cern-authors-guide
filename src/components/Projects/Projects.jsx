import React from 'react';
// import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Title from '../Title/Title';
import Wizard from './Wizard';

const Projects = () => {
  // const [isDesktop, setIsDesktop] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   if (window.innerWidth > 769) {
  //     setIsDesktop(true);
  //     setIsMobile(false);
  //   } else {
  //     setIsMobile(true);
  //     setIsDesktop(false);
  //   }
  // }, []);

  return (
    <section id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="Follow the steps" />
          <Wizard />
        </div>
      </Container>
    </section>
  );
};

export default Projects;
