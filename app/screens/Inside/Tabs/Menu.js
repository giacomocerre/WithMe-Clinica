import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { COLORS, FONTS, INFOBOX, TYPOGRAPHY, UI } from "../../../../stylesheets/theme";
import { LOCAL } from "../../../../services/disk/dataService";
import { CLOUD } from "../../../../services/cloud/dataService";
import { Icon } from "../../../components/atoms";
import { InfoBox } from "../../../components/molecules";
import { logOut } from "../../../../services/auth/authService";
import { useFocusEffect } from "@react-navigation/native";
import Loader from "../../../components/atoms/Loader";

const Menu = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const localData = await LOCAL.readLocalData();
          if (localData) {
            setUserData(localData);
            setIsLoading(false);
          } else {
            const cloudData = await CLOUD.getUserData();
            setUserData(cloudData);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        }
      };
  
      fetchUserData();
        }, [])
    );

  

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='never'>
      <View style={{ marginTop: 60, marginBottom: 30, marginHorizontal: 20, flexDirection:"row", justifyContent:"space-between" }}>
        <Text style={{ fontFamily: FONTS.black, fontSize: TYPOGRAPHY.title.xxl }}>Menu</Text>
        <Icon icon="exit-outline" size={25} action={logOut} color={COLORS.error}/>
      </View>
      {userData && (
        <View style={UI.distances}>
          <View style={styles.userBox}>
            <Icon icon="person-circle" size={50} />
            <Text style={{ marginTop: 20, marginLeft: 10, fontFamily: FONTS.bold }}>{userData.email}</Text>
          </View>
        </View>
      )}
      <View style={UI.distances}>
        <Text>Alcune impostazioni utili</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop:20}}>
          <InfoBox text="Backup" boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"cloud-download-outline", size:30, color:COLORS.main.first}} action={() => navigation.navigate("Backup")}/>
          <InfoBox text="Docs." boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"book-outline", size:30, color:COLORS.main.first}}  action={() => navigation.navigate("Documentations", {doc:"all"})}/>
          <InfoBox text="Privacy" boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"document-lock-outline", size:30, color:COLORS.main.first}}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingBox: {
    backgroundColor: COLORS.light.first,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    padding: 20,
    borderRadius: 10,
    width: "48%",
    marginTop: 10
  },
  settingText: {
    fontFamily: FONTS.bold,
    fontSize: TYPOGRAPHY.text.xl,
    marginTop: 5,
  }, 
  userBox: {
    backgroundColor: COLORS.light.first,
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    padding: 20,
    flexDirection: "row",
    borderRadius: 10
  }
});
