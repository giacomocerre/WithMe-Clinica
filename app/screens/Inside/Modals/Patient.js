import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CutText, InfoBox } from '../../../components/molecules';
import { Icon } from '../../../components/atoms';
import { COLORS, FONTS, INFOBOX, MAIN_STYLE, TYPOGRAPHY, UI } from '../../../../stylesheets/theme';
import { getAge } from '../../../../utils/utils';


const Patient = ({ navigation, route }) => {
  // Extracting patientData from route.params
  const { patientData } = route.params;
  const {birthdate, cf, info} = patientData;
  const age = getAge(birthdate);

  return (
    <ScrollView style={{flex:1}}>
        <View style={{height:280, alignItems:"left", position:"relative", justifyContent:"center", backgroundColor:COLORS.main.first}}>
            <View style={{marginLeft:20, marginTop:20}}>
                <Icon
                action={() => navigation.goBack()}
                icon="chevron-back"
                size={30}
                color={COLORS.light.first}/>
            </View>
            <View style={{position:"absolute", top:100, right:10, flexDirection:"row", alignItems:"baseline"}}>
                <View style={{position:"absolute", right:30, top:8}}>
                    <Text style={{fontFamily:FONTS.bold, color:COLORS.light.first}}>Aggiungi Nota</Text>
                </View>
                <Icon icon="add-circle" size={28} color={COLORS.light.first}/>
            </View>
            {patientData && (
            <View style={{marginLeft:20, marginTop: 40, flexDirection:"row"}}>
                <View>
                    <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xxl, color:COLORS.light.first}}>{patientData.name ? patientData.name + "\n" + patientData.surname : patientData.token}</Text>
                    <View style={{padding:10, borderRadius:100, marginTop:5,backgroundColor:COLORS.light.first, alignSelf:"baseline"}}>
                        <Text style={{fontFamily:FONTS.black, color:COLORS.main.first}}>#{patientData.token}</Text>
                    </View>
                </View>
            </View>
            )}
        </View>
        <CutText text={info.description ? info.description : "Nessuna  descrizione disponibile"} lines={4} indicator={"Chi è " + patientData.name}/>
        <View style={UI.distances}>
            <Text style={{textTransform:"uppercase", fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph}}><Text style={[MAIN_STYLE.textBlueHighlight, {textTransform:"capitalize"}]}>Età:</Text>{age ? age : "+"}</Text>
            <Text style={{textTransform:"uppercase", fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.paragraph}}><Text style={[MAIN_STYLE.textBlueHighlight, {textTransform:"capitalize"}]}>Codice Fiscale:</Text> {cf ? cf : "+"}</Text>

            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop:0}}>
                <InfoBox text="Caratteristiche" action={() => navigation.navigate("Tab_Patients")} boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"newspaper-outline", size:30, color:COLORS.main.first}}/>
                <InfoBox text="Visite" action={() => navigation.navigate("Tab_Patients")}boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"ear-outline", size:30, color:COLORS.main.first}}/>
                <InfoBox text="Attività" action={() => navigation.navigate("PatientActivities", {token:patientData.token})}boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"extension-puzzle-sharp", size:30, color:COLORS.main.first}}/>
                <InfoBox text="Storico" action={() => navigation.navigate("Tab_Patients")}boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={INFOBOX.InfoBoxTextDark} icon={{icon:"medical", size:30, color:COLORS.main.first}}/>
            </View>
        </View>


    </ScrollView>
  );
};

export default Patient;