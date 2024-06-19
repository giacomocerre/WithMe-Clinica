import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { logOut } from "../../../../../services/auth/authService";
import { BUTTON, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from "../../../../../stylesheets/theme";
import { ButtonComponent } from "../../../../components/atoms";
import { GoBackTop } from "../../../../components/molecules";

const Recovery = ({ navigation }) => {
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='never'>
      <GoBackTop action={logOut} text="Esci"/>
      <View style={UI.distances}>
        <Text style={{fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl, marginTop:30, marginBottom:30}}>Abbiamo trovato il tua account! 🎉</Text>
        <Text style={{fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.m}}>Ma purtroppo non riusciamo a trovare i tuoi dati su questo dispositivo. 😔</Text>
        <Text style={{fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.text.xl, marginTop:30}}>Se vuoi procedere senza i tuoi dati precedenti, <Text style={MAIN_STYLE.textBlueHighlight}>inserisci solo il codice fornito</Text> durante la registrazione.</Text>
        <Text style={{fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.text.xl, marginTop:10, marginBottom: 70}}>Altrimenti, se hai eseguito un <Text style={MAIN_STYLE.textBlueHighlight}>backup</Text> puoi caricarlo.</Text>
        <ButtonComponent action={() => navigation.navigate("BackupRecovery")} text="Si, ho un backup" buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1}/>
        <ButtonComponent action={() =>  navigation.navigate("CodeRecovery")} text="No, non ho un backup" buttonStyle={BUTTON.buttonOutlineBlue} textStyle={TEXT.blue1}/>
      </View>
    </ScrollView>
  );
};

export default Recovery;


const styles = StyleSheet.create({});