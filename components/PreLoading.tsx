import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useCallback} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function PreLoading({ navigation }) {
  
  var token = null

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('@Token')
      .then((value) => {
          //var name = value?.split(' ')[0]
          token = value
      });

      var timer = setInterval(function() {
        if(token){
          navigation.navigate('Home')
        }else{
          navigation.navigate('Starter')
        }
        clearInterval( timer );
      }, 2000);

    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" barStyle="dark-content" hidden={true}/>
      <View style={styles.main}>
        <Text style={styles.logo}>Tah Seguro</Text>
      </View>
      <View style={styles.main_2}>
        <LottieView
          source={require("../assets/animation/animation_3.json")}
          autoPlay
          loop
          style={styles.animationView}
        />
      </View>
    </View>
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
    justifyContent: 'flex-end',
  },
  main_2:{
    flex: 2, 
    display: "flex",
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  img: {
    height: '50%',
    width: '100%',  
    backgroundColor: 'red',
    resizeMode: 'contain',
  },
  logo: {
    fontSize: 40,
    color: '#FD5266',
    fontWeight: 'bold'
  },
  txt_white_color: {
    color: 'white',
  },
  txt_gray_color: {
    color: '#58656D',
  },
  animationView:{
    width: '100%',
  }
});
