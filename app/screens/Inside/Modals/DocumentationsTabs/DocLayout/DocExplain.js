import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, TYPOGRAPHY } from '../../../../../../stylesheets/theme'
import { Icon } from '../../../../../components/atoms'

const DocExplain = ({docs}) => {
    const [isCaaActive, setCaaActive] = useState(false)

    const toggleCAA = () => {
        setCaaActive(!isCaaActive);
    }

    const numColumns = 2;
    const imageWidth = (Dimensions.get('window').width / numColumns)-50;

  return (
    <View>
        <TouchableOpacity onPress={toggleCAA}>
            <View style={{marginBottom:20, alignSelf:"baseline", padding:10, backgroundColor:isCaaActive ? COLORS.main.first : "transparent", borderWidth:1, borderColor: COLORS.main.first, borderRadius:100}}>
                <Text style={{ fontFamily:FONTS.medium, color:isCaaActive ? COLORS.light.first : COLORS.main.first}}>{isCaaActive ? "Disattiva" : "Attiva"} Descrizione CAA</Text>
            </View>
        </TouchableOpacity>
        {isCaaActive && docs.map((doc, index) =>
        <View>
            <View key={index} style={[styles.grid, {padding:10, backgroundColor:COLORS.main.first, borderRadius:20}]}>
                {doc.caa.map((symbol, index) =>
                    <View key={index} style={{borderWidth:3,borderColor:COLORS.main.first, marginTop:10, borderRadius:10}}>
                        <Image
                        source={symbol}
                        style={[styles.image, { width: imageWidth, height: imageWidth, borderRadius:10, backgroundColor:COLORS.light.first }]}/>
                    </View>
                 )}
            </View>
            <View key={"sy"+index}>
            {doc.steps && doc.steps.map((step, index) => (
                <View style={{padding:10, borderWidth:2, marginVertical:10, borderColor:COLORS.main.first, borderRadius:10}}>
                    <View style={{position:"absolute", top:0, padding:10, backgroundColor:COLORS.main.first, borderBottomEndRadius:20, borderTopLeftRadius:5}}>
                        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.m, color:COLORS.light.first}}>Passo {index}</Text>
                    </View>
                    <View style={styles.grid}>
                    {step.caa.map((symbol, index) => (
                        <View key={index} style={{borderWidth:3,borderColor:COLORS.main.first, marginTop:30, borderRadius:10}}>
                            <Image
                            source={symbol}
                            style={[styles.image, { width: imageWidth, height: imageWidth, borderRadius:10 }]}/>
                        </View>   
                    ))}
                    </View>
                </View>
                 ))}
            </View>
        </View>)
        }
        {!isCaaActive && docs.map((doc, index) =>
            <View key={index} style={index === docs.length -1 ? styles.lastElement : null}>
                {index === docs.length -1 &&
                    <View style={{position:"absolute", top: 0, padding:10, backgroundColor:COLORS.light.first, borderBottomEndRadius:20, borderTopLeftRadius:19}}>
                        <Icon iconSet="MaterialCommunityIcons" icon="star-box" size={20} color={COLORS.main.first}/>
                    </View>
                    }
                <View>
                    <Text style={[index === docs.length -1 ? styles.lastTitle : null, {fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}]}>{doc.title}</Text>
                    <Text style={[index === docs.length -1 ? styles.lastDescr : null, {fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.paragraph, marginVertical:10}]}>{doc.description}</Text>
                </View>
                {doc.steps && doc.steps.map((step, index) =>
                    <View key={index} style={{marginVertical:20, padding:20, borderWidth:3, borderRadius:20, borderColor:COLORS.main.first}}>
                        <View style={{position:"absolute", top:0, padding:10, backgroundColor:COLORS.main.first, borderBottomEndRadius:20, borderTopLeftRadius:10}}>
                            <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.m, color:COLORS.light.first}}>Passo {index}</Text>
                        </View>
                        <View style={{marginTop:30}}>
                        <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.text.xl}}>{step.title}</Text>
                        <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.paragraph, marginVertical:10}}>{step.description}</Text>
                        </View>
                    </View>    
                )}
            </View>
        )}
    </View>
  )
}

export default DocExplain

const styles = StyleSheet.create({
    lastElement: {
        padding: 20,
        paddingTop:50,
        backgroundColor: COLORS.main.first,
        borderRadius: 20
    },
    lastDescr: {
        color:COLORS.light.first
    },
    lastTitle:{
        color:COLORS.light.first
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      image: {
        marginBottom: 10,
      },
})