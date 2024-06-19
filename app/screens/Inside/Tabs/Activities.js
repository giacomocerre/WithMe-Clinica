import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Header } from '../../../components/molecules'
import { BUTTON, COLORS, FONTS, MAIN_STYLE, TEXT, TYPOGRAPHY, UI } from '../../../../stylesheets/theme'
import { ButtonComponent } from '../../../components/atoms'

const Activities = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Header/>
        <ScrollView>
            <View style={UI.distances}>
                <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl, marginVertical:20}}>Esplora le tue attività qui!</Text>
                <Text style={{fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.paragraph}}>Scegli tra le opzioni qui sotto per iniziare a <Text style={MAIN_STYLE.textBlueHighlight}>dare vita alle tue attività</Text> o per dare un'occhiata a quelle che <Text style={MAIN_STYLE.textBlueHighlight}>hai già creato</Text>.</Text>
                <Text style={{fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.paragraph, marginTop:20}}>Siamo qui per rendere il processo semplice e divertente per te! 😊</Text>
                <View style={{marginTop:50}}>
                    <ButtonComponent text="Crea Attività" action={() => navigation.navigate("Tab_CreateActivity")}buttonStyle={BUTTON.buttonFullBlue} textStyle={TEXT.light1} icon={{name:"extension-puzzle-sharp", size:20, color:COLORS.light.first}}/>
                    <ButtonComponent text="Vedi le Attività" action={() => navigation.navigate("ActivitiesList")}buttonStyle={BUTTON.buttonOutlineBlue} textStyle={TEXT.blue1} icon={{name:"albums", size:20, color:COLORS.main.first}}/>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default Activities