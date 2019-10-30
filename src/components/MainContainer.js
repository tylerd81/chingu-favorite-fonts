import React from "react";
import PropTypes from "prop-types";

const MainContainer = ({ children }) => {
  return <div className="main-container">{children}</div>;
};

MainContainer.propTypes = {
  children: PropTypes.array.isRequired
};

export default MainContainer;
