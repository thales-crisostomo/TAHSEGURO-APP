import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, TouchableHighlight, Alert, Keyboard} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const url = "https://41lh09l2zk.execute-api.us-east-1.amazonaws.com/prod/"

export default function Starter(props) {
  const navigation = useNavigation();
  const loadingAnimation = useRef(null);
  function Login () {
    setFlexAuto(1);
    Keyboard.dismiss();
    setLoading('flex');
    setConteudo('none');
    loadingAnimation.current.reset();
    loadingAnimation.current.play();

    if(!user || !password){
      Alert.alert(
          "Ops!",
          "Você deve preencher os dois campos.",
          [
            { text: "OK" }
          ],
          { cancelable: false }
      );
      return
    }

    fetch( url + 'v1/user/signin', {
        method: 'POST',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.toLowerCase().trim(),
          password: password.trim(),
        }),
    }).then((response) => response.json()).then(async (responseJson) => {
        if(responseJson.message == "Usuário ou senha inválidos."){
            return Error()
        }
        if(responseJson.message == "Logado com sucesso!"){
            await AsyncStorage.setItem('@Token', responseJson.User.token);
            await AsyncStorage.setItem('@Email', responseJson.User.email);
            await AsyncStorage.setItem('@UserId', responseJson.User.userid);
            await AsyncStorage.setItem('@Name', responseJson.User.name);
            await AsyncStorage.setItem('@Phone', responseJson.User.phone ? responseJson.User.phone  : '');
            await AsyncStorage.setItem('@Cpf', responseJson.User.cpf ? responseJson.User.cpf : '');
            await AsyncStorage.setItem('@Birthday', responseJson.User.birthday ? responseJson.User.birthday : '');
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
  
  return (
    <View>
      <Modal
        backdropColor={'#FD5266'}
        backdropTransitionInTiming={500}
        isVisible={props.visible}
        style = {{padding: 0, margin: 0}}
        onBackButtonPress = {() => {
            props.Close
         }}
        onModalWillHide={() => {
           props.Close
        }}
        swipeThreshold ={200}
        onSwipeStart = {() => Keyboard.dismiss()}
        onSwipeComplete = {props.close}
        swipeDirection = {['down']}
      >
        <View style={styles.centeredView}>
          <TouchableHighlight activeOpacity={1} underlayColor="transparent" style={styles.container_1} onPress={() => props.Close()}>
            <View />
          </TouchableHighlight>
          <TouchableHighlight activeOpacity={1} underlayColor="white" style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            flex: flexAuto,
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10}} onPress={() => Keyboard.dismiss()}>
            <TouchableHighlight style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '100%'}}>
                    <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '13%', display: conteudo}}>
                        <Sae 
                            autoFocus
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
                            style={{width: '90%', backgroundColor: '#fafafa', borderRadius: 4, textTransform: 'lowercase'}}
                            // altura da borda ativa 
                            borderHeight = { 2 } 
                            // TextInput props 
                            autoCapitalize = { 'none' }
                            autoCorrect = { true } 
                            keyboardType={"email-address"}
                            onChangeText={(text) => {setUser(text)}}
                        /> 
                        <Sae 
                            labelStyle={{ color: '#FD5266', margin: 10}}
                            label = { 'Senha' } 
                            onFocus={() => setFlexAuto(3)}
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
                            autoCorrect = { true } 
                            onChangeText={(text) => {setPassword(text)}}
                        /> 
                        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <View style={{width: '90%'}}>
                            <TouchableHighlight activeOpacity={1} underlayColor="white" onPress={props.RecoverPassword} ><Text style={{margin: 10, textDecorationLine: 'underline', color: '#FD5266'}}>Esqueci minha senha</Text></TouchableHighlight>
                          </View>
                        </View>
                        <TouchableHighlight activeOpacity={1} underlayColor="white" style={styles.login} onPress={() => Login()}>
                            <Text style={styles.txt_white_color}>Entrar</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{width: '100%', display: loading, alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                        <LottieView
                            source={require("../assets/animation/animation_6.json")}
                            loop={false}
                            ref={loadingAnimation}
                            style={{width: '50%'}}
                        /> 
                    </View>
                </View>
            </TouchableHighlight>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 0,
        backgroundColor: 'transparent'
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
