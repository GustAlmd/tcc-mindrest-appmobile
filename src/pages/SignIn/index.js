import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  function handleLogin(){
    signIn(email, password);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Animatable.Text animation='fadeInLeft' delay={500} style={styles.message}>Bem-vindo(a)</Animatable.Text>
        <Animatable.Image
          source={require('../../assets/vetorSingIn.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMod='contain'
          animation='fadeInUp'
        />
      </View>
      <KeyboardAwareScrollView style={styles.KeyboardAwareScrollView}>
        <Animatable.View animation='fadeInUp' style={styles.containerForm}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder='Digite seu email...'
            style={styles.input}
            keyboardType="email-address"
          />

          <View>
            <Text style={styles.title}>Senha</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={!showPassword}
                placeholder='Digite sua senha...'
                style={[styles.input, styles.passwordInput]}
              />
              <TouchableOpacity style={styles.passwordToggle} onPress={togglePasswordVisibility}>
                <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color='#a1a1a1' />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button}  onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonRegister, { marginTop: 15 }]}>
            <Text style={styles.registerText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonRegister, { marginTop: 10 }]} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
          </TouchableOpacity>

        </Animatable.View>
      </KeyboardAwareScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3a46e4'
  },
  containerHeader: {
    flex: 1,
    marginTop: '5%',
    marginBottom: '15%',
    paddingStart: '5%'
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 17,
    marginTop: 28,
    fontWeight: 'bold'
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  passwordInput: {
    flex: 1
  },
  passwordToggle: {
    position: 'absolute',
    right: 0,
    paddingBottom:10 
  },
  button: {
    backgroundColor: '#3a46e4',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  },
  icon: {
    position: 'absolute',
    top: 12,
    right: 0,
    zIndex: 1
  },
  KeyboardAwareScrollView:{
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  }
})