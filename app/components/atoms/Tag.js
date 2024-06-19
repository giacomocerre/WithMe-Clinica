import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS, TYPOGRAPHY } from "../../../stylesheets/theme";

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Tag = ({ tag, value }) => {
  const capitalizedTag = capitalize(tag);

  return (
    <View style={styles.tag}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.key}>
          <Text style={styles.keyText}>{capitalizedTag}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 20,
    width: "100%",
  },

  key: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.main.first,
    padding: 10,
    width: 110,
  },
  keyText: {
    fontFamily: FONTS.bold,
    color: COLORS.light.first,
    fontSize: TYPOGRAPHY.text.xl,
  },

  value: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: COLORS.light.first,
    padding: 10,
    width: 200,
  },

  valueText: {
    fontFamily: FONTS.bold,
    color: COLORS.dark.first,
    fontSize: TYPOGRAPHY.text.xl,
  },
});
