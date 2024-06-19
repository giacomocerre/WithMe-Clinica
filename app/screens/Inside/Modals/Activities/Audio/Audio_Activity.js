import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { GoBackTop } from '../../../../../components/molecules';
import { COLORS, FONTS, TYPOGRAPHY, UI } from '../../../../../../stylesheets/theme';
import { Icon } from '../../../../../components/atoms';
import { Animations, Frequency, SaveActivity } from '../../../../../components/games/creator';

const AudioActivity = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnimations, setSelectedAnimations] = useState([])
  const [selectedFrequencies, setSelectedFrequencies] = useState([])
  const [title, setTitle] = useState(null);

  useEffect(() => {
    switch (currentStep) {
      case 1:
        setTitle("Scegli 3 Animazioni");
        break;
      case 2:
        setTitle("Imposta 3 Frequenze");
        break;
      case 3:
        setTitle("Personalizziamo un po...");
        break;
      default:
        setTitle(null);
        setSubtitle(null);
    }
  }, [currentStep]);


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Animations isSelectable={true} maxSelection={3} onSelectedAnimations={(animations) => setSelectedAnimations(animations)}/>;
      case 2:
        return <Frequency maxSelection={3} onSelectedFrequencies={(frequencies) => setSelectedFrequencies(frequencies)}/>;
      case 3:
        const obj = Object.fromEntries(selectedAnimations.map((selAnim, i) => {
          return [`step${i + 1}`, {
            animation: selAnim.animation.animation,
            frequency: selectedFrequencies[i],
            volumes: [0.9, 0.6, 0.3]
          }];
        }));
        return <SaveActivity activity={obj} type="audio" onSaved={() => navigation.navigate("Home")}/>
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      if(currentStep === 1 && selectedAnimations.length === 3) {
        setCurrentStep(currentStep + 1);
      }
      if(currentStep === 2 && selectedFrequencies.length === 3) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GoBackTop action={() => navigation.goBack()} />
      <View style={[UI.distances,{flex:1}]}>
          <View style={{flexDirection:"row", position:"relative"}}>
            <TouchableOpacity onPress={handlePrevStep} disabled={currentStep === 1}>
              <Icon iconSet="Entypo" icon="chevron-left" size={30} color={currentStep === 1 ? COLORS.light.second : COLORS.main.first}/>
            </TouchableOpacity>
            <View style={{backgroundColor:COLORS.main.first, alignSelf:"baseline", paddingVertical:10, paddingHorizontal:30, borderRadius:100}}>
              <Text style={{fontFamily:FONTS.bold, color:COLORS.light.first}}>{currentStep}/3</Text>
            </View>
            <TouchableOpacity onPress={handleNextStep} disabled={currentStep === 3}>
            <Icon iconSet="Entypo" icon="chevron-right" size={30} color={currentStep === 3 ? COLORS.light.second : COLORS.main.first}/>
            </TouchableOpacity>
          </View>
          <Text style={{ fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.l, marginVertical: 10 }}>{title}</Text>
            <View style={{flex:1}}>
              {renderStep()}
            </View>
      </View>
    </View>
  );
};

export default AudioActivity;
