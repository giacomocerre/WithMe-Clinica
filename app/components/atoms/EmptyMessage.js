import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../../stylesheets/theme'

const EmptyMessage = ({text}) => {
  return (
    <View style={{paddingVertical:30, borderRadius:10, backgroundColor:COLORS.light.second, width:"100%", textAlign:"center", opacity:.5}}>
        <Text style={{textAlign:"center"}}>{text}</Text>
    </View>
  )
}

export default EmptyMessage