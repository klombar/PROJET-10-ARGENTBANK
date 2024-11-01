import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Logo.css';

function Logo({ logo }) {

  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <Link to={isAuthenticated ? "/dashboard" : "/"} className="header-logo">
      <img src={logo} alt="Argent Bank Logo" />
    </Link>
  );
}

export default Logo;

Logo.propTypes = {
   logo: PropTypes.string.isRequired,
 };