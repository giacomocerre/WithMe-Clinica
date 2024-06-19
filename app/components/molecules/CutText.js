import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, TYPOGRAPHY } from "../../../stylesheets/theme";
import { LinearGradient } from "expo-linear-gradient";

const CutText = ({ text, lines, indicator }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  return (
    <Pressable onPress={toggleExpansion} style={styles.mainContent}>
      <View style={styles.textContent}>
      <Text style={{position:"relative", left:20, top:12, color:COLORS.main.first, fontFamily:FONTS.black}}>{indicator}</Text>

        <Text numberOfLines={!expanded ? lines : null} style={styles.text}>
          {text}
        </Text>
        {!expanded && (
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            style={styles.shader}
          />
        )}
      </View>
    </Pressable>
  );
};

export default CutText;

const styles = StyleSheet.create({
  mainContent: {
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  textContent: {
    position: "relative",
    backgroundColor: COLORS.light.first,
    bottom: 15,
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 10,
    overflow: "hidden",
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: TYPOGRAPHY.paragraph,
    padding: 20,
  },

  shader: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
});
