import PropTypes from 'prop-types';
import './inputField.css';

function InputField({ label, type, value, onChange}) {
  return (
    <div className="signIn-Modale-Wrapper">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;