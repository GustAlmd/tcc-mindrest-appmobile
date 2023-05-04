import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/auth'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProfileScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  return (

    <View style={styles.container}>

        <Text style={styles.name}>{user.name} {user.lastName}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity style={[styles.buttonEdit]}>
          <Text style={styles.textEdit}>Editar Perfil</Text>
        </TouchableOpacity>
           
        <TouchableOpacity style={[styles.buttonSignOut]} onPress={() => signOut()}>
          <Text style={styles.textLogout}>Sair da Conta</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8896d7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: 25,
    marginBottom: 5,
    color: '#fff'
  },
  email: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 1,
    marginBottom: 25,
  },
  buttonEdit:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b94a',
    width: '90%',
    height: 45,
    borderRadius: 10,
    marginBottom: 10
  },
  buttonSignOut:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c62c36',
    width: '90%',
    height: 45,
    borderRadius: 10
  },
  textLogout:{
    fontSize:22,
    fontWeight:'bold'
  },
  textEdit:{
    fontSize:22,
    color:'#fff',
    fontWeight:'bold'
  }
});

export default ProfileScreen;
