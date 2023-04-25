import React, { createContext, useState, useEffect } from "react";
import { auth, db } from '../firebaseConnection';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [ user, setUser ] = useState(null);
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, []);

    async function signIn(email, password){
        await signInWithEmailAndPassword(auth, email, password)
          .then(async (value)=>{
            let uid = value.user.uid;
            let userDocRef = doc(db, "Cadastro", uid); 
            await getDoc(userDocRef)
              .then((doc)=>  {
                if (doc.exists()) {
                  let dados = {
                    uid: uid,
                    name: doc.data().name,
                    lastName: doc.data().lastName,
                    phone: doc.data().phone,
                    email: value.user.email
                  };
                  setUser(dados);
                  storageUser(dados);
                }
                else {
                  alert('Não foram encontrados dados para o email fornecido.');
                }
              })
          })
          .catch((error)=>{
            alert(error.code);
          })
      }
      
      
    //Cadastrar usuário
    async function signUp(data){
        await createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (value) => {
            // Usuário criado com sucesso
            let uid = value.user.uid;
            const userDb = collection(db, 'Cadastro');
            const userDoc = doc(userDb, uid);
            setDoc(userDoc, {
              name: data.name,
              lastName: data.lastName,
              phone: data.phone,
              email: data.email,
              password: data.password
            })
            .then(()=>{
                alert("Cadastro realizado com sucesso!");
                navigation.navigate('SignIn');
            })
          })
          .catch((error) => {
            // Erro ao criar usuário
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
          });
      }

      async function storageUser(dados){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(dados));
      }

      async function signOut(){
        await auth.signOut();
        await AsyncStorage.clear()
        .then( ()=>{
          setUser(null);
        })
      }
      
      
    return(
        <AuthContext.Provider value={ {signed: !!user, user, loading, signUp, signIn, signOut} }>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;