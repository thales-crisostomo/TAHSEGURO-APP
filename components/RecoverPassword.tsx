import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, TouchableHighlight, Alert, Keyboard} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome } from '@expo/vector-icons';

const url = 'https://41lh09l2zk.execute-api.us-east-1.amazonaws.com/prod/'

export default function RecoverPassword(props) {

  const navigation = useNavigation();
  const loadingAnimation = useRef(null);
  const sucessAnimation = useRef(null);
  const errorAnimation = useRef(null);

  function Recover () {
    RemoveProps()
    setFlexAuto(1)
    Keyboard.dismiss()
    setLoading('flex')
    setShowLoading('flex')
    loadingAnimation.current.play();

    fetch( url + 'v1/user/recover/' + email, {
        method: 'POST',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json',
        },
    }).then((response) => response.json()).then(async (responseJson) => {
        console.log(responseJson)
        if(responseJson.message == "Usuário não encontrado."){
            return Error()
        }
        if(responseJson.message == "E-mail de recuperação enviado."){
            return Sucess()
        }
    })
    .catch(async(error) => {
        console.log(error)
        return Error()
    }); 
    /*
    var timer = setInterval(function() {
        Sucess()
        clearInterval( timer );
    }, 4000);
    */
  }

  function RemoveProps () {
    setShowError('none')
    setShowSucess('none')
    setSucessoCadastro('none')
    setErroCadastro('none')
    setConteudo('none')
    loadingAnimation.current.reset();
    sucessAnimation.current.reset();
    errorAnimation.current.reset();
  }

  function Sucess() {
    setShowLoading('none');
    setShowSucess('flex')
    setSucessoCadastro('flex')
    sucessAnimation.current.play();
    var timer = setInterval(function() {
        navigation.navigate('Starter')
        clearInterval( timer);
    }, 5500);
  }
  
  function Error(){
    setShowLoading('none');
    setShowError('flex')
    setErroCadastro('flex')
    errorAnimation.current.play();
    var timer = setInterval(function() {
        RemoveProps()
        setConteudo('flex')
        setShowLoading('none');
        setLoading('none');
        clearInterval( timer);
    }, 4500);
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [flexAuto, setFlexAuto] = useState(1);
  const [loading, setLoading] = useState('none');
  const [conteudo, setConteudo] = useState('block');
  const [showSucess, setShowSucess] = useState('none');
  const [showError, setShowError] = useState('none');
  const [showLoading, setShowLoading] = useState('none');
  
  const [sucessoCadastro, setSucessoCadastro] = useState('none');
  const [erroCadastro, setErroCadastro] = useState('none');

  return (
    <>
        <StatusBar style="dark" hidden={false}/>
        <View style={{display: loading, justifyContent: 'center', alignItems: 'center',  height: '100%'}}>
            <LottieView
                ref={loadingAnimation}
                source={require("../assets/animation/loading_1.json")}
                style={{width: '100%', display: showLoading}}
            />
            <LottieView
                loop={false}
                ref={sucessAnimation}
                source={require("../assets/animation/sucess_4.json")}
                style={{width: '50%', display: showSucess}}
            />
            <LottieView
                loop={false}
                ref={errorAnimation}
                source={require("../assets/animation/error_3.json")}
                style={{width: '25%', display: showError}}
            />
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20%', display: sucessoCadastro}}>
                <Text style={{fontSize: 30, color: 'tomato', textAlign: 'center', color: 'black'}}>Enviamos um e-mail com um link para você recuperar sua senha.</Text>
                <Text style={{fontSize: 25, color: 'tomato', textAlign: 'center', color: 'gray', marginTop: 10}}>Vê se não esquece de novo, heimm!</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20%', display: erroCadastro, flexDirection: 'column', paddingLeft: 20, paddingRight: 20}}>
                <Text style={{fontSize: 30, color: 'tomato', textAlign: 'center', color: 'black'}}>Esse e-mail não existe em nosso sistema.</Text>
            </View>
        </View>
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            
            <Header name={''} icon1={<FontAwesome name="long-arrow-left" size={24} color="#FD5266" />} icon2={''} colorText={'tomato'} color='white' onPress1={() => navigation.goBack()} onPress2={() => alert('aqui 2')}/>
            <View style={styles.centeredView}>
                
            <TouchableHighlight activeOpacity={1} underlayColor="transparent" style={{
                display: conteudo,
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10}} onPress={() => Keyboard.dismiss()}>
                <TouchableHighlight activeOpacity={1} underlayColor="transparent" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: '100%'}}>
                        <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                            <View style={{width: '90%'}}>
                                <Text style={{fontSize: 30, color: 'black'}}>Recuperar senha</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5%', display: 'flex'}}>
                            <Sae 
                                autoFocus
                                onFocus={() => setFlexAuto(3)}
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'E-mail cadastrado' } 
                                iconSize= {0}
                                iconClass = { FontAwesomeIcon } 
                                iconName = { 'user-o' } 
                                iconColor = { '#FD5266' } 
                                inputPadding = { 6 } 
                                labelHeight = { 20 } 
                                inputStyle= {{marginLeft: 10, color: 'black'}}
                                style={{width: '90%', backgroundColor: '#fafafa', borderRadius: 4, margin: 10}}
                                // altura da borda ativa 
                                borderHeight = { 2 } 
                                // TextInput props 
                                autoCapitalize = { 'none' }
                                autoCorrect = { true } 
                                onChangeText={(text) => {setEmail(text)}}
                                keyboardType={"email-address"}
                            /> 
                            <TouchableHighlight activeOpacity={1} underlayColor="white" style={styles.login} onPress={() => Recover()}>
                                <Text style={styles.txt_white_color}>Recuperar</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: '100%', display: loading}}>
                            <LottieView
                                source={require("../assets/animation/animation_6.json")}
                                autoPlay
                                loop
                                style={{width: '50%'}}
                            /> 
                        </View>
                    </View>
                </TouchableHighlight>
            </TouchableHighlight>
            
            </View>
            
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        display: 'flex', 
        flex: 1,
      },
      container_1:{
        flex: 1,
        backgroundColor: 'transparent',
      },
      container_2:{
    
      },
      login: {
          marginTop: '10%',
          padding: 16,
          backgroundColor: '#FD5266',
          width: '90%',
          borderRadius: 100,
      },
      txt_white_color: {
        color: 'white',
        textAlign: 'center',
      },
});
