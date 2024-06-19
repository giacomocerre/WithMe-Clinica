import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { COLORS, FONTS, SHADOW, TYPOGRAPHY } from '../../../../../stylesheets/theme';

const AudioEnd = ({ points, onExit }) => {
    const prizeAnimation = useRef(new Animated.Value(0)).current;
    const buttonAnimation = useRef(new Animated.Value(0)).current;
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setShowConfetti(true);
        const animationTimeout = setTimeout(() => {
            Animated.parallel([
                Animated.spring(prizeAnimation, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonAnimation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }, 100); // Adjust the delay as needed

        return () => clearTimeout(animationTimeout);
    }, []);

    const handlerClose = () => {
        onExit();
    };

    const prizeStyle = {
        transform: [
            {
                scale: prizeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1]
                })
            }
        ],
        opacity: prizeAnimation,
    };

    const buttonStyle = {
        transform: [
            {
                translateY: buttonAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                })
            }
        ],
        opacity: buttonAnimation,
    };

    return (
        <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            {showConfetti && (
                <ConfettiCannon
                    count={200}
                    origin={{ x: -10, y: 0 }}
                    fadeOut={true}
                />
            )}
            <Animated.View style={prizeStyle}>
                <ImageBackground 
                    source={require("../../../../../assets/img/prizeStar.png")} 
                    style={[SHADOW.normal, { width: 300, height: 300, position: "relative", bottom: 100 }]}
                />
                <View style={{backgroundColor:"red", position: "relative", bottom:150, padding:20, borderRadius:10}}>
                <Text 
                    style={{ 
                        fontFamily: FONTS.poetsen, 
                        color: COLORS.light.first, 
                        fontSize: TYPOGRAPHY.title.xxl, 
                        textAlign:"center",
                    }}>
                    Completato!
                </Text>
                </View>
            </Animated.View>
            <Animated.View style={buttonStyle}>
                <TouchableOpacity onPress={handlerClose}>
                    <ImageBackground 
                        source={require("../../../../../assets/img/exitCartoon.png")} 
                        style={[SHADOW.normal, { width: 100, height: 100 }]}
                    />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default AudioEnd;
