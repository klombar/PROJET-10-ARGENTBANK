import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './Logo.css';

function Logo({ logo }) {
  return (
    <Link to="/" className="header-logo">
      <img src={logo} alt="Argent Bank Logo" />
    </Link>
  );
}

export default Logo;

Logo.propTypes = {
   logo: PropTypes.string.isRequired,
 };