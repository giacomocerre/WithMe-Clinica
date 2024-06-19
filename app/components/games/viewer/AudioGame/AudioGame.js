import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated, ImageBackground } from 'react-native';
import { BottomWaves, PlayButton, TopWaves } from '../../GamesAssets';
import AudioStep from './AudioStep';
import { appBackground } from '../../../../../utils/config';
import AudioEnd from './AudioEnd';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AudioGame = ({ activity, token, onExit }) => {
  const topWavePosition = useRef(new Animated.Value(-300)).current;
  const [appBG, setAppBG] = useState(null)
  const bottomWavePosition = useRef(new Animated.Value(screenHeight)).current;
  const playContentScale = useRef(new Animated.Value(0)).current;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [points, setPoints] = useState({
    step1:{
      volumes:[
        {wrong:0,correct:0},{wrong:0,correct:0},{wrong:0,correct:0}
      ]
    },
    step2:{
      volumes:[
        {wrong:0,correct:0},{wrong:0,correct:0},{wrong:0,correct:0}
      ]
    },
    step3:{
      volumes:[
        {wrong:0,correct:0},{wrong:0,correct:0},{wrong:0,correct:0}
      ]
    },
    total:0,
    totalCorrect: 0
  })

  const animateStart = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(
          topWavePosition,
          {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }
        ),
        Animated.timing(
          bottomWavePosition,
          {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }
        )
      ]),
      Animated.spring(
        playContentScale,
        {
          toValue: 1,
          friction: 3,
          useNativeDriver: false,
        }
      )
    ]).start();
  };

  useEffect(() => {
    setIsPlaying(false);
    setAppBG(appBackground.filter(bg => bg.id === activity.background.id)[0].image)
    animateStart(); // Start animation sequence on component mount
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleNextStep = (points) => {
    // Update current step index to move to the next step
    setPoints(points);
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const handleCloseGame = () => {
    onExit();
  }

  return (
    <View style={styles.container}>
      {!isPlaying && (
        <ImageBackground source={appBG} style={styles.main}>
          <Animated.View
            style={[
              styles.wave,
              styles.waveTop,
              { transform: [{ translateY: topWavePosition }] },
            ]}
          >
            <TopWaves />
          </Animated.View>
          <Animated.View
            style={[
              styles.playContent,
              { transform: [{ scale: playContentScale }] },
            ]}
          >
            <PlayButton onPlay={handlePlay} text="Gioca"/>
          </Animated.View>
          <Animated.View
            style={[
              styles.wave,
              styles.waveBottom,
              { transform: [{ translateY: bottomWavePosition }] },
            ]}
          >
            <BottomWaves />
          </Animated.View>
        </ImageBackground>
      )}
     {isPlaying && (
        <ImageBackground source={appBG} style={styles.main}>
          <View style={{backgroundColor:"rgba(0,0,0,0.3)", height:"100%"}}>
          {currentStepIndex <= 3 && 
            <AudioStep step={activity.activity[`step${currentStepIndex}`]} stepNo={`step${currentStepIndex}`} currentPoints={points} onNext={handleNextStep} onExit={handleCloseGame}/>
          }
          {currentStepIndex > 3 && 
            <AudioEnd points={points} token={token} onExit={handleCloseGame}/>
          }
          </View>
        </ImageBackground>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "lightblue",
    position: "relative"
  },
  wave: {
    position: "absolute",
    height: 300,
    width: "100%"
  },
  waveBottom: {
    bottom: -110,
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  playContent: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  }
});

export default AudioGame;
