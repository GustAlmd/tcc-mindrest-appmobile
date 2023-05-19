import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal, Platform } from 'react-native';
import { AuthContext } from '../../context/auth'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import { db } from '../../firebaseConnection';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable' 


import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, signOut, storageUser, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name)
  const [lastName, setLastName] = useState(user?.lastName)
  const [phone, setPhone] = useState(user?.phone)

  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false)

  const [image, setImage] = useState(null);


  //Atualizar Perfil
  const updateProfile = async () => {
    if (name === '' || lastName === '' || phone === '') {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const { uid } = user;
      const userRef = doc(db, 'Cadastro', uid);

      const docSnapshot = await getDoc(userRef);
      if (!docSnapshot.exists()) {
        console.log('Documento do usuário não encontrado!');
        return;
      }

      const updatedFields = {
        name,
        lastName,
        phone,
      };

      await updateDoc(userRef, updatedFields);

      let data = {
        uid: user.uid,
        name: name,
        lastName: lastName,
        phone: phone,
        email: user.email
      };

      setUser(data);
      storageUser(data);
      setOpen(false); // Fechar o modal após a atualização bem-sucedida
      setModalVisible(true);
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }

  };

  //Foto do Usuário
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (

    <View style={styles.container}>
      <TouchableOpacity />


      {
        image ?
          (
            <Animatable.View animation='fadeInDown'>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.uploadText}></Text>
                <Image
                  style={styles.avatar}
                  source={{ uri: image }}

                />
              </TouchableOpacity>
              <TouchableOpacity onPress={removeImage}>
                <Text style={styles.removeButtonText}>Remover Imagem</Text>
              </TouchableOpacity>
            </Animatable.View>
          ) :
          (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadText}>+</Text>
            </TouchableOpacity>
          )
      }

      <Text style={styles.userName} numberOfLines={1}>{user.name} {user.lastName} </Text>
      <Text style={styles.userEmail} numberOfLines={1}>{user.email}</Text>

      <TouchableOpacity style={styles.buttonChange} onPress={() => setOpen(true)}>
        <Text style={styles.buttonText}> Atualizar perfil </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonExit} onPress={() => signOut()}>
        <Text style={styles.buttonText}> Sair </Text>
      </TouchableOpacity>


      <Modal visible={open} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.buttonBack} onPress={() => setOpen(false)}>
            <Feather
              name='arrow-left'
              size={22}
              color="#fff"
            />
            <Text style={styles.buttonText}> Voltar </Text>
          </TouchableOpacity>


          <TextInput style={styles.input}
            placeholder={user?.name}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <TextInput style={styles.input}
            placeholder={user?.lastName}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <TextInput style={styles.input}
            placeholder={user?.phone}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <TouchableOpacity style={styles.buttonChange} onPress={() => { updateProfile() }}>
            <Text style={styles.buttonText}> Atualizar </Text>
          </TouchableOpacity>

        </View>
      </Modal>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Dados Atualizados com Sucesso!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {setModalVisible(false);}}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8896d7',
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
    fontSize: wp('15%'),
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
    marginTop: hp('3%'),
    fontSize: wp('7%'),
    color: '#FFF',
    fontWeight: 'bold'
  },

  userEmail: {
    marginTop: hp('2%'),
    fontSize: wp('5%'),
    color: '#DDD',
    fontStyle: 'italic'
  },

  buttonExit: {
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4040',
    width: wp('80%'),
    height: hp('5%'),
    borderRadius: 10,
  },

  buttonChange: {
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#428cfd',
    width: wp('80%'),
    height: hp('5%'),
    borderRadius: 10,
  },


  buttonText: {
    fontSize: wp('5%'),
    color: '#fff',
    fontWeight: 'bold'
  },

  modalContainer: {
    width: wp('100%'),
    height: hp('52%'),
    backgroundColor: '#556aa9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },

  buttonBack: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    width: wp('90%'),
    height: hp('6%'),
    backgroundColor: '#DDD',
    borderRadius: 10,
    padding: hp('1%'),
    margin: hp('1.5%'),
    fontSize: wp('5%'),
    textAlign: 'center',
  },

  removeButtonText: {
    marginTop: 20,
    marginLeft: 39,
    marginRight: 20,
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold'
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#556aa9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

})

export default ProfileScreen;
