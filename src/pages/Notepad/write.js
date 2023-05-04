import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const Write = ({ route }) => {
  const navigation = useNavigation();
  const [dailyRoutine, setDailyRoutine] = useState('')
  const { selectedButtons, emotionId, symbol } = route.params;

  const currentDate = new Date();
  const options = {
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

        <View style={styles.containerSelections}>

          <Text style={styles.text}>{formattedDate}</Text>

          <View style={styles.headerWrite}>

            <View style={styles.emoticons}>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => handleButtonPress()}
              >
                <Text style={styles.buttonEmoticon}>{symbol}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.selection}>

              <View style={styles.containerOptions}>
                {selectedButtons.map((text, id) => (
                  <View style={styles.selectedOptions} key={id}>
                    <Text style={styles.textOptions}>{text}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.buttonSwitch}>
                <Text style={styles.textSwitch}>Mudar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>

        <View style={styles.containerWrite}>

          <View style={styles.containerInputs}>
            <Text style={styles.title}>Como foi o seu dia?</Text>
            <TextInput
              value={dailyRoutine}
              onChangeText={value => setDailyRoutine(value)}
              placeholder='Hoje eu...'
              style={styles.input}
            />
          </View>

        </View>

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
    backgroundColor: '#8896d7'
  },

  scroll: {
    flex: 1,
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

  containerSelections: {
    marginTop: hp('1%'),
    flex: 1
  },

  text: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginStart: wp('3%'),
    color: 'white'
  },

  headerWrite: {
    flex: 1,
    flexDirection: 'row',
    marginTop: hp('1%')
  },

  emoticons: {
    paddingRight: wp('5%'),
    paddingLeft: wp('5%'),
    alignItems: 'center'
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

  selection: {
    flex: 1
  },

  selectedOptions: {
    backgroundColor: 'gray',
    height: hp('4%'),
    paddingVertical: wp('2%'),
    padding: wp('2%'),
    borderRadius: 30,
    margin: wp('0.5%'),
  },

  buttonSwitch: {
    backgroundColor: '#556aa9',
    width: wp('14%'),
    borderRadius: 50,
    paddingVertical: wp('2%'),
    marginTop: hp('1%'),
    alignItems: 'center',
  },

  textSwitch: {
    color: 'white',
  },

  textOptions: {
    color: 'white',
    fontWeight: 'bold'
  },

  containerOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  containerWrite: {
    flex: 1,
    top: hp('4%')
  },

  containerInputs: {
    flex: 1,
    paddingStart: wp('5%'),
    paddingEnd: wp('5%')
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    height: hp('10%'),
    fontSize: hp('2%')
  },

  title: {
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
    fontWeight: 'bold'
  },

});

export default Write;
