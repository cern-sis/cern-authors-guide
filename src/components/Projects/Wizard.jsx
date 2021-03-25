import React, { Fragment, useState } from 'react';

import { Container, Form } from 'react-bootstrap';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// import { BrowserRouter, Route } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import Navigation from './Navigation';
import NavButton from './NavButton';

const JOURNAL_OPTIONS = ['Journal 1', 'Journal 2', 'Journal 3', 'Journal 4'];

const WizardSection = () => {
  // const [isDesktop, setIsDesktop] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  // 	if (window.innerWidth > 769) {
  // 		setIsDesktop(true);
  // 		setIsMobile(false);
  // 	} else {
  // 		setIsMobile(true);
  // 		setIsDesktop(false);
  // 	}
  // }, []);

  const [data, setData] = useState({});
  const skip = ({ step, push }) => {
    switch (step.id) {
      case 'intro': {
        if (data.journal === '-- Other --') push('contactUs');
        else push();
        break;
      }
      default:
        push();
    }
  };
  const onChange = (key, value) => {
    setData({ ...data, ...{ [key]: value } });
  };

  return (
    <section id="wizardSection">
      <Container>
        <div className="project-wrapper">
          <>
            <Wizard onNext={skip}>
              <Steps>
                <Step id="intro">
                  <h1 className="text-align-center">Journal Name or ISSN</h1>
                  <Form.Group>
                    <Typeahead
                      id="basic-typeahead-single"
                      labelKey="name"
                      onChange={(selected) => {
                        onChange('journal', selected);
                      }}
                      options={JOURNAL_OPTIONS}
                      placeholder="Choose a journal..."
                      clearButton
                    />
                    {data &&
                    data.journal &&
                    data.journal.length > 0 &&
                    JOURNAL_OPTIONS.indexOf(data.journal[0]) > -1 ? (
                      <NavButton variant="info" keyId="scoap3_journal" title="Next" />
                    ) : null}

                    <h6>-OR-</h6>
                    <NavButton variant="info" keyId="contactUs" title="Not in the list?" />
                  </Form.Group>
                </Step>
                <Step id="scoap3_journal">
                  <h1 className="text-align-center">Journal is a SCOAP3 journal?</h1>
                  <div>
                    <NavButton variant="info" keyId="journalFullCover" title="Yes" />
                    <NavButton variant="info" keyId="cernAffiliation" title="No" />
                  </div>
                </Step>
                <Step id="journalFullCover">
                  <h1 className="text-align-center">Is journal covered in full?</h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="isHep" title="No" />
                  </div>
                </Step>
                <Step id="isHep">
                  <h1 className="text-align-center">Is article HEP?</h1>
                  <div>
                    <NavButton variant="info" keyId="arxiv" title="Yes" />
                    <NavButton variant="info" keyId="cernAffiliation" title="No" />
                  </div>
                </Step>
                <Step id="arxiv">
                  <h1 className="text-align-center">Remember to deposit in arXiv</h1>
                </Step>
                <Step id="goAhead">
                  <h1 className="text-align-center">Go ahead!</h1>
                </Step>
                <Step id="cernAffiliation">
                  <h1 className="text-align-center">Are you allowed to use CERN affiliation?</h1>
                  <div>
                    <NavButton variant="info" keyId="corresponding" title="Yes" />
                    <NavButton variant="info" keyId="contactUs" title="No" />
                  </div>
                </Step>
                <Step id="corresponding">
                  <h1 className="text-align-center">Journal corresponding?</h1>
                  <div>
                    <NavButton variant="info" keyId="nonCorresponding" title="Yes" />
                    <NavButton variant="info" keyId="contactUs" title="No" />
                  </div>
                </Step>
                <Step id="nonCorresponding">
                  <h1 className="text-align-center">Journal non-corresponding?</h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="correspondingAuthor" title="No" />
                  </div>
                </Step>
                <Step id="correspondingAuthor">
                  <h1 className="text-align-center">Are you corresponding author?</h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="experiment" title="No" />
                  </div>
                </Step>
                <Step id="experiment">
                  <h1 className="text-align-center">Published on behalf of experiment?</h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="EUFunding" title="No" />
                  </div>
                </Step>
                <Step id="EUFunding">
                  <h1 className="text-align-center">Do you benefit from EU funding?</h1>
                  <div>
                    <NavButton variant="info" keyId="EUFundingResult" title="Yes" />
                    <NavButton variant="info" keyId="contactUs" title="No" />
                  </div>
                </Step>
                <Step id="EUFundingResult">
                  <h1 className="text-align-center">
                    Please use your EU grant to pay OA, if questions...
                  </h1>
                </Step>
                <Step id="contactUs">
                  <h1 className="text-align-center">Contact Us</h1>
                </Step>
              </Steps>
              <Navigation />
            </Wizard>
          </>
        </div>
      </Container>
    </section>
  );
};

export default WizardSection;
