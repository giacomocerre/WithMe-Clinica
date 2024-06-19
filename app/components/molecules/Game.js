import { View, Text, TouchableOpacity, ImageBackground, Button } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from '../../../stylesheets/theme'
import { ButtonComponent, Icon } from '../atoms'
import { ActivitiesConfig, appCovers } from '../../../utils/config'

const Game = ({activity, onSelection, onAssign, onStartGame}) => {


    const handleActivityClick = () => {
        onSelection(activity);
    }

    const handleAssign = () => {
        onAssign(activity);
    }

    const handleStartGame = () => {
        onStartGame(activity);
    }
 

  return (
    <View>
        <TouchableOpacity style={{alignItems:"center", marginRight:20}} onPress={handleActivityClick}>
            <View style={[SHADOW.normal,{margin:5}]}>
                <ImageBackground source={appCovers.filter(game => game.id === activity.cover.id)[0].image} style={{ position:"relative",width:250, height:250, borderRadius:20, overflow:"hidden"}}>
                    <View style={{position:"absolute", right:20, top:20, backgroundColor:COLORS.main.first, paddingVertical:5, paddingHorizontal:10, borderRadius:100}}>
                        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.s, color:COLORS.light.first}}>{activity.type}</Text>
                    </View>
                    <TouchableOpacity onPress={handleAssign} style={{position:"absolute", left:20, top:20, backgroundColor:COLORS.main.first, paddingVertical:10, paddingHorizontal:10, borderRadius:100}}>
                        <Icon iconSet="MaterialIcons" text="Assegna" fontSize={TYPOGRAPHY.text.s} fontFamily={FONTS.bold} icon="person-add-alt-1" size={20} color={COLORS.light.first}/>
                    </TouchableOpacity>
                    <View style={{backgroundColor:COLORS.light.first, position:"absolute", bottom:0, width:"100%", height:80}}>
                        <View style={[SHADOW.normal,{position:"absolute", top:-10, left: 10, borderRadius:10, backgroundColor:COLORS.light.first}]}>
                            <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.xl, marginHorizontal:10, marginVertical:5 }}>{activity.title}</Text>
                        </View>
                        <TouchableOpacity onPress={handleStartGame} style={{flexDirection:"row", position:"absolute", left:10, bottom:10, backgroundColor:COLORS.main.first, marginLeft:10, marginTop:5, borderRadius:14, padding:10}}>
                            <Text style={{color:COLORS.light.first, marginRight:5, marginTop:2}}>Prova</Text>
                            <Icon icon="play" size={20} color={COLORS.light.first}/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
        
    </View>
  )
}

export default Game