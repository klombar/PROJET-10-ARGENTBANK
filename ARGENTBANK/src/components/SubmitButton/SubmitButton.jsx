import PropTypes from 'prop-types';
import './SubmitButton.css';

function SubmitButton({ value }) {
  return (
    <>
      <input type="submit" value={value} id='signIn-Modale-Submit'/>
    </>
  );
}

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SubmitButton;