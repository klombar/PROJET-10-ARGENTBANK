import PropTypes from "prop-types";
import "./Banner.css"

function Banner({ image }) {
  return (
    <div className="banner">
      <img src={image} alt="Argent Bank" className="banner-image" />
      <div className="banner-article">
         <p className="banner-article-subtitle">No fees.</p>
         <p className="banner-article-subtitle">No minimum deposit.</p>
         <p className="banner-article-subtitle">High interest rates.</p>
         <p className="banner-article-text">Open a savings account with Argent Bank today!</p>
      </div>
    </div>
  );
}

Banner.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Banner;