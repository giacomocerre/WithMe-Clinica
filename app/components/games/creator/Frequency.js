import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Audio } from "expo-av";
import { COLORS, FONTS, MAIN_STYLE, SHADOW, TYPOGRAPHY } from "../../../../stylesheets/theme";
import { Icon } from "../../atoms";
import { frequencies } from "../../../../utils/config";

const Frequency = ({ maxSelection, onSelectedFrequencies }) => {
  const [selectedFrequencies, setSelectedFrequencies] = useState([]);
  const [soundStates, setSoundStates] = useState({});
  const [selectedVolume, setSelectedVolume] = useState(0.9); // Default to high volume

  useEffect(() => {
    onSelectedFrequencies(selectedFrequencies);
  }, [selectedFrequencies, onSelectedFrequencies]);

  const setVolume = (level) => {
    switch (level) {
      case 'high':
        setSelectedVolume(0.9);
        break;
      case 'medium':
        setSelectedVolume(0.6);
        break;
      case 'low':
        setSelectedVolume(0.3);
        break;
      default:
        setSelectedVolume(0.9);
        break;
    }
  };

  const playAudio = async (freq) => {
    try {
      const isPlaying = !!soundStates[freq.value];
      if (isPlaying) {
        await soundStates[freq.value].pauseAsync();
        setSoundStates({});
      } else {
        const { sound } = await Audio.Sound.createAsync(freq.fileName);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isPlaying) {
            delete soundStates[freq.value];
          }
        });

        // Set volume
        await sound.setVolumeAsync(selectedVolume);

        setSoundStates({ ...soundStates, [freq.value]: sound });
        await sound.playAsync();
        setTimeout(async () => {
          await sound.pauseAsync();
          setSoundStates({});
        }, 2000);
      }
    } catch (error) {
      console.error("Error playing audio", error);
    }
  };

  const handleFrequencySelection = (frequency) => {
    let updatedSelectedFrequencies;

    if (selectedFrequencies.includes(frequency)) {
      updatedSelectedFrequencies = selectedFrequencies.filter((freq) => freq !== frequency);
    } else if (selectedFrequencies.length < maxSelection) {
      updatedSelectedFrequencies = [...selectedFrequencies, frequency];
    }

    if (updatedSelectedFrequencies) {
      updatedSelectedFrequencies.sort((a, b) => a - b);
      setSelectedFrequencies(updatedSelectedFrequencies);
    }
  };

  const renderFrequencyButtons = () => {
    return frequencies.map((freq) => (
      <View key={freq.value} style={{ width: "100%" }}>
        <TouchableOpacity onPress={() => handleFrequencySelection(freq.value)}>
          <View style={[SHADOW.normal, { flexDirection: "row", width: "90%", margin: "5%", borderColor: COLORS.main.first, borderWidth: selectedFrequencies.includes(freq.value) ? 5 : 0, marginVertical: 20, backgroundColor: COLORS.light.first, padding: 20, borderRadius: 10 }]}>
            <Icon
              iconSet="MaterialIcons"
              icon={selectedFrequencies.includes(freq.value) ? "check-circle" : "radio-button-unchecked"}
              size={40}
              color={selectedFrequencies.includes(freq.value) ? COLORS.main.first : COLORS.light.third}
            />
            <Text style={{ textAlign: "center", width: "fit", marginLeft: 20, position: "relative", top: 5, fontFamily: FONTS.bold, fontSize: TYPOGRAPHY.title.l }}>{freq.label}</Text>
            <TouchableOpacity onPress={() => playAudio(freq)} style={{ backgroundColor: COLORS.main.first, alignSelf: "baseline", padding: 10, borderRadius: 100, position: "absolute", top: 25, right: 50 }}>
              <Icon icon={soundStates[freq.value] ? "pause" : "play"} color={COLORS.light.first} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignSelf: "baseline", flexDirection: "row", backgroundColor: COLORS.main.first, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 100, marginBottom: 10 }}>
        <Icon icon="volume-high" size={15} color={COLORS.light.first} />
        <Text style={{ fontFamily: FONTS.bold, position: "relative", left: 3, top: 3, color: COLORS.light.first, fontSize: TYPOGRAPHY.text.s }}>ATTIVA AUDIO DISPOSITIVO</Text>
      </View>
      <View>
        <Text fontFamily={{ fontFamily: FONTS.regular, fontSize: TYPOGRAPHY.paragraph }}>Le soglie di <Text style={MAIN_STYLE.textBlueHighlight}>Decibel</Text> per il volume delle frequenze durante l'esercizio sono 3 per ogni animazione. Per sentire queli sono seleziona uno dei valori sotto:</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 10 }}>
          <TouchableOpacity onPress={() => setVolume('high')} style={[SHADOW.normal,{ padding: 10, borderRadius: 10, backgroundColor: selectedVolume === 0.9 ? COLORS.main.first : COLORS.light.first }]}>
            <Text style={{ fontFamily: FONTS.regular, color: selectedVolume === 0.9 ? COLORS.light.first : COLORS.main.first }}>Alto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVolume('medium')} style={[SHADOW.normal,{ padding: 10, borderRadius: 10, backgroundColor: selectedVolume === 0.6 ? COLORS.main.first : COLORS.light.first }]}>
            <Text style={{ fontFamily: FONTS.regular, color: selectedVolume === 0.6 ? COLORS.light.first : COLORS.main.first }}>Medio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVolume('low')} style={[SHADOW.normal,{ padding: 10, borderRadius: 10, backgroundColor: selectedVolume === 0.3 ? COLORS.main.first : COLORS.light.first }]}>
            <Text style={{ fontFamily: FONTS.regular, color: selectedVolume === 0.3 ? COLORS.light.first : COLORS.main.first }}>Basso</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {renderFrequencyButtons()}
      </ScrollView>
    </View>
  );
};

export default Frequency;
