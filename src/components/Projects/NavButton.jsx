import React from 'react';
import { WithWizard } from 'react-albus';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Navigation = ({ keyId, title = null }) => (
  <WithWizard
    render={(wizard) => {
      return (
        <Button
          variant="info"
          size="lg"
          style={{ fontSize: '3em', margin: '10px' }}
          className="btn-fluidd"
          onClick={() => {
            if (keyId) {
              wizard.push(keyId);
            }
          }}
        >
          {title || 'Next'}
        </Button>
      );
    }}
  />
);

Navigation.propTypes = {
  keyId: PropTypes.string,
  title: PropTypes.string,
};

export default Navigation;
