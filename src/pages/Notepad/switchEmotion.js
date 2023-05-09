import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const expressions = [
    { id: 'feliz', symbol: '😀' },
    { id: 'triste', symbol: '😔' },
    { id: 'irritado', symbol: '😠' },
    { id: 'pensativo', symbol: '🤔'},
];

const SwitchEmotion = ({ route }) => {
    const navigation = useNavigation();
    const { selectedButtons, emotionId, symbol } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.containerEmotion}>
                <Text style={styles.title}>Sentimento Selecionado:</Text>
                <View style={styles.roundButton}>
                    <Text style={styles.buttonEmoticon}>{symbol}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8896d7',
    },
    containerEmotion:{

    },
    title:{

    },
    roundButton: {
        height: hp('7%'),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      buttonEmoticon: {
        fontSize: wp('8.5%'),
      },
});

export default SwitchEmotion;
