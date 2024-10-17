import PropTypes from 'prop-types';
import './Button.css';

function Button({ value, onClick, className}) {
  return (
    <input type="button" value={value} onClick={onClick} className={className} />
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;