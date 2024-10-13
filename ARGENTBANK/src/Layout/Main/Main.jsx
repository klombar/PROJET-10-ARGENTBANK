import PropTypes from 'prop-types';

function Main({ children }) {
  return <div>{children}</div>;
}

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;