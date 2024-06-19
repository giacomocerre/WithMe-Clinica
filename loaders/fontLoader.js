// fontLoader.js
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const loadFonts = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-Black": require("../assets/fonts/Gilroy-Black.ttf"),
    "Gilroy-ExtraBold": require("../assets/fonts/Gilroy-ExtraBold.ttf"),
    "Gilroy-Bold": require("../assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-SemiBold": require("../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Medium": require("../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-Regular": require("../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Thin": require("../assets/fonts/Gilroy-Thin.ttf"),
    "Poetsen": require("../assets/fonts/PoetsenOne-Regular.ttf")
    // Add more fonts if needed
  });

  const onRootFontLoad = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError, onRootFontLoad };
};

export default loadFonts;
