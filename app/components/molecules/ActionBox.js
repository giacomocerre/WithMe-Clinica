import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from '../../../stylesheets/theme'
import { Icon } from '../atoms'

const ActionBox = ({text, tag, icon, action}) => {
    const handleClick = () => {
        action();
    }
  return (
<TouchableOpacity onPress={handleClick} style={[SHADOW.normal,{flexDirection:"row", flexWrap:"wrap", backgroundColor:COLORS.light.first, padding:40, marginVertical:10, borderRadius:10}]}>
    <View style={{position:"absolute", right:10, top:10, padding:5, backgroundColor:COLORS.main.first, borderRadius:100}}>
    <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.s, color:COLORS.light.first}}>{tag}</Text>
    </View>
    <Icon iconSet={icon.iconSet} icon={icon.icon} size={40} color={COLORS.main.first}/>
    <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.m, marginTop:10, marginLeft:20}}>{text}</Text>
    <View style={{position:"absolute", right:50, top: 50}}>
    <Icon icon="arrow-forward-circle-outline" size={30} color={COLORS.main.first}/>
    </View>
</TouchableOpacity>
  )
}

export default ActionBox