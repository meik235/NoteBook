import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  return (
    <div>
      <h2 className="display-6">{props.title}</h2>
    </div>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: "Add your Header Name",
};
