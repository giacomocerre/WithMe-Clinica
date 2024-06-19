import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Text, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { COLORS, FONTS, TYPOGRAPHY } from '../../../../../../stylesheets/theme';

const DocVideo = ({ docs }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState(new Array(docs.media.length).fill(false));
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPress = (index) => {
    setCurrentVideoIndex(index);
    setIsVisible(true);
  };

  const handleVideoLoad = (index) => {
    const newLoadedVideos = [...loadedVideos];
    newLoadedVideos[index] = true;
    setLoadedVideos(newLoadedVideos);
  };

  const allVideosLoaded = loadedVideos.every(Boolean);

  const numColumns = 1;
  const videoWidth = (Dimensions.get('window').width / numColumns)-80;

  const enterFullScreen = () => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
      setIsFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    setIsFullScreen(false);
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isPlaying && !isFullScreen) {
      enterFullScreen();
    }
  };

  const handleVideoSwitch = () => {
    if (isFullScreen) {
      exitFullScreen();
      setTimeout(() => {
        enterFullScreen();
      }, 1000); // Delay to ensure full-screen mode is properly exited before entering again
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom:30}}>
          <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}}>{docs.title}</Text>
          <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.paragraph, marginVertical:10}}>{docs.description}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.grid}>
          {docs.media.map((videoSource, index) => (
            <TouchableOpacity key={index} onPress={() => handleVideoPress(index)}>
              <Video
                ref={videoRef}
                source={videoSource}
                style={[styles.video, { width: videoWidth, height: videoWidth * 0.56, borderRadius:10 }]} // Assuming aspect ratio of 16:9
                onLoad={() => handleVideoLoad(index)}
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                useNativeControls={true}
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                onSwitch={handleVideoSwitch}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {!allVideosLoaded && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" style={{position:"absolute", top:20}} />
          <View style={{ backgroundColor: COLORS.main.first, padding: 20, borderRadius: 100, width:"90%", position:"absolute", top:80}}>
            <Text style={styles.loaderText}>Stiamo scaricando il materiale che ti sarà utile...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  video: {
    marginBottom: 10,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f2f2f2", // Sfondo semi-trasparente
  },
  loaderText: {
    fontFamily: FONTS.medium,
    fontSize: TYPOGRAPHY.text.l,
    color: COLORS.light.first,
  },
});

export default DocVideo;
