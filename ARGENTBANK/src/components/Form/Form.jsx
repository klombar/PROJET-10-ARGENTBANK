import React from "react";
import "./Form.css";
import PropTypes from "prop-types";

function Form({ children, handleSubmit , className}) {
  return (
    <form className={className} onSubmit={handleSubmit} data-testid="form">
      {children}
    </form>
  );
}

Form.propTypes={
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
}

export default Form;