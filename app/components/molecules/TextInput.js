import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from "../atoms/Icon";
import { COLORS, FONTS, TYPOGRAPHY } from "../../../stylesheets/theme";

const TextInputComponent = ({
  icon,
  placeholder,
  onTextChange,
  secureText,
  color,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (inputText) => {
    setText(inputText);
    onTextChange(inputText);
  };

  return (
    <View
      style={
        isFocused
          ? styles(color.normal, color.focus).containerFocus
          : styles(color.normal, color.focus).container
      }
    >
      {error ? (
        <Text
          style={{
            position: "absolute",
            top: 15,
            left: 5,
            color: COLORS.error,
          }}
        >
          *
        </Text>
      ) : null}
      <Icon
        pressable={icon.pressable}
        icon={icon.name}
        size={icon.size}
        color={isFocused ? color.focus : color.normal}
      />
      <TextInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor={isFocused ? color.focus : color.normal}
        style={[
          isFocused
            ? styles(color.normal, color.focus).inputTextFocus
            : styles(color.normal, color.focus).inputText,
        ]}
        value={text}
        placeholder={placeholder}
        secureTextEntry={secureText}
        autoCapitalize="none"
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const styles = (normal, focus) =>
  StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      borderBlockColor: normal,
      flexDirection: "row",
      width: "100%",
      padding: 20,
      borderBottomWidth: 1,
      marginTop: 15,
    },
    containerFocus: {
      backgroundColor: "transparent",
      borderBlockColor: focus,
      flexDirection: "row",
      width: "100%",
      padding: 20,
      borderBottomWidth: 1,
      marginTop: 15,
    },
    inputText: {
      fontFamily: FONTS.regular,
      color: normal,
      fontSize: TYPOGRAPHY.text.s,
      width: "73%",
      marginLeft: 20,
      alignSelf: "center",
    },
    inputTextFocus: {
      fontFamily: FONTS.regular,
      color: focus,
      fontSize: TYPOGRAPHY.text.m,
      width: "73%",
      marginLeft: 20,
      alignSelf: "center",
    },
  });

export default TextInputComponent;
