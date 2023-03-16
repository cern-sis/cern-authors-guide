import React, { Fragment, useState } from 'react';

import { Container, Form } from 'react-bootstrap';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// import { BrowserRouter, Route } from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Wizard, Steps, Step } from 'react-albus';
import { useStaticQuery, graphql } from 'gatsby';
import { CheckCircleFill } from 'react-bootstrap-icons';
import Navigation from './Navigation';
import NavButton from './NavButton';

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
  // let data = props && props.dassta && props.dssata.allJournalListAuthorToolXlsxSheet1.nodes;
  // const journals = data && data.allJournalListAuthorToolXlsxSheet1 && data.allJournalListAuthorToolXlsxSheet1.nodes;
  const data = useStaticQuery(
    graphql`
      query {
        allJournalListAuthorToolXlsxSheet1 {
          nodes {
            Corresponding
            High_Cost
            id
            Short_Name
            SCOAP3
            Publisher
            Non_corresponding
            Name
            ISSN_web
            ISSN_print
            Experiment
          }
          totalCount
        }
      }
    `
  );
  const journals =
    data &&
    data.allJournalListAuthorToolXlsxSheet1 &&
    data.allJournalListAuthorToolXlsxSheet1.nodes;
  journals.sort((a, b) => {
    if (a.Name < b.Name) return -1;
    if (a.Name > b.Name) return 1;
    return 0;
  });
  // const journals = JOURNAL_OPTIONS;

  const [content, setContent] = useState({});
  const skip = ({ step, push }) => {
    switch (step.id) {
      case 'intro': {
        if (content.journal === '-- Other --') push('contactUs');
        else {
          push();
        }
        break;
      }
      default: {
        push();
      }
    }
  };
  const onChange = (key, value) => {
    if (value && value.length && value.length > 0) {
      setContent({ ...content, ...{ [key]: value[0] } });
    } else {
      setContent({ ...content, ...{ [key]: null } });
    }
  };

  const getJournalNext = (journal) => {
    let nextKey = 'scoap3_journal';
    if (journal.SCOAP3 === 'FULL') nextKey = 'goAhead';
    else if (journal.SCOAP3 === 'NO') nextKey = 'cernAffiliation';
    else if (journal.SCOAP3 === 'PARTIAL') nextKey = 'isHep';
    return <NavButton variant="info" keyId={nextKey} title="No" />;
  };

  const getAffiliationNext = (journal) => {
    let nextKey = 'contactUs';
    if (journal.Corresponding) {
      if (journal.Non_corresponding) {
        nextKey = 'goAhead';
      } else nextKey = 'correspondingAuthor';
    } else if (!journal.Corresponding) {
      if (journal.High_Cost) {
        nextKey = 'contactUs13';
      } else {
        nextKey = 'contactUs11';
      }
    }
    return <NavButton variant="info" keyId={nextKey} title="Yes" />;
  };

  const getCorrespondingAuthorNext = (journal) => {
    let nextKey = 'EUFunding';
    if (journal.Experiment) {
      nextKey = 'experiment';
    }
    return <NavButton variant="info" keyId={nextKey} title="No" />;
  };

  return (
    <section id="wizardSection">
      <Container>
        <div className="project-wrapper">
          <>
            <Wizard onNext={skip}>
              <Steps>
                <Step id="intro">
                  <h1 className="text-align-center">Enter the journal name or ISSN:</h1>
                  <Form.Group>
                    <Typeahead
                      id="basic-typeahead-single"
                      size="lg"
                      labelKey={(option) => {
                        return `${option.Name}${
                          option.Short_Name ? `(${option.Short_Name})` : ''
                        }, Publisher: ${option.Publisher}${
                          option.ISSN_web ? `, ISSN Online: ${option.ISSN_web}` : ''
                        }${option.ISSN_print ? `, ISSN Print: ${option.ISSN_print}` : ''}`;
                      }}
                      onChange={(selected) => onChange('journal', selected)}
                      options={journals}
                      placeholder="Journal or ISSN"
                      clearButton
                    />
                    <NavButton variant="info" keyId="is_conference" title="Next" />

                    <h6>-OR-</h6>
                    <NavButton variant="info" keyId="contactUs" title="Not in the list?" />
                  </Form.Group>
                </Step>
                <Step id="scoap3_journal">
                  <h1 className="wizard-text text-align-center">Journal is a SCOAP3 journal?</h1>
                  <div>
                    <NavButton variant="info" keyId="journalFullCover" title="Yes" />
                    <NavButton variant="info" keyId="cernAffiliation" title="No" />
                  </div>
                </Step>
                <Step id="is_conference">
                  <h1 className="wizard-text text-align-center">
                    Is the paper that you plan to submit a conference paper?
                  </h1>
                  <div>
                    <NavButton variant="info" keyId="contactUs14" title="Yes" />
                    {content && content.journal ? getJournalNext(content.journal) : null}
                  </div>
                </Step>
                <Step id="journalFullCover">
                  <h1 className="wizard-text text-align-center">Is journal covered in full?</h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="isHep" title="No" />
                  </div>
                </Step>
                <Step id="isHep">
                  <h1 className="wizard-text text-align-center">
                    Will your article be submitted to arXiv.org in one of the HEP categories
                    (hep-ex, hep-lat, hep-ph, hep-th) before publication in the journal?
                  </h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="cernAffiliation" title="No" />
                  </div>
                </Step>
                <Step id="arxiv">
                  <h1 className="wizard-text text-align-center">Remember to deposit in arXiv</h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                  </div>
                </Step>
                <Step id="goAhead">
                  <h1 style={{ margin: '0' }} className="wizard-text text-align-center">
                    Your article will be automatically covered by one of the CERN Open Access
                    agreements. You do not have to do anything special to benefit from the central
                    CERN support.
                    <div>
                      <CheckCircleFill style={{ margin: '20px' }} size={48} color="green" />
                    </div>
                  </h1>
                </Step>
                <Step id="cernAffiliation">
                  <h1 className="wizard-text text-align-center">
                    Is there in the author list any CERN staff member or fellow or anyone allowed to
                    use the CERN affiliation (
                    <a
                      target="_blank"
                      href="https://scientific-info.cern/practical-information/glossary/cern-author"
                      rel="noreferrer"
                    >
                      see here
                    </a>
                    )?
                  </h1>
                  <div>
                    {content && content.journal && getAffiliationNext(content.journal)}
                    <NavButton variant="info" keyId="contactUs12" title="No" />
                  </div>
                </Step>
                <Step id="corresponding">
                  <h1 className="wizard-text text-align-center">Journal corresponding?</h1>
                  <div>
                    <NavButton variant="info" keyId="nonCorresponding" title="Yes" />
                    <NavButton variant="info" keyId="contactUs" title="No" />
                  </div>
                </Step>
                <Step id="nonCorresponding">
                  <h1 className="wizard-text text-align-center">Journal non-corresponding?</h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="correspondingAuthor" title="No" />
                  </div>
                </Step>
                <Step id="correspondingAuthor">
                  <h1 className="wizard-text text-align-center">
                    Is the corresponding author of this article a CERN staff member or fellow or
                    allowed to use the CERN affiliation (
                    <a href="https://scientific-info.cern/practical-information/glossary/cern-author">
                      see here
                    </a>
                    )?
                  </h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    {content && content.journal && getCorrespondingAuthorNext(content.journal)}
                  </div>
                </Step>
                <Step id="experiment">
                  <h1 className="wizard-text text-align-center">
                    Is this article published by or on behalf of an official CERN experiment?
                  </h1>
                  <div>
                    <NavButton variant="info" keyId="goAhead" title="Yes" />
                    <NavButton variant="info" keyId="EUFunding" title="No" />
                  </div>
                </Step>
                <Step id="EUFunding">
                  <h1 className="wizard-text text-align-center">
                    Does any of the authors benefit from funding from the European Commission?
                  </h1>
                  <div>
                    <NavButton variant="info" keyId="EUFundingResult" title="Yes" />
                    <NavButton variant="info" keyId="contactUs11" title="No" />
                  </div>
                </Step>
                <Step id="EUFundingResult">
                  <h1 className="wizard-text text-align-center">
                    Articles resulting from an EC-funded project have to be published Open Access.
                    The project budget might foresee a publication budget but not all articles are
                    eligible according to the Horizon Europe rules. In case of questions, please
                    contact us at{' '}
                    <a href="mailto:open-access-questions@cern.ch">open-access-questions@cern.ch</a>
                    .
                  </h1>
                </Step>
                <Step id="contactUs">
                  <h1 className="wizard-text text-align-center">
                    Please reach out to us to get detailed advice on how to publish open access:{' '}
                    <a href="mailto:open-access-questions@cern.ch">open-access-questions@cern.ch</a>
                    .
                  </h1>
                </Step>
                <Step id="contactUs12">
                  <h1 className="wizard-text text-align-center">
                    Your article is most likely not eligible for CERN central funding, but please
                    reach out to us to get detailed advice on how to publish open access:{' '}
                    <a href="mailto:open-access-questions@cern.ch">open-access-questions@cern.ch</a>
                    .
                  </h1>
                </Step>
                <Step id="contactUs11">
                  <h1 className="wizard-text text-align-center">
                    Your article is eligible to be covered by the CERN central fund under certain
                    conditions. Please reach out to us in advance of the submission to confirm your
                    eligibility:{' '}
                    <a href="mailto:open-access-questions@cern.ch">open-access-questions@cern.ch</a>
                    .
                  </h1>
                </Step>
                <Step id="contactUs13">
                  <h1 className="wizard-text text-align-center">
                    Your article is eligible to be covered by the CERN central fund, but given the
                    high-cost of the APCs for the selected journal, your article needs to be
                    approved by the Director of Computing and Research. Please reach out to us in
                    advance of the submission:{' '}
                    <a href="mailto:open-access-questions@cern.ch">open-access-questions@cern.ch</a>
                    .
                  </h1>
                </Step>
                <Step id="contactUs14">
                  <h1 className="wizard-text text-align-center">
                    The CERN Open Access policy does not cover conference proceedings. So the Open
                    Access fees cannot be covered centrally for this paper. If you want to publish
                    it in Open Access, you need to identify other funds. Otherwise, we suggest you
                    to publish it under the subscription model, and have the preprint made available
                    on CDS. Please note that we have exceptions for papers published in special
                    issues with selected and peer-reviewed conference contributions. if it is the
                    case, please contact us:{' '}
                    <a href="mailto:open-access-questions@cern.ch">open-access-questions@cern.ch</a>
                    .
                  </h1>
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
