import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

function Checkbox({ id, label, checked, onChange }) {
  return (
    <div className="signIn-Modale-RememberMe-wrapper">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;