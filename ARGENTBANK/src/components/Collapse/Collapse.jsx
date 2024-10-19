import "./Collapse.css";
import PropTypes from 'prop-types';
import { useState } from "react";
import Button from "../../components/Button/Button"; // Assure-toi que le chemin est correct

function Collapse({ title, amount, subtitle, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapse">
      <div className="collapse-header">
        <div className="collapse-content">
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
};

export default Collapse;