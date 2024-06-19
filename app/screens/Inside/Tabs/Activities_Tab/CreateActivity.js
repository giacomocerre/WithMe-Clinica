import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Header } from '../../../../components/molecules';
import { COLORS, FONTS, MAIN_STYLE, SHADOW, TEXT, TYPOGRAPHY, UI } from '../../../../../stylesheets/theme';
import { Icon } from '../../../../components/atoms';
import { ActivitiesConfig } from '../../../../../utils/config';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CreateActivity = ({navigation}) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const translateYValue = useRef(new Animated.Value(screenHeight)).current;
  const backgroundColorValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;


  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    Animated.parallel([
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      })

    ]).start();
  };

  const closeActivityInfo = () => {
    Animated.parallel([
      Animated.timing(translateYValue, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      
    ]).start(() => setSelectedActivity(null));
  };

  const interpolatedColor = backgroundColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)'],
  });

  const interpolatedOpacity = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["1", "0.5"],
  });

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView scrollEnabled={!selectedActivity}>
        <Animated.View style={{ backgroundColor: interpolatedColor}}>
            <Animated.View style={[UI.distances, {opacity:interpolatedOpacity}]}>
                <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.xl, marginVertical: 20 }}>
                    Iniziamo!{"\n"}Che attività vorresti <Text style={MAIN_STYLE.textBlueHighlight}>creare?</Text>
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
                    {ActivitiesConfig.map(activity =>
                    <TouchableOpacity
                        key={activity.title}
                        style={[SHADOW.normal, { width: "47%", padding: 20, backgroundColor: COLORS.light.first, borderRadius: 10, alignItems: "center" }]}
                        onPress={() => handleActivityClick(activity)}
                    >
                        <View>
                        <View style={{ padding: 20, borderWidth: 3, borderColor: COLORS.main.first, backgroundColor: COLORS.main.first, borderRadius: 100 }}>
                            <Icon iconSet={activity.iconsSet} icon={activity.icon} size={40} color={COLORS.light.first} />
                        </View>
                        </View>
                        <Text style={{ fontFamily: FONTS.black, fontSize: TYPOGRAPHY.text.l, color: COLORS.main.second, textTransform: "uppercase", textAlign: "center", marginTop: 20 }}>{activity.title}</Text>
                    </TouchableOpacity>
                    )}
                </View>
            </Animated.View>
          {selectedActivity &&
            <Animated.View style={[SHADOW.normal,{ transform: [{ translateY: translateYValue }], flex:1, position: 'absolute', height: screenHeight, top: 100, borderRadius:20, left: 0, right:0, borderRadius: 20, backgroundColor: COLORS.light.first }]}>
            <ScrollView>
                <View onPress={closeActivityInfo} style={{ position:"absolute", top: 20, left:25, borderColor:COLORS.main.first, borderWidth:1, paddingHorizontal:10, paddingVertical:5, borderRadius:100 }}>
                    <Text style={{fontFamily:FONTS.medium, color:COLORS.main.first}}>{selectedActivity.step}</Text>
                </View>
                <TouchableOpacity onPress={closeActivityInfo} style={{ position:"absolute", top: 20, right:20 }}>
                    <Icon icon="close" size={25}/>
                </TouchableOpacity>
                <View style={{ padding: 20, borderRadius: 10, marginTop:40 }}>
                {selectedActivity.simulation &&
                        <Text style={{marginHorizontal:10, paddingVertical:5, fontFamily:FONTS.black}}>Simulazione: {selectedActivity.simulation}</Text>
                    }
                    <View style={{ position:"relative",padding: 20, borderWidth: 3, marginBottom:20, flexDirection:"row",borderColor: COLORS.main.first, backgroundColor: COLORS.main.first, borderRadius: 20 }}>
                        <Icon iconSet={selectedActivity.iconsSet} icon={selectedActivity.icon} size={40} color={COLORS.light.first} />
                        <Text style={{ fontFamily: FONTS.bold, color:COLORS.light.first,position:"relative", top:10, left:20, fontSize: TYPOGRAPHY.title.l, marginBottom: 10 }}>{selectedActivity.title}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(selectedActivity.title+"Activity")} style={{position:"absolute", right:20, top:15, backgroundColor:COLORS.main.second, padding:10, borderRadius:100}}>
                          <Icon icon="play" size={30} color={COLORS.light.first} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontFamily:FONTS.bold, marginLeft:10}}>Descrizione:</Text>
                    <Text style={{ fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.text.xl, padding:10 }}>{selectedActivity.description}</Text>
                </View>
              </ScrollView>
            </Animated.View>
          }
        </Animated.View>
      </ScrollView>
    </View>
  );
}

export default CreateActivity;
