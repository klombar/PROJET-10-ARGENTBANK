import PropTypes from 'prop-types';

function Main({ children, className }) {
  return (
  <div className={className}>
    {children}
    </div>
    );
}

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Main;