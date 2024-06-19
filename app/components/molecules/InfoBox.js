import { Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../atoms/Icon";

const InfoBox = ({boxStyle, action, text, textStyle, icon  }) => {
    const handlePress = () => {
        if (action) {
          action();
        }
      };
  return (
    <TouchableOpacity style={boxStyle} onPress={handlePress}>
        {icon ? <Icon iconSet={icon.iconSet} icon={icon.icon} color={icon.color} size={icon.size}/> : null }
        <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default InfoBox;

