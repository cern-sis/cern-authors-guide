import React from 'react';
import { WithWizard } from 'react-albus';
import { Button } from 'react-bootstrap';

const Navigation = () => (
  <WithWizard
    render={({ previous, step, steps }) => (
      <div className="example-buttons">
        {steps.indexOf(step) > 0 && (
          <Button className="btn-fluid btn-secondary" onClick={previous}>
            Back
          </Button>
        )}
      </div>
    )}
  />
);

export default Navigation;
