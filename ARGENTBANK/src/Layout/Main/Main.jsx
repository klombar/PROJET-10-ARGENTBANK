import PropTypes from 'prop-types';

function Main({ children }) {
  return <div className='main'>{children}</div>;
}

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;