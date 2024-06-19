import { View, Text, ScrollView, StyleSheet, TextInput, } from "react-native";
import React, { useState } from "react";
import { ButtonComponent } from "../../../../components/atoms";
import { GoBackTop } from "../../../../components/molecules";
import { CLOUD } from "../../../../../services/cloud/dataService";
import { LOCAL } from "../../../../../services/disk/dataService";
import {
  BUTTON,
  COLORS,
  FONTS,
  TEXT,
  TYPOGRAPHY,
  UI,
} from "../../../../../stylesheets/theme";
import Loader from "../../../../components/atoms/Loader";

const CodeRecovery = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [error, isError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTokenChange = (token) => {
    setToken(token);
  };

  const addLocalData = async () => {
    isError(false);
    setLoading(true);
    if (await CLOUD.tokenExist(token.toUpperCase())) {
      const dataToSave = {
        localDataSave: "WithMe-Data",
        email: CLOUD.getEmail(),
        token: token.toUpperCase(),
        patients: [],
      };

      await LOCAL.initializeLocalData(dataToSave);
      setLoading(false);
      navigation.navigate("TabNavigator");
    } else {
      setLoading(false);
      isError(true);
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps="never"
    >
      <GoBackTop action={() => navigation.goBack()} />
      <View style={UI.distances}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: TYPOGRAPHY.title.l,
            marginTop: 30,
            marginBottom: 60,
          }}
        >
          Inserisci il tuo codice che è stato fornito alla registrazione 👇
        </Text>
        <Text style={{marginLeft:25}}>Inserici qua il codice</Text>
        <View style={styles.code}>
          <TextInput onChangeText={handleTokenChange} style={{ textTransform:'uppercase', fontFamily: FONTS.bold, fontSize: 50, letterSpacing: 10, }} placeholder="CODICE" value={token.toUpperCase()}
/>
        </View>
        
        {loading ? (
          <Loader/>
        ) : (
          <ButtonComponent
            action={addLocalData}
            text="Aggiungi"
            buttonStyle={BUTTON.buttonFullBlue}
            textStyle={TEXT.light1}
          />
        )}
        {error ? (
          <View style={{backgroundColor: COLORS.error, borderRadius:10, marginTop:10, padding:5}}>
            <Text style={{ color: "red", fontSize: TYPOGRAPHY.text.m, textAlign:"center", color:COLORS.light.first }}>
              Il codice inserito non corrisponde a questo account
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default CodeRecovery;

const styles = StyleSheet.create({
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
