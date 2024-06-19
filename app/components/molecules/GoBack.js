import { Text, View } from "react-native";
import React from "react";
import { COLORS, MAIN_STYLE } from "../../../stylesheets/theme";
import Icon from "../atoms/Icon";

const GoBackTop = ({action, text}) => {
  return (
    <View style={MAIN_STYLE.goBackTop}>
      <Icon
        action={action}
        icon="chevron-back"
        size={30}
        color={COLORS.light.first}
        text={text}
      />
    </View>
  );
};

export default GoBackTop;
