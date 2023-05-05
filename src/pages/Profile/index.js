import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/auth'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProfileScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  const [url, setUrl] = useState(null);

  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.header} />

      {
        url ?
          (
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadText}>+</Text>
              <Image
                style={styles.avatar}
                source={{ uri: url }}
              />
            </TouchableOpacity>
          ) :
          (
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadText}>+</Text>
            </TouchableOpacity>
          )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#8896d7'

  },

  header:{

  },

  uploadButton:{
    marginTop: '20%',
    backgroundColor: '#fff',
    width: 165,
    height: 165,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5
  },

  uploadText:{
    zIndex: 9,
    position: 'absolute',
    fontSize: 55,
    color: '#e52246',
    opacity: 0.4
  },

  avatar:{
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.9
  }

})

export default ProfileScreen;
