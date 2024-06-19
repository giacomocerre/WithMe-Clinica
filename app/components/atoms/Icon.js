import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { FONTS, TYPOGRAPHY } from '../../../stylesheets/theme';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const Icon = ({ action, icon, size, color, text, fontSize, fontFamily, iconSet }) => {
    const iconSets = {
        Ionicons: require('@expo/vector-icons').Ionicons,
        AntDesign: require('@expo/vector-icons').AntDesign,
        MaterialIcons: require('@expo/vector-icons').MaterialIcons,
        MaterialCommunityIcons: require('@expo/vector-icons').MaterialCommunityIcons,
        Entypo: require('@expo/vector-icons').Entypo,
        Foundation: require('@expo/vector-icons').Foundation
    };

    const IconComponent = iconSets[iconSet] || iconSets['Ionicons']; 


    if (action) {
        return (
            <Pressable onPress={action} style={{ flexDirection: 'row' }}>
                <IconComponent name={icon} size={size} color={color} />
                {text ? <Text style={{ color: color, marginTop: 6, marginLeft: 6 }}>{text}</Text> : null}
            </Pressable>
        );
    } else {
        return (
            <View style={{ flexDirection: 'row' }}>
                <IconComponent
                    name={icon}
                    size={size}
                    color={color}
                />
                {text ? (
                    <Text
                        style={{
                            color: color,
                            fontSize: fontSize ? fontSize : TYPOGRAPHY.paragraph,
                            fontFamily: fontFamily ? fontFamily : FONTS.regular,
                            marginTop: 6,
                            marginLeft: 6,
                        }}
                    >
                        {text}
                    </Text>
                ) : null}
            </View>
        );
    }
};

export default Icon;
