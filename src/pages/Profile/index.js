import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Modal, Platform } from 'react-native';
import { AuthContext } from '../../context/auth'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { db } from '../../firebaseConnection';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const { user, signOut, storageUser, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name)
  const [lastName, setLastName] = useState(user?.lastName)
  const [phone, setPhone] = useState(user?.phone)

  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false)

  //Atualizar Perfil
  const updateProfile = async () => {
    if (name === '' || lastName === '' || phone === '') {
      console.log('Todos os campos são obrigatórios!');
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

      let data ={
        uid: user.uid,
        name: name,
        lastName: lastName,
        phone: phone,
        email: user.email
      };
  
      setUser(data);
      storageUser(data);
      alert('Perfil atualizado com sucesso!');
      setOpen(false); // Fechar o modal após a atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }

  };

  //Foto do Usuário
  const uploadFiles = () => {

    const options = {
      noData: true,
      mediaType: 'photo'
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('cancelou o modal');
      } else if (response.error) {
        console.log('Erro' + response.errorMessage);
      } else {
        uploadFileFirebase(response)
      }
    })
  }

  const getFileLocalPath = response => {
    const { path, uri } = response;
    return Platform.OS === 'android' ? path : uri;
  }

  const uploadFileFirebase = async response => {
    const fileSource = getFileLocalPath(response)
  }

  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.header} />


      {
        url ?
          (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadFiles}>
              <Text style={styles.uploadText}>+</Text>
              <Image
                style={styles.avatar}
                source={{ uri: url }}
              />
            </TouchableOpacity>
          ) :
          (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadFiles}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8896d7',
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
    color: '#fff',
    fontWeight: 'bold'
  },

  modalContainer: {
    width: '100%',
    height: '52%',
    backgroundColor: '#556aa9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },

  buttonBack: {
    position: 'absolute',
    top: 18,
    left: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#DDD',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    fontSize: 20,
    textAlign: 'center'
  },



})

export default ProfileScreen;
