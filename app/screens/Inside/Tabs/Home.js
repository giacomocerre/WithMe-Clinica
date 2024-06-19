import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, Image, ImageBackground } from "react-native";
import React from "react";
import { ButtonComponent } from "../../../components/atoms";
import { BUTTON, COLORS, FONTS, INFOBOX, TEXT, TYPOGRAPHY, UI } from "../../../../stylesheets/theme";
import { InfoBox } from "../../../components/molecules";


const Home = ({navigation}) => {

    return (
      
      <ScrollView contentContainerStyle={{flex:1}}>
          <ImageBackground
        style={{height:350,}}
        resizeMode="contain"
        source={require("../../../../assets/img/doctors.png")}
      >
          <View style={{ height: "100%", width: "100%",borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor: 'rgba(0, 107, 255, 0.6)' }}>
            <View style={{ position:"relative", top:100}}>
            <Text style={{ padding: 20, zIndex: 10, position:"relative", top:30, color:COLORS.light.first, fontFamily:FONTS.bold, fontSize: TYPOGRAPHY.title.s }}>
            <Text style={{fontSize:TYPOGRAPHY.title.xxl,}}>Hey, ciao!</Text>
            {"\n"}Gestisci al meglio le cure dei tuoi pazienti.</Text>
            <View style={{width:"50%", marginLeft:20, marginTop:20}}>
            <ButtonComponent text="Esplora le Novità" buttonStyle={BUTTON.buttonFullLight} textStyle={[TEXT.blue1, {fontFamily:FONTS.bold}]}/>
            </View>
            </View>
        </View>
      </ImageBackground>
          <View style={{position: "relative", flex: 1}}>
            <View style={UI.distances}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop:0}}>
                <InfoBox 
                  text="Le Attività"
                  action={() => navigation.navigate("ActivitiesList")}
                  boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]}
                  textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"albums-outline", size:30, color:COLORS.main.first}}/>
                <InfoBox
                  text="Appuntamenti"
                  action={() => navigation.navigate("Tab_Patients")}
                  boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]}
                  textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"calendar-outline", size:30, color:COLORS.main.first}}/>
                <InfoBox
                  text="Gestisci i Tuoi Pazienti"
                  action={() => navigation.navigate("Tab_Patients")}
                  boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxFull, INFOBOX.InfoBoxBig]}
                  textStyle={INFOBOX.InfoBoxTextLight} icon={{icon:"people-circle-sharp", size:30, color:COLORS.light.first}}/>
              </View>
            </View>
            {/* Pressable Button */}
            <View style={styles.container}>
                <TouchableOpacity
                  activeOpacity={.8} //The opacity of the button when it is pressed
                  style = {styles.button}
                  onPress = {() => navigation.navigate("AddPatient")}
                >
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
      </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 0,
    
  },
  button: {
    backgroundColor: COLORS.main.first,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: (70 / 2),
    width: 70,
    height: 70,
    shadowColor: "#212121",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },

  text: {
    textAlign: 'center',
    color: COLORS.light.first,
    fontSize: TYPOGRAPHY.title.xxl,
    fontFamily: FONTS.medium,
    position:"relative",
    top: Platform.OS === 'ios' ? 3 : 0
  },
  
});
