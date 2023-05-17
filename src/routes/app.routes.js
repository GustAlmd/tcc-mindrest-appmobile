import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';

import Home from "../pages/Home";
import Music from '../pages/Music';
import Profile from '../pages/Profile';
import Games from '../pages/Games/index';
import Ansiedade from '../pages/Games/ansiedadeGame';
import Concentracao from '../pages/Games/concentracaoGame'
import Notepad from '../pages/Notepad/index';
import Write from '../pages/Notepad/write';
import SelectButtons from '../pages/Notepad/selectButtons';
import SwitchEmotion from '../pages/Notepad/switchEmotion';
import ChooseEmotion from "../pages/Notepad/chooseEmotion";

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppRoutes(){
    return(
        <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name="HomeMain" component={TabNavigator}/>
        </AppStack.Navigator>
    );
}

function TabNavigator() {
    return (
      <Tab.Navigator initialRouteName="Home"
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#556aa9',
          borderTopColor: 'transparent'
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#8896d7'
       }}>

        <Tab.Screen
        name="Início" 
        component={HomeNavigation} 
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='home'size={size} color={color} focused={focused} />
          )
        }}
        />
    
        <Tab.Screen 
        name="Músicas" 
        component={MusicNavigation} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="music" size={size} color={color} />
          )
        }}
        />
  
        <Tab.Screen 
        name="Jogos" 
        component={GamesNavigation}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="play" size={size} color={color} />
          )
        }}
        />
            
        <Tab.Screen 
        name="Diário" 
        component={NotepadNavigation} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="book" size={size} color={color} />
          )
        }}
        />
  
        <Tab.Screen 
        name="Configurações"
        component={ProfileNavigation} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="settings" size={size} color={color} />
          )
        }}
        />
  
      </Tab.Navigator>
    );
  }

  function HomeNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="HomeScreen" component={Home} 
          options={{
            headerShown: true,
            title: 'MindRest',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#556aa9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
  
              fontWeight: 'bold',
            },
          }}
        />
      </AppStack.Navigator>
    );
  }
  
  function GamesNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Games" component={Games} 
          options={{
            headerShown: true,
            title: 'MindRest',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#556aa9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
  
              fontWeight: 'bold',
            },
          }}
        />
        <AppStack.Screen name="Ansiedade" component={Ansiedade}
           options={{
            headerShown: true,
            title: 'MindRest',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#556aa9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
  
              fontWeight: 'bold',
            },
          }}
        />
        <AppStack.Screen name="Concentracao" component={Concentracao} 
           options={{
            headerShown: true,
            title: 'MindRest',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#556aa9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
  
              fontWeight: 'bold',
            },
          }}
        />
      </AppStack.Navigator>
    );
  }
  
  function MusicNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Music" component={Music} 
          options={{
            headerShown: true,
            title: 'MindRest',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#556aa9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
  
              fontWeight: 'bold',
            },
          }}
        />
      </AppStack.Navigator>
    );
  }
  
  function NotepadNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen 
          name="Notepad" 
          component={Notepad} 
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: 'Conte e Registre Seus Sentimentos',
            headerStyle: {
              backgroundColor: '#556aa9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
          },
          }}
        />
        <AppStack.Screen name="SelectButtons" component={SelectButtons} />
        <AppStack.Screen name="Write" component={Write} />
        <AppStack.Screen name="ChooseEmotion" component={ChooseEmotion} />
        <AppStack.Screen name="SwitchEmotion" component={SwitchEmotion} />
      </AppStack.Navigator>
    );
  }
  
  function ProfileNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            headerShown: true,
            title: 'Configurações da Conta',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#556aa9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
          },
          }}/>
      </AppStack.Navigator>
    );
  }

export default AppRoutes;