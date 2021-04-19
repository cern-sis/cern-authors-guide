import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../Title/Title';

const About = () => {
  // const { about } = useContext(PortfolioContext);
  // const { paragraphOne, paragraphTwo, paragraphThree } = about;

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
    <section id="about">
      <Container>
        <Title title="Publish Guide" />
      </Container>
    </section>
  );
};

export default About;
