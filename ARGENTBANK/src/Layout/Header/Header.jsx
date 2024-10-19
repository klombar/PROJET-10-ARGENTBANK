import PropTypes from 'prop-types';
import Logo from '../../components/Logo/Logo.jsx';
import logoImage from '../../assets/img/argentBankLogo-compressed.webp';
import "./Header.css"
import Nav from '../../components/Nav/Nav.jsx';

function Header() {
  return (
    <header id="header">
        <Logo logo={logoImage} />
        <Nav />
    </header>
  );
}

Header.propTypes = {
  logo: PropTypes.string,
};

export default Header;