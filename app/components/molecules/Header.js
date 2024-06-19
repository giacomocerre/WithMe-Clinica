import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, TYPOGRAPHY } from '../../../stylesheets/theme'

const Header = () => {
  return (
    <View style={{backgroundColor:COLORS.main.first, height:100, alignItems:"left", justifyContent:"center"}}>
    <Text style={{fontFamily:FONTS.black, fontSize:TYPOGRAPHY.title.s, marginLeft:20, marginTop:30, color:COLORS.light.first}}>WithMe</Text>
  </View>
  )
}

export default Header