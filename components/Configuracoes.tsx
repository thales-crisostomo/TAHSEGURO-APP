import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, TouchableHighlight, Alert, Keyboard, Linking, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather, AntDesign, Octicons } from '@expo/vector-icons'; 
import { BlurView } from 'expo-blur';

const url = "https://41lh09l2zk.execute-api.us-east-1.amazonaws.com/prod/"

export default function Configuracoes(props) {
  const navigation = useNavigation();
  const loadingAnimation = useRef(null);
  function Login () {
    setFlexAuto(1);
    Keyboard.dismiss();
    setLoading('flex');
    setConteudo('none');
    loadingAnimation.current.reset();
    loadingAnimation.current.play();
    fetch( url + 'v1/user/signin', {
        method: 'POST',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.toLowerCase(),
          password: password,
        }),
    }).then((response) => response.json()).then(async (responseJson) => {
        if(responseJson.message == "Usuário ou senha inválidos."){
            return Error()
        }
        if(responseJson.message == "Logado com sucesso!"){
            await AsyncStorage.setItem('@Token', responseJson.User.token);
            await AsyncStorage.setItem('@Email', responseJson.User.email);
            await AsyncStorage.setItem('@UserId', responseJson.User.userid);
            //await AsyncStorage.setItem('@Name', 'responseJson.User.name');
            await AsyncStorage.setItem('@Name', responseJson.User.userid);
            return Sucess()
        }
    })
    .catch(async(error) => {
        console.log(error)
    });
  }

  function Sucess(){
    props.Close()
    setLoading('none');
    setConteudo('block');
    setFlexAuto(1);
    navigation.navigate('Home')
  }

  function Error(){
    setLoading('none');
    setConteudo('block');
    setFlexAuto(1);
    Alert.alert(
      "Ops!",
      "Usuário e/ou senha inválidos.",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(false);
  const [password, setPassword] = useState(false);
  const [flexAuto, setFlexAuto] = useState(1);
  const [loading, setLoading] = useState('none');
  const [conteudo, setConteudo] = useState('block');
  const [name, setName] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('@Name')
    .then((value) => {
        setName(value.split(' ')[0])
    });
  }, []);

  async function Sair() {
     await AsyncStorage.setItem('@Token', '');
     navigation.navigate('PreLoading');
     props.Close()
  }

  function ToPerfil(){
    props.Close()
    var timer = setInterval(function() {
        navigation.navigate('Perfil');
        clearInterval( timer);
    }, 400);
  }

  return (
    <View>
      <Modal
        //animationIn={'fadeIn'}
        //animationOut={'fadeOut'}
        backdropColor={'#FD5266'}
        backdropTransitionInTiming={500}
        isVisible={props.visible}
        style = {{padding: 0, margin: 0}}
        onBackButtonPress = {() => {
            props.Close()
         }}
        onModalWillHide={() => {
           props.Close()
        }}
       // swipeThreshold ={200}
        //onSwipeStart = {() => Keyboard.dismiss()}
        //onSwipeComplete = {() => props.Close()}
        //swipeDirection = {['down']}
      >
         <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: '#FD5266'}}>
            <View style={styles.centeredView}>
                <View style={{color: 'white', display: 'flex', flexDirection: 'row', paddingBottom: 5, padding: 10}}>
                    <View style={{flex: 2,  display: 'flex', justifyContent: 'center'}}>
                        {/*<Text style={{fontSize: 25, color: 'tomato', color: 'white', fontWeight: 'bold'}}>Olá, Thales</Text>*/}
                    </View>
                    <View style={{flex: 1, display:'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                        <TouchableHighlight style={{padding: 10, borderRadius: 1000, backgroundColor: 'rgba(255,255,255,0.3)'}} onPress={()=> props.Close()} activeOpacity={1} underlayColor="rgba(255,255,255,0.5)">
                           <AntDesign name="down" size={20} color="white" />
                        </TouchableHighlight>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{padding: 10,}}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: 100, height: 100, borderRadius: 100, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                            <Image source = {require('../assets/images/papainoel.png')} style={{height: 100, width: 100, resizeMode: 'contain',}} />
                        </View>
                        <Text style={{color: 'white', fontSize: 25, margin: 10}}>{name}</Text>
                    </View>
                    <View style={{marginTop: '10%'}}/>
                    <TouchableHighlight activeOpacity={1} underlayColor="rgba(255,255,255,0.1)" style={{width: '100%', padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: 'white'}} onPress={()=> ToPerfil()}>
                        <>
                            <Feather name="user" size={24} color="white" style={{margin: 5}}/>
                            <Text style={{color: 'white'}}>Meus dados</Text>
                        </>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={1} onPress={() => Linking.openURL('http://google.com')} underlayColor="rgba(255,255,255,0.1)" style={{width: '100%', padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 0.5}}>
                        <>
                            <AntDesign name="mobile1" size={24} color="white" style={{margin: 5}}/>
                            <Text style={{color: 'white'}}>Avaliação do aplicativo</Text>
                        </>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => Linking.openURL('http://google.com')} activeOpacity={1} underlayColor="rgba(255,255,255,0.1)" style={{width: '100%', padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 0.5}}>
                        <>
                            <AntDesign name="filetext1" size={24} color="white" style={{margin: 5}} onPress={() => Linking.openURL('http://google.com')}/>
                            <Text style={{color: 'white'}}>Termos</Text>
                        </>
                    </TouchableHighlight>
                   
                    <TouchableHighlight activeOpacity={1} underlayColor="rgba(255,255,255,0.6)" style={{backgroundColor: 'white', padding: 15, borderRadius: 100, marginTop: '20%'}} onPress={() => Sair()}>
                        <Text style={{ color: '#FD5266', textAlign: 'center', fontWeight: 'bold'}}>Sair da conta</Text>
                    </TouchableHighlight>
                   
                </ScrollView>
            </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1, 
        backgroundColor: '#FD5266',
        padding: 10
      },
      container_1:{
        flex: 1,
        backgroundColor: 'transparent',
      },
      container_2:{
    
      },
      login: {
          marginTop: '2.5%',
          padding: 16,
          backgroundColor: '#FD5266',
          width: '90%',
          borderRadius: 100,
      },
      txt_white_color: {
        color: 'white',
        textAlign: 'center',
      },
      txt_forget: {
        textAlign: 'center',
        textDecorationLine: 'underline'
      }
});
