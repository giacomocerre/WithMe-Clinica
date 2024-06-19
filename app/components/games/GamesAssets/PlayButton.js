import React, { useRef } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { Icon } from '../../atoms';
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from '../../../../stylesheets/theme';

const PlayButton = ({text, onPlay}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    }).start();
    onPlay()
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Animated.View
        style={{
          backgroundColor: 'red',
          borderRadius: 100,
          paddingHorizontal: 40,
          paddingVertical: 40,
          transform: [{ scale: scaleValue }],
        }}
      >
        <Icon icon="play" size={50} color={COLORS.light.first}/>
      </Animated.View>
      {text && <Text style={[SHADOW.normal,{textAlign:"center", marginTop:20, fontSize:TYPOGRAPHY.title.l, color:COLORS.light.first, fontFamily:FONTS.poetsen}]}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default PlayButton;
