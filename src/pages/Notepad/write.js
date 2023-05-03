import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const Write = ({ route }) => {
  const navigation = useNavigation();
  const { selectedButtons, emotionId, symbol } = route.params;

  const currentDate = new Date();
  const options = {
    weekday: 'long', // dia da semana por extenso (ex: "segunda-feira")
    year: 'numeric', // ano com quatro dígitos (ex: "2023")
    month: 'long', // nome do mês por extenso (ex: "abril")
    day: 'numeric', // dia do mês (ex: "27")
    locale: 'pt-BR' // idioma e região (Português do Brasil)
  };

  const buttonBack = (emotionId, symbol) => {
    navigation.navigate('SelectButtons', { emotionId, symbol });
  };

  const formattedDate = currentDate.toLocaleDateString('pt-BR', options); // formata a data atual em português


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.touchableContainer}>
          <TouchableOpacity onPress={() => buttonBack(emotionId, symbol)}>
            <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={24} color="#556aa9" />
          </TouchableOpacity>
        </View>

      </View>

      <ScrollView style={styles.scroll}>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonFooter} >
          <Text style={styles.textButton}>Salvar</Text>
        </TouchableOpacity>
      </View>

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

  scroll: {
    flex: 1,
    marginBottom: hp('6%')
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('7%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  buttonFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('20%'),
    height: hp('5%'),
    borderRadius: 50,
    backgroundColor: '#3c4383',
    marginEnd: wp('2.5%'),
  },

  header: {
    height: hp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  touchableContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginStart: wp('4%'),
  },

  textButton: {
    fontWeight: 'bold',
    color: 'white'
  },

});

export default Write;
