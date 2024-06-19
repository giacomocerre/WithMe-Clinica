import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native'; // Library for animations
import { Audio } from "expo-av"; // Expo's audio module
import { frequencies } from '../../../../../utils/config'; // Frequency data
import { PlayButton, TopWaves } from '../../GamesAssets'; // Custom PlayButton component
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from '../../../../../stylesheets/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// AudioStep component definition
const AudioStep = ({ step, stepNo, currentPoints, onNext, onExit }) => {

  const [points, setPoints] = useState(currentPoints);

  const animation = useRef(null); // Ref for LottieView animation
  const [freq, setFreq] = useState(null); // State for current frequency
  const [sound, setSound] = useState(null); // State for currently playing sound
  const [restartTimer, setRestartTimer] = useState(null); // Timer for button re-enable
  const [volume, setVolume] = useState(0); // Current volume level
  const [isPlaying, setIsPlaying] = useState(false); // Flag for audio playback status
  const [buttonDisabled, setButtonDisabled] = useState(true); // Disable state for PlayButton
  const [lastSound, setLastSound] = useState(null); // Last played sound
  const [lastSoundTimestamp, setLastSoundTimestamp] = useState(0); // Timestamp of last played sound
  const [counter, setCounter] = useState(0);
  const [lastFreq, setLastFreq] = useState(null);
  const [lastVolume, setLastVolume] = useState(null);

  // Effect to initialize step
  useEffect(() => {
    const initStep = async () => {
      const freqObj = frequencies.find(freq => freq.value === step.frequency); // Find frequency data
      if (!freqObj) {
        console.error("Frequency object not found");
        return;
      }
      setFreq(freqObj);
      setVolume(0);
      setIsPlaying(false);
      if (sound) {
        await sound.unloadAsync(); // Unload previous sound if exists
        setSound(null);
      }
      setTimeout(() => {
        playAudio(freqObj, 0); // Play audio after a delay
      }, 5000);
    };
    initStep(); // Initialize step
    return () => {
      if (sound) {
        sound.unloadAsync(); // Clean up on unmount
      }
      if (restartTimer) {
        clearTimeout(restartTimer); // Clear restart timer if exists
      }
    };
  }, [step]); // Run effect when step changes

  // Function to play audio
  const playAudio = async (freq, volume) => {
    try {
      const { sound } = await Audio.Sound.createAsync(freq.fileName); // Load audio file
      sound.setOnPlaybackStatusUpdate((status) => {
        setIsPlaying(status.isPlaying); // Update playback status
        if (!status.isPlaying) {
          setSound(null); // Reset sound if playback ends
          setButtonDisabled(false); // Enable button after playback ends
          const disableButtonTimer = setTimeout(() => {
            setButtonDisabled(true); // Disable button after a delay
          }, 3000);
          setRestartTimer(disableButtonTimer); // Set timer for button re-enable
        }
      });
      await sound.setVolumeAsync(step.volumes[volume]); // Set volume
      setSound(sound); // Set current sound
      setTimeout(async () => {
        if (sound) {
          await sound.stopAsync(); // Stop sound after a delay
          setSound(null); // Reset sound
        }
      }, 1000);
      await sound.playAsync(); // Play the sound
      setLastSound(sound); // Record last played sound
      setLastSoundTimestamp(Date.now()); // Record timestamp of last played sound
    } catch (error) {
      console.error("Error playing audio", error); // Log error if audio playback fails
    }
  };

  // Function to handle PlayButton click
  const handleButtonClick = async () => {
    if (!buttonDisabled) {
      points[stepNo].volumes[volume] ? points[stepNo].volumes[volume].correct += 1 : null;
      points.total += 1;
      points.totalCorrect += 1;
      setPoints(points)
      setButtonDisabled(true); // Disable button
      animation.current?.play(); // Play animation
      const newVolume = volume + 1; // Increase volume
      setVolume(newVolume); // Update volume state
      if (newVolume < step.volumes.length) {
        setTimeout(async () => {
          await playAudio(freq, newVolume); // Play next audio with increased volume after a delay
        }, 5000);
      } else {
        setTimeout(() => {
          onNext(currentPoints); // Proceed to next step after a delay if volume reaches maximum
        }, 5000);
      }
    }else{
      if(points[stepNo].volumes[volume]){
        points[stepNo].volumes[volume].wrong -= 1;
        points.total -= 1;
      }
      setPoints(points)
    }
  };

  const closeGame = () => {
    onExit();
  }

  useEffect(() => {
    const interval = 10000; // 10 seconds
    const checkCount = 1; // Number of intervals to check

    const timer = setInterval(() => {
      if (lastSound && Date.now() - lastSoundTimestamp > interval) {
        setButtonDisabled(true); // Disable button

        // Check if frequency and volume are the same
      if (freq === lastFreq && volume === lastVolume) {
           setCounter(currCounter => currCounter + 1)
           if(counter >= checkCount) {
            const nextVolume = volume +1;
            animation.current?.play();
            setVolume(nextVolume);
            setCounter(0)
            if (nextVolume > step.volumes.length) {
              setTimeout(() => {
                onNext(currentPoints); // Proceed to next step after a delay if volume reaches maximum
              }, 5000);
            }
           }
      }else{
        setCounter(0)
      }
        // Update last known frequency and volume
        setLastFreq(freq);
        setLastVolume(volume);

        playAudio(freq, volume); // Replay audio after 10 seconds
      }
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on unmount
  }, [lastSound, lastSoundTimestamp, freq, volume, counter, lastFreq, lastVolume]);

  // Rendering UI
  return (
    <View>
       <View style={{position:"relative", top:0, width:"100%", justifyContent:"center", alignItems:"center"}}>
          <View style={{height:110, backgroundColor:"rgb(70,208,63)", width:"90%", position:"relative", bottom:10,borderBottomLeftRadius:50,borderBottomRightRadius:50, borderWidth:3, borderColor:COLORS.light.first, justifyContent:"center", alignItems:"center"}}>
            <Text style={{marginTop:20, marginRight:20, fontFamily:FONTS.poetsen, fontSize:TYPOGRAPHY.title.l, color:COLORS.light.first}}>Giochiamo</Text>
          </View>
            <View style={{position:"absolute", left:20, top:150}}>
            <TouchableOpacity onPress={closeGame}>
            <ImageBackground source={require("../../../../../assets/img/exitCartoon.png")} style={[SHADOW.normal,{width:60, height:60}]}/>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row", position:"absolute", right:20, top:150}}>
              <Text style={[SHADOW.normal,{marginTop:10, marginRight:20, fontFamily:FONTS.poetsen, fontSize:TYPOGRAPHY.title.xl, color:COLORS.light.first}]}>{points.totalCorrect * 100}</Text>
              <ImageBackground source={require("../../../../../assets/img/rewardCoin.png")} style={{width:60, height:60}}/>
            </View>
          </View>
      <View style={{position:"absolute", top:220}}>
      {step.animation && (
        <View>
        <LottieView
          ref={animation}
          source={JSON.parse(step.animation)}
          loop={false}
          style={{ width: screenWidth, height: screenHeight / 2, marginBottom:20 }}
        />
        </View>
      )}
      <View style={{ width: "100%", alignItems: "center"}}>
        <TouchableOpacity onPress={handleButtonClick}>
          <ImageBackground source={require("../../../../../assets/img/audioPlayButton.png")} style={[SHADOW.normal,{width:150, height:150}]}/>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    
  );
};

export default AudioStep; // Export AudioStep component
