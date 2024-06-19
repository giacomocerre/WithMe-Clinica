import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, } from "../../../stylesheets/theme";
import { ButtonComponent, Icon } from "../atoms";

const SearchBox = ({ onSearch, placeholder, searchTerm }) => {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (text) => {
    setInputText(text);
    onSearch(text);
  };

  const handleClearClick = () => {
    setInputText("")
    handleInputChange("");
  };

  return (
    <View style={{alignItems:"center", width:"100%", borderRadius:100, marginVertical:20, borderColor:COLORS.light.second}}>
        <View style={{flexDirection:"row", width:"100%", borderRadius:100, borderColor:COLORS.light.second, borderWidth:1, position:"relative"}}>
            <View style={{flexDirection:"row", paddingHorizontal:5}}>
              <TextInput
                  ref={inputRef}
                  style={{width:"100%",padding:10, color:COLORS.dark.first}}
                  onChangeText={handleInputChange}
                  value={inputText}
                  placeholder={placeholder}
                  placeholderTextColor={COLORS.light.third}
                />
                <View style={{position:"absolute", right:10, top:5}}>
                <Icon icon="search" size={25} />
                </View>
                {inputText &&
                <TouchableOpacity onPress={handleClearClick} style={{position:"absolute", right:40, top:5}}>
                  <Icon icon="close" size={25} color={COLORS.main.first} />
                </TouchableOpacity>
            }
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default SearchBox;
