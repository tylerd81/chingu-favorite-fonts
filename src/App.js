import React, { useState, useEffect } from "react";

import "./App.css";
import MainContainer from "./components/MainContainer";
import FontList from "./components/FontList";
import FontForm from "./components/FontForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const apiKey = "AIzaSyCdk_8pgwgy6D6rdEuaT5W8fIOy0wFLf9E";
  const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${apiKey}`;

  const defaultText = "Then came the night of the first falling star.";

  const [previewText, setPreviewText] = useState(defaultText);
  const fontSizes = ["16px", "24px", "32px", "48px"];
  const [fontSize, setFontSize] = useState(fontSizes[0]);
  const [fontIndex, setFontIndex] = useState(10);
  const [fontList, setFontList] = useState([]);
  const [currentFontList, setCurrentFontList] = useState([]);
  const numberOfFontsToLoad = 10;

  useEffect(() => {
    // initialize fonts for the first time

    const loadFonts = async () => {
      const googleFonts = [];
      const response = await fetch(apiUrl);
      const data = await response.json();

      // convert the JSON data returned from Google into easier to manage objects.
      // remove the data that isn't really needed for this app.
      data.items.forEach(item => {
        const font = {
          fontName: item.family,
          fontUrl: item.files.regular
        };
        googleFonts.push(font);
      });

      // fontList holds all the fonts and doesn't change
      setFontList(googleFonts);

      // currentFontList holds the filtered set of fonts and changes
      // when the user enters a query.
      setCurrentFontList(googleFonts);
    };
    loadFonts();
  }, []);

  const resetAll = () => {
    setPreviewText(defaultText);
    setFontSize(fontSizes[0]);
    setFontIndex(10);
    setCurrentFontList(fontList);
  };

  const previewTextChange = text => {
    setPreviewText(text);
  };

  const fontSearchTextChange = text => {
    if (text === "") {
      // reset the font list.
      setCurrentFontList(fontList);
    } else {
      // filter the fonts using the user's query
      setCurrentFontList(
        fontList.filter(font =>
          font.fontName.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
    setFontIndex(numberOfFontsToLoad);
  };

  const resetText = () => {
    setPreviewText(defaultText);
  };

  const loadMoreFonts = () => {
    // only load a certain number of fonts at a time
    setFontIndex(fontIndex + numberOfFontsToLoad);
  };

  const fontSizeChange = size => setFontSize(size);

  return (
    <div>
      <Navbar />
      <MainContainer>
        <FontForm
          onPreviewTextChange={previewTextChange}
          onFontSearchTextChange={fontSearchTextChange}
          emptyTextHandler={resetText}
          fontSizes={fontSizes}
          onFontSizeChange={fontSizeChange}
          reset={resetAll}
        />
        <FontList
          previewText={previewText}
          fontList={currentFontList.slice(0, fontIndex)}
          fontSize={fontSize}
        />

        {fontIndex < currentFontList.length ? (
          <div className="load-more-button">
            <button type="button" onClick={loadMoreFonts}>
              Load More
            </button>
          </div>
        ) : (
          <h2 className="no-more-results">No More Results</h2>
        )}
      </MainContainer>
      <div id="top-link">
        <a href="#top">
          <div>
            <i className="material-icons">arrow_upward</i>
          </div>
          Top
        </a>
      </div>
      <Footer />
    </div>
  );
}

export default App;
