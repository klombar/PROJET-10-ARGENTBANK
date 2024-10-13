import PropTypes from 'prop-types';
import Logo from '../../components/Logo/Logo.jsx';
import logoImage from '../../assets/img/argentBankLogo-compressed.webp';
import connectedLogoImage from '../../assets/img/logoConnected.png';
import "./Header.css"
import Nav from '../../components/Nav/Nav.jsx';
import { useSelector } from 'react-redux';

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  return (
    <header id="header">
        <Logo logo={isAuthenticated ? `${connectedLogoImage}` : `${logoImage}`} />
        <Nav />
    </header>
  );
}

Header.propTypes = {
  logo: PropTypes.string,
};

export default Header;