import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Write = ({ route }) => {
  const { emotionId } = route.params;
  const [selectedButtons, setSelectedButtons] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8896d7',
    width: wp('100%'),
    height: hp('100%'),
  },

  title:{
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default Write;
