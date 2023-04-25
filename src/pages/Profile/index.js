import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/auth'

const ProfileScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  return (

    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../../assets/profile-pic.jpg')} style={styles.profilePic} />
            <Text style={styles.name}>{user.name} {user.lastName}</Text>
            <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.content}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Bio:</Text>
                <Text style={styles.infoText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lacus in nisl dictum malesuada.</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Location:</Text>
                <Text style={styles.infoText}>New York, USA</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Occupation:</Text>
                <Text style={styles.infoText}>Software Developer</Text>
            </View>

            <TouchableOpacity style={[styles.buttonSignOut]} onPress={() => signOut()}>
                <Text style={styles.buttonText}>Deslogar</Text>
            </TouchableOpacity>
        </View>
    </View>
        
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#d9d9d9',
    padding: 24,
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
  },
  button:{
    position: 'absolute',
    backgroundColor:'#3a46e4',
    borderRadius: 50,
    paddingVertical: 8,
    paddingVertical: 8,
    width:'75%',
    alignSelf:"center",
    bottom:'30%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonSignOut:{
    position: 'absolute',
    backgroundColor:'#3a46e4',
    borderRadius: 50,
    paddingVertical: 8,
    paddingVertical: 8,
    width:'75%',
    alignSelf:"center",
    bottom:'30%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:22,
    color:'#fff',
    fontWeight:'bold'
  }
});

export default ProfileScreen;
