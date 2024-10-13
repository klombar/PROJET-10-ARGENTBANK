import PropTypes from 'prop-types';
import './Checkbox.css';

function Checkbox({ label, checked, onChange }) {
  return (
    <div className="signIn-Modale-RememberMe-wrapper">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;