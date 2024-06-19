import { View, Text } from 'react-native';
import React from 'react';
import AudioGame from "../../../components/games/viewer/AudioGame/AudioGame"

const GameComponents = {
  audio: AudioGame,
};

const GameMain = ({ navigation, route }) => {
  const { activity, token } = route.params;

  const ComponentToRender = GameComponents[activity.type];

  return (
    <View>
      {ComponentToRender ? <ComponentToRender activity={activity} token={token} onExit={() => navigation.goBack()} /> : <Text>No component available for this activity type.</Text>}
    </View>
  );
};

export default GameMain;
