import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, TouchableHighlight, Keyboard} from 'react-native';
import Login from './Login';
import RecoverPassword from './RecoverPassword';

export default function Starter({navigation}) {

  var randomImages = [
    require('../assets/images/travel_1.png'),
    require('../assets/images/travel_2.png'),
    require('../assets/images/travel_3.png'),
    require('../assets/images/travel_4.png'),
    require('../assets/images/travel_5.png'),
    require('../assets/images/travel_6.png'),
  ];

  const [image,setImage] = useState(randomImages[Math.floor(Math.random() * 4)])
  const [modalLogin,setModalLogin] = useState(false)
  const [modalClose,setModalClose] = useState(false)

  function onPressLearnMore () {
    setModalLogin(true)
  }

  function RecoverPassword(){
    Keyboard.dismiss()
    setModalLogin(false)
    var timer = setInterval(function() {
      navigation.navigate('RecoverPassword')
      clearInterval( timer );
    }, 400);
  }

  function Close() {
    setModalLogin(false)
    Keyboard.dismiss()
  }

  return (
    <>
    <Login visible={modalLogin} Close={() => Close()} RecoverPassword={() => RecoverPassword()}/>
    <View style={styles.container}>
      <StatusBar style="dark" hidden={false}/>
      
      <View style={styles.main}>
        <Text style={styles.logo}>Tah Seguro</Text>
        <Text style={styles.sublogo}>Sua viagem sempre segura</Text>
      </View>
      <View style={styles.main_2}>
        <Image
          style={styles.img}
          source={(image)}   
        />  
      </View>
      <View style={styles.main_3}>
        <TouchableHighlight style={styles.entrar} underlayColor="white" onPress={onPressLearnMore} accessibilityLabel="Entrar">
          <Text style={styles.txt_white_color}>Entrar</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.registrar} underlayColor="white" onPress={() => navigation.navigate('Register')} accessibilityLabel="Registrar">
          <Text style={styles.txt_gray_color}>Criar uma conta</Text>
        </TouchableHighlight>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: "flex",
  },
  main:{
    flex: 1, 
    display: "flex",
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_2:{
    flex: 1, 
    display: "flex",
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  main_3:{
    flex: 1, 
    display: "flex",
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  entrar:{
    backgroundColor: '#FD5266',
    borderRadius: 100,
    padding: 15,
    margin: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '-40%'
  },
  registrar:{
    backgroundColor: 'transparent',
    borderRadius: 100,
    padding: 15,
    margin: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: 'gray',
    marginLeft: '40%'
  },
  img: {
    height: '100%',
    width: '100%',  
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0, 
    resizeMode: 'contain',
  },
  logo: {
    fontSize: 40,
    color: '#FD5266',
    fontWeight: 'bold'
  },
  sublogo: {
    fontSize: 20,
    color: 'gray',
  },
  txt_white_color: {
    color: 'white',
  },
  txt_gray_color: {
    color: '#58656D',
  }
});