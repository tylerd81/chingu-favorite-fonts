import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import FontPreview from "./FontPreview";

const FontList = ({ previewText, fontList, fontSize }) => {
  // create a FontPreview for each one
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // load the fonts in the font list
    fontList.forEach(fontFace => {
      // only load fonts that aren't already loaded
      try {
        // use a try/catch because document.fonts.check() will throw an
        // exception if the exact font isn't found.
        if (!document.fonts.check(`${fontSize} ${fontFace.fontName}`)) {
          const newFont = new FontFace(
            fontFace.fontName,
            `url(${fontFace.fontUrl})`
          );
          document.fonts.add(newFont);
        }
      } catch (e) {
        console.log(`Error loading ${fontFace.fontName}`);
      }
    });

    // wait until all fonts are loaded
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, [fontList]);

  const previews = fontList.map(f => {
    const font = { name: f.fontName, size: fontSize, author: "Arthur Author" };
    if (fontsLoaded) {
      return <FontPreview key={f.fontUrl} font={font} text={previewText} />;
    } else {
      return (
        <div className="font-preview" key={f.fontUrl}>
          <h1>Loading...</h1>
        </div>
      );
    }
  });

  return <div className="font-list">{previews}</div>;
};

FontList.propTypes = {
  previewText: PropTypes.string.isRequired,
  fontList: PropTypes.array.isRequired,
  fontSize: PropTypes.string.isRequired
};

export default FontList;
