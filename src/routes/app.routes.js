import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';

import Home from "../pages/Home";
import Music from '../pages/Music';
import Notepad from '../pages/Notepad';
import Profile from '../pages/Profile';
import Games from '../pages/Games';

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
          backgroundColor: '#3a46e4',
          borderTopColor: 'transparent'
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black'
       }}>

        <Tab.Screen
        name="Home" 
        component={HomeNavigation} 
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name='home'size={size} color={color} focused={focused} />
          )
        }}
        />
    
        <Tab.Screen 
        name="Musicas" 
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
        name="Perfil"
        component={ProfileNavigation} 
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          )
        }}
        />
  
      </Tab.Navigator>
    );
  }

  function HomeNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="HomeScreen" component={Home} />
      </AppStack.Navigator>
    );
  }
  
  function GamesNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Games" component={Games} />
      </AppStack.Navigator>
    );
  }
  
  function MusicNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Music" component={Music} />
      </AppStack.Navigator>
    );
  }
  
  function NotepadNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Notepad" component={Notepad} />
      </AppStack.Navigator>
    );
  }
  
  function ProfileNavigation() {
    return (
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Profile" component={Profile} />
      </AppStack.Navigator>
    );
  }

export default AppRoutes;