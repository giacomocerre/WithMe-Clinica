import { View, Text, ScrollView } from "react-native";
import React from "react";
import { GoBackTop } from "../../../components/molecules";
import { LOCAL } from "../../../../services/disk/dataService";
import { ButtonComponent, Icon } from "../../../components/atoms";
import { BUTTON, COLORS, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from "../../../../stylesheets/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Backup = ({navigation}) => {

  return (
    <ScrollView>
        <GoBackTop action={() => navigation.goBack()}/>
      <View style={UI.distances}>
      <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl}}>Backup</Text>
      <Text style={{fontFamily:FONTS.medium, fontSize: TYPOGRAPHY.text.xl, marginTop: 20, marginBottom: 20}}>Puoi scaricare i tuoi dati da qui per assicurarti di non perderli.</Text>
      <View style={{borderWidth:1, borderRadius:10, borderColor:COLORS.main.first ,marginVertical: 20}}>
      <View style={{alignItems: 'baseline'}}>
        <View style={{backgroundColor:"#f3f3f3", paddingRight: 10,  position:"relative", bottom: 14, left: 10}}>
          <Icon icon="bulb-outline" text="Suggerimenti" size={20} color={COLORS.main.first} fontSize={TYPOGRAPHY.text.m}/>
        </View>
        <View style={{paddingHorizontal:14, paddingVertical: 20}}>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.l, marginBottom:10}}><Text style={MAIN_STYLE.textBlueHighlight}>Non condividere</Text> il file dei tuoi dati con nessuno.</Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.l, marginBottom:10}}><Text style={MAIN_STYLE.textBlueHighlight}>Salva il file</Text> in un luogo sicuro e facilmente accessibile.</Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.l, marginBottom:10}}><Text style={MAIN_STYLE.textBlueHighlight}>Non eliminare</Text> il file dei tuoi dati.</Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.l, marginBottom:10}}>Se necessario, <Text style={MAIN_STYLE.textBlueHighlight}>invia il file tramite email</Text> per avere una copia di backup.</Text>
        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.text.l, marginBottom:10}}><Text style={MAIN_STYLE.textBlueHighlight}>Fai regolarmente backup</Text> dei tuoi dati per garantire che le informazioni più recenti siano sempre disponibili in caso di perdita o danneggiamento dei dati.</Text>
        </View>
      </View>
      </View>
      <ButtonComponent text="Scarica Dati" action={() => LOCAL.downloadBackup()} buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} icon={{name:"cloud-download-outline", size:20, color:COLORS.light.first}}/>
      </View>
    </ScrollView>
  );
};

export default Backup;
