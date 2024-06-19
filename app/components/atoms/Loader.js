import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "../../../stylesheets/theme";

const Loader = ({color}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={color ? color : COLORS.main.first} />
    </View>
  );
};

export default Loader;
