// App.js
import React from "react";
import loadFonts from "./loaders/fontLoader";
import Router from "./router/Router";
import 'react-native-reanimated'

const App = () => {
  const { fontsLoaded, fontError, onRootFontLoad } = loadFonts();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Router loaderRootView={onRootFontLoad}/>
  );
};

export default App;

