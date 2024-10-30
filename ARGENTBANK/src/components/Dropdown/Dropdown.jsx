import React from 'react';
import { useState } from 'react';
import './Dropdown.css';
import PropTypes from 'prop-types';

function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <i onClick={toggleDropdown} className="fa-solid fa-pencil" data-testid="dropdown-icon"></i>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div key={index} className="dropdown-option">
              {option}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Dropdown;