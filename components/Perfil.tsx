import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, Alert, Keyboard} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const url = 'https://41lh09l2zk.execute-api.us-east-1.amazonaws.com/prod/'

export default function Perfil(props) {

  const navigation = useNavigation();
  const loadingAnimation = useRef(null);
  const sucessAnimation = useRef(null);
  const errorAnimation = useRef(null);
  
  const [user, setUser] = useState(null);
  const [cpf, setCPF] = useState(null);
  const [nascimento, setNascimento] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState('none');
  const [conteudo, setConteudo] = useState('block');
  const [showSucess, setShowSucess] = useState('none');
  const [showError, setShowError] = useState('none');
  const [showLoading, setShowLoading] = useState('none');
  const [sucessoCadastro, setSucessoCadastro] = useState('none');
  const [erroCadastro, setErroCadastro] = useState('none');
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('@Name')
    .then((value) => {
        setName(value)
    });
    AsyncStorage.getItem('@Email')
    .then((value) => {
        setUser(value)
    });
    AsyncStorage.getItem('@Token')
    .then((value) => {
        setToken(value)
    });
    AsyncStorage.getItem('@Phone')
    .then((value) => {
        setTelefone(value)
    });
    AsyncStorage.getItem('@Birthday')
    .then((value) => {
        setNascimento(value)
    });
    AsyncStorage.getItem('@Cpf')
    .then((value) => {
        setCPF(value)
    });
  }, []);

  async function Atualizar () {
    if(!user || !name){
        Alert.alert(
            "Ops!",
            "Você deve preencher todos os campos obrigatórios (*)",
            [
              { text: "OK" }
            ],
            { cancelable: false }
        );
        return
    }
    
    RemoveProps()
    Keyboard.dismiss()
    setLoading('flex')
    setShowLoading('flex')
    loadingAnimation.current.play();
    
    fetch( url + 'v1/user/update/' + user, {
        method: 'PUT',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': 'Bearer ' + token,
          'Authorization': token,
        },
        body: JSON.stringify({
          email: user,
          name: name,
          phone: telefone,
          cpf: cpf,
          birthday: nascimento
        }),
    }).then((response) => response.json()).then(async (responseJson) => {
        if(responseJson.message == "Atualizado com sucesso!"){
            Sucess()
            if(telefone){
                await AsyncStorage.setItem('@Phone', telefone);
            }
            if(name){
                await AsyncStorage.setItem('@Name', name);
            }
            if(cpf){
                await AsyncStorage.setItem('@Cpf', cpf);
            }
            if(nascimento){
                await AsyncStorage.setItem('@Birthday', nascimento);
            }
            return;
        }else{
            return Error()
        }
    })
    .catch(async(error) => {
        console.log(error)
        return Error()
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
        navigation.navigate('Home')
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
                <Text style={{fontSize: 30, color: 'tomato', textAlign: 'center', color: '#32BF84', paddingLeft: '10%', paddingRight: '10%'}}>Seus dados foram atualizados!</Text>
            </View>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20%', display: erroCadastro, flexDirection: 'column', paddingLeft: 20, paddingRight: 20}}>
                <Text style={{fontSize: 30, color: 'tomato', textAlign: 'center', color: 'black'}}>Erro ao atualizar ;(</Text>
                <Text style={{fontSize: 20, color: 'tomato', textAlign: 'center', color: '#FD5266', margin: 10}}>Tente novamente</Text>
            </View>
        </View>
        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
            <Header name={''} icon1={<FontAwesome name="long-arrow-left" size={24} color="#FD5266" />} icon2={''} colorText={'tomato'} color='white' onPress1={() => navigation.goBack()} />
            <View style={styles.centeredView}>
            <TouchableHighlight activeOpacity={1} underlayColor="transparent" style={{
                display: conteudo,
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10}} onPress={() => Keyboard.dismiss()}>
                <TouchableHighlight activeOpacity={1} underlayColor="transparent" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onPress={() => Keyboard.dismiss()}>
                    <View style={{width: '100%'}}>
                        <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                            <View style={{width: '90%'}}>
                                <Text style={{fontSize: 30, color: '#FD5266'}}>Perfil</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5%', display: 'flex'}}>
                            <Sae 
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'Nome *' } 
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
                                value={name}
                                onChangeText={(text) => {setName(text)}}
                            /> 
                            <Sae 
                                editable={false}
                                onTouchStart={()=> Keyboard.dismiss()}
                                labelStyle={{ color: 'gray', margin: 10}}
                                label = { 'E-mail *' } 
                                iconSize= {0}
                                iconClass = { FontAwesomeIcon } 
                                iconName = { 'envelope-o' } 
                                iconColor = { 'gray' } 
                                inputPadding = { 6 } 
                                labelHeight = { 20 } 
                                inputStyle= {{marginLeft: 10, color: 'gray'}}
                                style={{width: '90%', backgroundColor: '#fafafa', borderRadius: 4, margin: 10}}
                                // altura da borda ativa 
                                borderHeight = { 2 } 
                                // TextInput props 
                                autoCapitalize = { 'none' }
                                autoCorrect = { true } 
                                keyboardType={"email-address"}
                                value={user}
                                onChangeText={(text) => {setUser(text)}}
                            /> 
                            <Sae   
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'CPF' } 
                                iconClass = { AntDesign } 
                                iconName = { 'idcard' } 
                                iconColor = { '#FD5266' } 
                                iconSize ={0}
                                inputPadding = { 6 } 
                                labelHeight = { 20 } 
                                inputStyle= {{marginLeft: 10, color: 'black'}}
                                style={{width: '90%', margin: 10, backgroundColor: '#fafafa', borderRadius: 4}}
                                // altura da borda ativa 
                                borderHeight = { 2 } 
                                // TextInput props 
                                autoCapitalize = { 'none' }
                                keyboardType={'number-pad'}
                                autoCorrect = { false } 
                                value={cpf}
                                onChangeText={(text) => {setCPF(text)}}
                            /> 

                            <Sae 
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'Nascimento' } 
                                iconClass = { AntDesign } 
                                iconName = { 'gift' } 
                                iconColor = { '#FD5266' } 
                                iconSize ={0}
                                inputPadding = { 6 } 
                                labelHeight = { 20 } 
                                inputStyle= {{marginLeft: 10, color: 'black'}}
                                style={{width: '90%', margin: 10, backgroundColor: '#fafafa', borderRadius: 4}}
                                // altura da borda ativa 
                                borderHeight = { 2 } 
                                // TextInput props 
                                autoCapitalize = { 'none' }
                                keyboardType={'number-pad'}
                                autoCorrect = { false } 
                                value={nascimento}
                                onChangeText={(text) => {setNascimento(text)}}
                            />

                            <Sae 
                                labelStyle={{ color: '#FD5266', margin: 10}}
                                label = { 'Telefone' } 
                                iconClass = { AntDesign } 
                                iconName = { 'mobile1' } 
                                iconColor = { '#FD5266' } 
                                iconSize ={0}
                                inputPadding = { 6 } 
                                labelHeight = { 20 } 
                                inputStyle= {{marginLeft: 10, color: 'black'}}
                                style={{width: '90%', margin: 10, backgroundColor: '#fafafa', borderRadius: 4}}
                                // altura da borda ativa 
                                borderHeight = { 2 } 
                                // TextInput props 
                                autoCapitalize = { 'none' }
                                autoCorrect = { false } 
                                keyboardType={'phone-pad'}
                                value={telefone}
                                onChangeText={(text) => {setTelefone(text)}}
                            />
                            
                            <TouchableHighlight activeOpacity={1} underlayColor="white" style={styles.login} onPress={() => Atualizar()}>
                                <Text style={styles.txt_white_color}>Atualizar</Text>
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