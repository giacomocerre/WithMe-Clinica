import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { DocumentationsTabs } from '../../../../../utils/config'
import { COLORS, FONTS, INFOBOX, MAIN_STYLE, SHADOW, TYPOGRAPHY, UI } from '../../../../../stylesheets/theme'
import { InfoBox } from '../../../../components/molecules'

const DocAll = ({navigation}) => {
  return (
    <ScrollView>
      <Text style={{marginTop:30, marginHorizontal:20, fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}}>Qua puoi conusultare tutta la <Text style={MAIN_STYLE.textBlueHighlight}>documentazione</Text> disponibile 📖</Text>

    <View style={UI.distances}>
        {DocumentationsTabs.map((doc, index) => 
            <View key={index}>
                <InfoBox text={doc.title} action={() => navigation.navigate("Documentations", {doc:doc.doc})} boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxBig]} textStyle={INFOBOX.InfoBoxTextDark} icon={{iconSet:doc.icon.iconSet, icon: doc.icon.icon, size:30, color:COLORS.main.first}}/>
            </View>
        )}
    </View>
    </ScrollView>


  )
}

export default DocAll