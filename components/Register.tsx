import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, TouchableHighlight, Alert, Keyboard, Linking} from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome, Feather } from '@expo/vector-icons';
import axios from 'axios';

const url = 'https://41lh09l2zk.execute-api.us-east-1.amazonaws.com/prod/'

export default function Register(props) {

  const navigation = useNavigation();
  const loadingAnimation = useRef(null);
  const sucessAnimation = useRef(null);
  const errorAnimation = useRef(null);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [checkTermos, setCheckTermos] = useState(false);
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const [name, setName] = useState();
  const [flexAuto, setFlexAuto] = useState(1);
  const [loading, setLoading] = useState('none');
  const [conteudo, setConteudo] = useState('block');
  const [showSucess, setShowSucess] = useState('none');
  const [showError, setShowError] = useState('none');
  const [showLoading, setShowLoading] = useState('none');
  const [sucessoCadastro, setSucessoCadastro] = useState('none');
  const [erroCadastro, setErroCadastro] = useState('none');

  function RegisterUser () {
    if(!user || !password || !name){
        Alert.alert(
            "Ops!",
            "Você deve preencher todos os campos.",
            [
              { text: "OK" }
            ],
            { cancelable: false }
        );
        return
    }
    if(password != repassword){
        Alert.alert(
            "Eii!",
            "As senhas não batem...",
            [
              { text: "OK" }
            ],
            { cancelable: false }
        );
        return
    }
    if(checkTermos == false){
        Alert.alert(
            "Não se esqueça",
            "Você deve aceitar os termos para continuar.",
            [
              { text: "OK" }
            ],
            { cancelable: false }
        );
        return
    }

    RemoveProps()
    setFlexAuto(1)
    Keyboard.dismiss()
    setLoading('flex')
    setShowLoading('flex')
    loadingAnimation.current.play();
    
    fetch( url + 'v1/user/register', {
        method: 'POST',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user,
          password: password,
          name: name
        }),
    }).then((response) => response.json()).then(async (responseJson) => {
        if(responseJson.message == "Esse usuário já existe."){
            return Error()
        }
        if(responseJson.message == "Usuário cadastrado com sucesso!"){
            return Sucess()
        }
    })
    .catch(async(error) => {
        console.log(error)
    });
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
    }, 3000);
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
    }, 5000);
  }

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
                <Text style={{fontSize: 30, color: 'tomato', textAlign: 'center', color: '#32BF84'}}>Cadastro realizado com sucesso!</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20%', display: erroCadastro, flexDirection: 'column', paddingLeft: 20, paddingRight: 20}}>
                <Text style={{fontSize: 30, color: 'tomato', textAlign: 'center', color: 'black'}}>Esse usuário já está cadastrado.</Text>
                <Text style={{fontSize: 20, color: 'tomato', textAlign: 'center', color: '#FD5266', margin: 10}} onPress={() => navigation.navigate('RecoverPassword')}>Clique aqui para recuperar a senha.</Text>
            </View>
        </View>
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={''} icon1={<Feather name="chevron-left" size={24} color="#FD5266" />} icon2={''} colorText={'tomato'} color='white' onPress1={() => navigation.goBack()}/>
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
                    <View style={{width: '98%'}}>
                        <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                            <View style={{width: '90%'}}>
                                <Text style={{fontSize: 30, color: '#FD5266'}}>Registrar</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5%', display: 'flex'}}>
                            <Sae 
                                autoFocus
                                onFocus={() => setFlexAuto(3)}
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'Nome' } 
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
                                autoCapitalize = { 'sentences' }
                                autoCorrect = { true } 
                                onChangeText={(text) => {setName(text)}}
                                returnKeyLabel='Próximo' 
                                returnKeyType='next'
                            /> 
                            <Sae 
                                onFocus={() => setFlexAuto(3)}
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'E-mail' } 
                                iconSize= {0}
                                iconClass = { FontAwesomeIcon } 
                                iconName = { 'envelope-o' } 
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
                                keyboardType={"email-address"}
                                onChangeText={(text) => {setUser(text)}}
                                returnKeyLabel='Próximo' 
                                returnKeyType='next'
                            /> 
                            <Sae 
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'Senha' } 
                                iconClass = { FontAwesomeIcon } 
                                iconName = { 'unlock-alt' } 
                                iconColor = { '#FD5266' } 
                                iconSize ={0}
                                inputPadding = { 6 } 
                                labelHeight = { 20 } 
                                inputStyle= {{marginLeft: 10, color: 'black'}}
                                style={{width: '90%', margin: 10, backgroundColor: '#fafafa', borderRadius: 4}}
                                // altura da borda ativa 
                                borderHeight = { 2 } 
                                // TextInput props 
                                secureTextEntry={true}
                                autoCapitalize = { 'none' }
                                autoCorrect = { false } 
                                onChangeText={(text) => {setPassword(text)}}
                                returnKeyLabel='Próximo' 
                                returnKeyType='next'
                                
                            /> 

                            <Sae 
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'Repetir senha' } 
                                iconClass = { FontAwesomeIcon } 
                                iconName = { 'unlock-alt' } 
                                iconColor = { '#FD5266' } 
                                iconSize ={0}
                                inputPadding = { 6 } 
                                labelHeight = { 20 } 
                                inputStyle= {{marginLeft: 10, color: 'black'}}
                                style={{width: '90%', margin: 10, backgroundColor: '#fafafa', borderRadius: 4}}
                                // altura da borda ativa 
                                borderHeight = { 2 } 
                                // TextInput props 
                                secureTextEntry={true}
                                autoCapitalize = { 'none' }
                                autoCorrect = { false } 
                                onChangeText={(text) => {setRePassword(text)}}
                                returnKeyLabel='Done' 
                                returnKeyType='done'
                            />
                            <View style={styles.checkboxInput}>
                                <CheckBox
                                    checked={checkTermos}
                                    onPress={() => setCheckTermos(!checkTermos)}
                                    checkedColor="#FD5266"
                                    uncheckedColor="#FD5266"
                                />
                                <View style={{marginLeft: -20, display: 'flex', flexDirection: 'row'}}>
                                    <Text onPress={() => Linking.openURL('http://google.com')} style={{color: '#FD5266', margin: 5}}>Termos de uso </Text>
                                    <Text style={{color: '#FD5266', margin: 5}}>|</Text>
                                    <Text onPress={() => Linking.openURL('http://google.com')} style={{color: '#FD5266', margin: 5}}>Política de privacidade </Text>
                                </View>
                            </View>
                            <TouchableHighlight activeOpacity={1} underlayColor="white" style={styles.login} onPress={() => RegisterUser()}>
                                <Text style={styles.txt_white_color}>Fazer cadastro</Text>
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
        borderRadius: 10,
    },
    txt_white_color: {
        color: 'white',
    textAlign: 'center',
    },
    checkboxInput: {
        flexDirection: "row",
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start'
    },
});