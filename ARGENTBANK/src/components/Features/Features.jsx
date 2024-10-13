import "./Features.css";
import PropTypes from "prop-types";

function Features({ icon, title, text }) {
  return (
    <div className="features">
      <img src={icon} alt="" />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

Features.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Features;