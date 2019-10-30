import React, { useState } from "react";
import PropTypes from "prop-types";

const FontForm = ({
  onPreviewTextChange,
  onFontSearchTextChange,
  onFontSizeChange,
  emptyTextHandler,
  fontSizes,
  reset
}) => {
  const [previewTextInput, setPreviewTextInput] = useState("");
  const [fontSearchText, setFontSearchText] = useState("");

  const fontSizeChanged = e => {
    onFontSizeChange(e.target.value);
  };

  const previewTextChanged = e => {
    setPreviewTextInput(e.target.value);
    onPreviewTextChange(e.target.value);
  };

  const fontSearchTextChanged = e => {
    setFontSearchText(e.target.value);
    onFontSearchTextChange(e.target.value);
  };

  const checkForEmptyText = () => {
    if (previewTextInput === "") {
      emptyTextHandler();
    }
  };

  const resetAll = () => {
    setPreviewTextInput("");
    setFontSearchText("");
    reset();
  };
  return (
    <form className="font-control-form">
      <input
        id="font-search-input"
        type="text"
        onChange={fontSearchTextChanged}
        value={fontSearchText}
        placeholder="Search fonts"
      />
      <input
        id="preview-text-input"
        type="text"
        onBlur={checkForEmptyText}
        onChange={previewTextChanged}
        value={previewTextInput}
        placeholder="Type Something"
      />

      <select id="font-size-select" onChange={fontSizeChanged}>
        {fontSizes.map(fontSize => (
          <option key={fontSize} value={fontSize}>
            {fontSize}
          </option>
        ))}
      </select>

      <button type="button" onClick={resetAll}>
        <i className="material-icons">refresh</i>
      </button>
    </form>
  );
};

FontForm.propTypes = {
  onPreviewTextChange: PropTypes.func.isRequired,
  onFontSearchTextChange: PropTypes.func.isRequired,
  emptyTextHandler: PropTypes.func.isRequired,
  fontSizes: PropTypes.array.isRequired,
  onFontSizeChange: PropTypes.func.isRequired
};

export default FontForm;
