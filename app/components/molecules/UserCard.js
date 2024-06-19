import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, TYPOGRAPHY } from "../../../stylesheets/theme";
import { Icon } from "../atoms";

const UserCard = ({ patient, action }) => {

  const handlerAction = () => {
    action ? action(): null;
  }

  return (
    <TouchableOpacity onPress={handlerAction}>
    <View>
      <View style={styles.card}>
      <Text style={styles.token}>#{patient.token}</Text>
      <View style={{ flexDirection: "row" }}>
        <Icon icon="person-circle-outline" size={70} color={COLORS.main.first} />
        <View style={{marginTop:20, marginLeft:10}}>
          <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.m }}
          >
            {patient.name}
          </Text>
          <Text style={{ fontFamily: FONTS.medium, fontSize: TYPOGRAPHY.text.l }}>{patient.surname}</Text>
        </View>
      </View>
      <View style={{position:"absolute", right:40, top:60}}>
        <Icon icon="arrow-forward-circle-outline" size={30} color={COLORS.main.first}/>
        </View>
    </View>
    </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: COLORS.light.first,
    borderRadius: 20,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 35
  },
  token: {
    textAlign: "right",
    fontSize: TYPOGRAPHY.text.s,
    fontFamily: FONTS.black,
    color: COLORS.main.first,
  },
});
