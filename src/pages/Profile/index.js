import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AuthContext } from '../../context/auth'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false)

  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.header} />


      {
        url ?
          (
            <TouchableOpacity style={styles.uploadButton} onPress={() => alert('CLICOU')}>
              <Text style={styles.uploadText}>+</Text>
              <Image
                style={styles.avatar}
                source={{ uri: url }}
              />
            </TouchableOpacity>
          ) :
          (
            <TouchableOpacity style={styles.uploadButton} onPress={() => alert('CLICOU')}>
              <Text style={styles.uploadText}>+</Text>
            </TouchableOpacity>
          )
      }

      <Text style={styles.userName} numberOfLines={1}>{user.name}</Text>
      <Text style={styles.userEmail} numberOfLines={1}>{user.email}</Text>

      <TouchableOpacity style={styles.buttonChange} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}> Atualizar perfil </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonExit} onPress={() => signOut()}>
        <Text style={styles.buttonText}> Sair </Text>
      </TouchableOpacity>

      <Modal visible={open} animationType='slide' transparent={true}>
        <Modal style={styles.modalContainer}>
          <TouchableOpacity style={styles.buttonBack} onPress={() => setOpen(false)}>
            <Feather
              name='arrow-left'
              size={22}
              color="#121212"
            />
            <Text style={styles.buttonText}> Voltar </Text>
          </TouchableOpacity>

          <TextInput style={styles.input}
            placeholder="Seu Nome"
          />

          <TouchableOpacity style={styles.buttonChange} onPress={() => {}}>
            <Text style={styles.buttonText}> Atualizar </Text>
          </TouchableOpacity>

        </Modal>
      </Modal>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8896d7'

  },

  header: {

  },

  uploadButton: {
    marginTop: '20%',
    backgroundColor: '#fff',
    width: 165,
    height: 165,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5
  },

  uploadText: {
    zIndex: 9,
    position: 'absolute',
    fontSize: 55,
    color: '#e52246',
    opacity: 0.4
  },

  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.9
  },

  userName: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold'
  },

  userEmail: {
    marginTop: 9,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: '#DDD',
    fontStyle: 'italic'
  },

  buttonExit: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4040',
    width: '80%',
    height: 45,
    borderRadius: 10,
  },

  buttonChange: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#428cfd',
    width: '80%',
    height: 45,
    borderRadius: 10,
  },


  buttonText: {
    fontSize: 20,
    color: '#000',
    fontStyle: 'italic'
  },

  modalContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  buttonBack: {
    position: 'absolute',
    top: 15,
    left: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
   
    backgroundColor: '#DDD',
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ProfileScreen;
