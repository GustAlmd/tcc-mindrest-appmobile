import React from 'react';
import { View, Text } from 'react-native';

const Write = ({ route }) => {
  const { buttonId } = route.params;

  return (
    <View>
      <Text>O que você fez hoje que te deixou {buttonId} ?</Text>
    </View>
  );
};

export default Write;
