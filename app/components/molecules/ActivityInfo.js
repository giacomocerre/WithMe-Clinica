import { View, Text, Animated, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { COLORS, FONTS, INFOBOX, SHADOW, TYPOGRAPHY } from '../../../stylesheets/theme'
import { Icon } from '../atoms';
import { ActivitiesConfig } from '../../../utils/config';
import InfoBox from './InfoBox';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const ActivityInfo = ({activity, translateYValue, onClose, onStartGame, onOpenDoc}) => {

    const close = () => {
        onClose();
    }

    const getIcon = (type) => {
        const {iconsSet, icon} = ActivitiesConfig.filter(activityConf => activityConf.type === type)[0]
        return {iconsSet, icon}
    }

    const getDocs = (type) => {
      const {mainDocs} = ActivitiesConfig.filter(activityConf => activityConf.type === type)[0]
      return mainDocs;
    }
    const handleOpenDoc = (doc) => {
      onOpenDoc(doc)
    }

  return (
    <Animated.View style={[SHADOW.normal,{ transform: [{ translateY: translateYValue }], position: 'absolute', height:500, width:screenWidth, top: 0, flex:1, borderRadius:20, left: -20, right:0, borderRadius: 20, backgroundColor: COLORS.light.first }]}>
            <View style={{padding:20, marginBottom: 20, position:"relative"}}>
              <View style={{position:"absolute", zIndex:10, right:20, top:20}}>
                <Icon icon="close" size={25} action={close}/>
              </View>
              <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <View style={{marginTop:30}}>
                <View style={{paddingVertical:10, paddingHorizontal:25, flexDirection:"row", borderRadius:100, backgroundColor:COLORS.main.first, alignSelf:"baseline"}}>
                  <Icon iconSet={getIcon(activity.type).iconsSet} icon={getIcon(activity.type).icon} size={20} color={COLORS.light.first} />
                  <Text style={{textTransform:"uppercase", marginTop:5, marginLeft:10,fontFamily:FONTS.bold,fontSize:TYPOGRAPHY.paragraph, color:COLORS.light.first}}>{activity.type}</Text>
                </View>
                <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.xl, marginVertical:20}}>{activity.title}</Text>
                <Text style={{fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.text.xl, marginBottom:20}}>{activity.description}</Text>
                <View style={{ position:"relative",padding: 20, borderWidth: 3, marginBottom:10, flexDirection:"row",borderColor: COLORS.main.first, backgroundColor: COLORS.main.first, borderRadius: 20 }}>
                    <Text style={{ fontFamily: FONTS.bold, color:COLORS.light.first,position:"relative", top:10, left:20, fontSize: TYPOGRAPHY.title.m, marginBottom: 10 }}>Prova Attività</Text>
                    <TouchableOpacity onPress={() => onStartGame()} style={{position:"absolute", right:20, top:15, backgroundColor:COLORS.main.second, padding:10, borderRadius:100}}>
                      <Icon icon="play" size={25} color={COLORS.light.first} />
                    </TouchableOpacity>
                </View>
                <View>
                  <Text style={{ fontFamily: FONTS.bold, fontSize:TYPOGRAPHY.title.m, marginTop:20}}>La Documentazione</Text>
                  <Text style={{fontFamily:FONTS.regular, fontSize:TYPOGRAPHY.paragraph, marginBottom:10}}>Esplora la dcumentazione associata a questo esercizio</Text>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal:5, paddingBottom:20, marginTop:0}}>
                  {getDocs(activity.type).map((doc,i) => 
                      <InfoBox key={i}  text={doc} action={() => handleOpenDoc(doc)} boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxSmall]} textStyle={[INFOBOX.InfoBoxTextDark,{textTransform:"capitalize"}]} icon={{icon:"document-attach-outline", size:30, color:COLORS.main.first}}/>
                  )}
                  {/* <InfoBox text={"Vedi altra documentazione"} action={() => handleOpenDoc()} boxStyle={[INFOBOX.InfoBox, INFOBOX.InfoBoxNormal, INFOBOX.InfoBoxBig]} textStyle={[INFOBOX.InfoBoxTextDark,{textTransform:"capitalize"}]} icon={{icon:"documents", size:30, color:COLORS.main.first}}/> */}

                  </View>
                </View>
              </View>
              </ScrollView>
            </View>
        </Animated.View>
  )
}

export default ActivityInfo