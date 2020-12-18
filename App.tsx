import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, TouchableHighlight} from 'react-native';

import Starter from './components/Starter';
import PreLoading from './components/PreLoading';
import Register from './components/Register';
import RecoverPassword from './components/RecoverPassword';
import Home from './components/Home';
import Perfil from './components/Perfil';
import Viagem from './components/Viagem';
import DataIda from './components/DataIda';
import DataRetorno from './components/DataRetorno';
import Passageiros from './components/Passageiros';
import CalcularViagem from './components/CalcularViagem';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PreLoading" component={PreLoading} />
        <Stack.Screen name="Starter" component={Starter} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Viagem" component={Viagem} />
        <Stack.Screen name="DataIda" component={DataIda} />
        <Stack.Screen name="DataRetorno" component={DataRetorno} />
        <Stack.Screen name="Passageiros" component={Passageiros} />
        <Stack.Screen name="CalcularViagem" component={CalcularViagem} />

      </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default App;

/*
export default function App() {

  return (
    <>
      <PreLoading> 
        <Starter></Starter>
      </PreLoading>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: "flex",
  },
});
*/


// PODE SER COLOCADO EM CADA ROTA

/*
  options={{headerShown: false}}
*/