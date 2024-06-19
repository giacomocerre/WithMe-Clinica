import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Text, ActivityIndicator } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import { COLORS, FONTS, TYPOGRAPHY } from '../../../../../../stylesheets/theme';

const DocPhoto = ({ docs }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Array(docs.media.length).fill(false));

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
    setIsVisible(true);
  };

  const handleImageLoad = (index) => {
    const newLoadedImages = [...loadedImages];
    newLoadedImages[index] = true;
    setLoadedImages(newLoadedImages);
  };

  const allImagesLoaded = loadedImages.every(Boolean);

  const numColumns = 2;
  const imageWidth = (Dimensions.get('window').width / numColumns) - 50;

  return (
    <View style={styles.container}>
      <View style={{marginBottom:30}}>
          <Text style={{fontFamily:FONTS.bold, fontSize:TYPOGRAPHY.title.l}}>{docs.title}</Text>
          <Text style={{fontFamily:FONTS.medium, fontSize:TYPOGRAPHY.paragraph, marginVertical:10}}>{docs.description}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.grid}>
          {docs.media.map((m, index) => (
            <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
              <Image
                source={m}
                style={[styles.image, { width: imageWidth, height: imageWidth, borderRadius:10 }]}
                onLoad={() => handleImageLoad(index)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <ImageViewing
        images={docs.media.map((m) => m)}
        imageIndex={currentImageIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
      {!allImagesLoaded && (
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
  image: {
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

export default DocPhoto;
