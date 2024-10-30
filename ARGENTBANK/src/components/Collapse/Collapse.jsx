import React from "react";
import "./Collapse.css";
import PropTypes from 'prop-types';
import { useState } from "react";
import Button from "../../components/Button/Button"; 

function Collapse({ title, amount, subtitle, date, className, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse">
      <div className="collapse-header">
        <div className={className}>
          <div className="collapse-content-date">{date}</div>
          <div className="collapse-content-title">{title}</div>
          <div className="collapse-content-amount">{amount}</div>
          <div className="collapse-content-subtitle">{subtitle}</div>
        </div>
        <Button 
          value={isOpen ? "Cancel" : "View Transactions"} 
          onClick={toggleCollapse} 
          className="collapse-button" 
        />
      </div>
      {isOpen && (
        <div className="collapse-content">
          {children}
        </div>
      )}
    </div>
  );
}

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  date: PropTypes.string,
  className: PropTypes.string,
};

export default Collapse;