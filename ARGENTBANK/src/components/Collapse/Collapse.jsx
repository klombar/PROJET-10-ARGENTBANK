import "./Collapse.css"
import PropTypes from 'prop-types';

function Collapse({ title, amount, subtitle }) {
  return (
   <div className="collapse">
      <div className="collapse-header">
         <div className="collapse-content">
            <div className="collapse-content-title">{title}</div>
            <div className="collapse-content-amount">{amount}</div>
            <div className="collapse-content-subtitle">{subtitle}</div>
         </div>
         <div className="collapse-chevron">
            <i className="fa-solid fa-chevron-right"></i>
         </div>
      </div>
   </div>
  );
}

Collapse.propTypes = {
   title: PropTypes.string.isRequired,
   amount: PropTypes.string.isRequired,
   subtitle: PropTypes.string.isRequired,
}

export default Collapse;