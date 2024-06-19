import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { generateToken } from "../../../../utils/utils";
import { BUTTON, COLORS, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY } from "../../../../stylesheets/theme";
import { CLOUD } from "../../../../services/cloud/dataService";
import { LOCAL } from "../../../../services/disk/dataService";
import { logOut } from "../../../../services/auth/authService";
import { ButtonComponent } from "../../../components/atoms";
import { GoBackTop } from "../../../components/molecules";

const CodeGenerator = ({ navigation }) => {
  const { email } = getAuth().currentUser;
  const token = generateToken();

  const addReference = async () => {
    try {
      await CLOUD.newDoc("users", {
        email: email,
        token: token,
        type: "clinica",
      });

      await CLOUD.newDoc("clinics", { patients: [] });

      const dataToSave = {
        localDataSave: "WithMe-Data",
        email: email,
        token: token.toUpperCase(),
        patients: [],
      };

      await LOCAL.initializeLocalData(dataToSave);

      navigation.navigate("TabNavigator");
    } catch (error) {
      throw error;
    }
  };

  return (
      <ScrollView>
        <GoBackTop action={logOut} text="Esci"/>
        <View>
          <Text style={styles.welcome}>CIAO!</Text>
          <Text style={styles.par}>
            Questa è la tua prima volta. Bene!
            {"\n"}
            {"\n"}Prima di iniziare ad utilizzare 
            <Text style={MAIN_STYLE.textBlueHighlight}>WithMe</Text>
            {"\n"}
            <Text style={MAIN_STYLE.textBlueHighlight}>controlla il codice </Text>
            sotto, ti servirà in futuro per gestire in sicurezza i
            tuoi dati!
          </Text>
        </View>
        <View style={styles.code}>
          <Text
            style={{ fontFamily: FONTS.bold, fontSize: 50, letterSpacing: 10 }}
          >
            {token}
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: TYPOGRAPHY.text.xl,
              textAlign: "center",
            }}
          >
            Non dimenticarti questo codice.
          </Text>
        </View>
        <View
          style={{
            marginTop: 50,
            margin: 20,
          }}
        >
          <ButtonComponent
            buttonStyle={BUTTON.buttonFullBlue}
            textStyle={TEXT.light1}
            action={addReference}
            text="Salva"
          />
        </View>
      </ScrollView>
  );
};

export default CodeGenerator;

const styles = StyleSheet.create({
  welcome: {
    fontFamily: FONTS.black,
    fontSize: TYPOGRAPHY.title.xxl,
    padding: 20,
    marginTop:20
  },
  par: {
    fontFamily: FONTS.regular,
    fontSize: TYPOGRAPHY.text.xl,
    padding: 20,
  },
  code: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    backgroundColor: "#eee",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
});
