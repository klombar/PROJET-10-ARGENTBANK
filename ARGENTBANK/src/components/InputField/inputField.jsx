import PropTypes from 'prop-types';
import './InputField.css';
import React from 'react';

function InputField({ id, label, type, value, onChange, className, disabled}) {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        data-testid="input-field"
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
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
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool, 
};

export default InputField;