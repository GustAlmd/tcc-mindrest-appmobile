import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Write = ({ route }) => {
  const { buttonId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textHeader}>O que te deixou {buttonId} ?</Text>
      <View style={styles.containerWrite}>
        <Text style={styles.textWrite}>Social</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Família</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Amigos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Escola</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 2}]}>
            <Text style={styles.textButton}>Relacionamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Trabalho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Outros</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerWrite}>
        <Text style={styles.textWrite}>Sono</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Família</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Amigos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Escola</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 2}]}>
            <Text style={styles.textButton}>Relacionamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Trabalho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Outros</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerWrite}>
        <Text style={styles.textWrite}>Social</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Família</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Amigos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Escola</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 2}]}>
            <Text style={styles.textButton}>Relacionamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Trabalho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Outros</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerWrite}>
        <Text style={styles.textWrite}>Social</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Família</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Amigos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Escola</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 2}]}>
            <Text style={styles.textButton}>Relacionamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Trabalho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Outros</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerWrite}>
        <Text style={styles.textWrite}>Social</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Família</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Amigos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Escola</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttons, {flex: 2}]}>
            <Text style={styles.textButton}>Relacionamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Trabalho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, {flex: 1}]}>
            <Text style={styles.textButton}>Outros</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8896d7',
    width: wp('100%'),
    height: hp('100%'),
  },

  textHeader:{
    paddingStart: wp('4%'),
    paddingTop: wp('5%'),
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: 'white'
  },

  containerWrite:{
    borderBottomColor:'white',
    border: 1
  },

  textWrite:{
    paddingStart: wp('4%'),
    paddingTop: wp('5%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'white'
  },

  buttons:{
    height: hp('4.5%'),
    borderRadius: 20,
    backgroundColor: '#556aa9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: hp('1%'),
  },
  
  containerButtons:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  textButton:{
    fontWeight:'bold',
    color:'white'
  }

});

export default Write;
