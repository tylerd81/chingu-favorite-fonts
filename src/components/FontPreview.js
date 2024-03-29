import React from "react";
import PropTypes from "prop-types";

const FontPreview = ({ font, text }) => {
  const { name, size } = font;

  return (
    <div className="font-preview">
      <div className="font-name">
        {name}
        <span className="add-button">
          <i className="material-icons">control_point</i>
        </span>
      </div>

      <div
        className="text-preview"
        style={{ fontFamily: name, fontSize: size }}
      >
        {text}
      </div>
    </div>
  );
};

FontPreview.propTypes = {
  font: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export default FontPreview;
