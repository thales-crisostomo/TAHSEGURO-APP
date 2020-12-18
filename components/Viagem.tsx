import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect,} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Keyboard, Button, Platform, Picker} from 'react-native';
import Modal from 'react-native-modal';
import SelectPicker from 'react-native-picker-select';
import { CheckBox } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome, Feather, MaterialCommunityIcons, Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';  

export default function Viagem(props) {

    const navigation = useNavigation();
    const route = useRoute();
    const [showCalendar, setShowCalendar] = useState(false);
    const [destinos, setDestino] = useState([
        { label: 'Europa', value: 'Europa' },
        { label: 'América do Norte', value: 'americadonorte' },
        { label: 'Caribe-México', value: 'caribemexico' },
        { label: 'América do Sul', value: 'americadosul' },
        { label: 'África', value: 'africa' },
        { label: 'Ásia', value: 'asia' },
        { label: 'Ocêania', value: 'oceania' },
        { label: 'Multi-destino', value: 'multidestino' },
        { label: 'Dentro do Brasil', value: 'dentrobrasil' },
    ]);

    const [dataIda, setDataIda] = useState('DD/MM/AA');
    const [dataVolta, setDataVolta] = useState('DD/MM/AA');
    const [dataMinimum, setDataMinimum] = useState(new Date());
    
    //const [passageiros, setPassageiros] = useState('1 - Adulto | 2 - Crianças | 0 - Idosos');
    const [passageiros, setPassageiros] = useState('1 - Adulto');
    const [destinoSelecionado, setDestinoSelecionado] = useState('Europa');
    const [selectedPassengers, setSelectedPassengers] = useState();

    useEffect(() => {
       // console.log(dateGo)
    }, [])
    

    var date = route.params
    var passengers = route.params
    useFocusEffect(
        React.useCallback((e) => {
            if(date){
                if(date.dateGo){
                    var day = date.dateGo.split('-')[2]
                    var month = date.dateGo.split('-')[1]
                    var year = date.dateGo.split('-')[0]
                    setDataIda(day + '/' + month + '/' + year)
                    setDataMinimum(date.dateGo)
                }
                if(date.dateComeback){
                    var day = date.dateComeback.split('-')[2]
                    var month = date.dateComeback.split('-')[1]
                    var year = date.dateComeback.split('-')[0]
                    setDataVolta(day + '/' + month + '/' + year)
                }

                //PAssageiros

                if(date.passengers){
                    setSelectedPassengers(date.passengers)
                    var escolhidos = ''
                    if(date.passengers.adults > 0){
                        escolhidos =  date.passengers.adults + ' - ' + 'Adulto(s)'
                    }
                    if(date.passengers.kids > 0){
                        escolhidos =  escolhidos + ' | ' + date.passengers.kids + ' - ' + 'Criança(s)'
                    }
                    if(date.passengers.elderly > 0){
                        escolhidos =  escolhidos + ' | ' + date.passengers.elderly + ' - ' + 'Idoso(s)'
                    }
                    setPassageiros(escolhidos)
                }
            }
        }, [date])
    );
     
    function ValidaIda(){
        var atual = new Date()
        atual = atual.setHours(0, 0, 0, 0);
        if(dataMinimum.getMonth){
            var minimun = dataMinimum.setHours(0, 0, 0, 0);
            if(atual == minimun){
                Alert.alert(
                    "Ops!",
                    "Escolha primeiro a data de ida primeiro.",
                    [
                      { text: "OK" }
                    ],
                    { cancelable: false }
                );
                return
            }
        }
        navigation.navigate("DataRetorno", {minimumDate: dataMinimum})
    }

    function Calcular(){
        if(dataIda == 'DD/MM/AA' || dataVolta == 'DD/MM/AA'){
            Alert.alert(
                "Ops!",
                "Preencha a data de ida e de volta.",
                [
                  { text: "OK" }
                ],
                { cancelable: false }
            );
            return
        }
        navigation.navigate("CalcularViagem");
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FD5266' }} />
            <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
                <Header name={'Para onde será?'} icon1={<Feather name="chevron-left" size={20} color="white" />} icon2={''} colorText={'white'} color='#FD5266' onPress1={() => navigation.goBack()}/>
                <View style={styles.centeredView}>
                    <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: '100%', display: 'flex', }}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <MaterialCommunityIcons name="airplane-takeoff" size={20} color={'#FD5266'}/>
                                <Text style={{margin: 5, fontSize: 20, color: '#FD5266'}}>Origem</Text>
                            </View>
                            <View style={{backgroundColor: '#fafafa', width: '100%', borderRadius: 100, overflow: 'hidden', borderWidth: 0}}>
                                <SelectPicker
                                    doneText={'Pronto'}
                                    //placeholder={{
                                    //  label: 'Destino',
                                    // value: null,
                                    //}} 
                                    value={'Brazil'}
                                    Icon={() => {
                                        return <FontAwesome name="angle-down" size={20} color="gray" />;
                                    }}
                                    style={picker1}
                                    onValueChange={(value) => console.log(value)}
                                    items={[
                                        { label: 'Brasil', value: 'Brazil' },
                                    ]}
                                    disabled
                                />
                            </View>
                        </View>
                        <View style={{width: '100%', display: 'flex', margin: 10}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <MaterialCommunityIcons name="airplane-landing" size={20} color={'#FD5266'}/>
                                <Text style={{margin: 5, fontSize: 20, color: '#FD5266'}}>Destino</Text>
                            </View>
                            <View style={{backgroundColor: '#fafafa', width: '100%', borderRadius: 100, overflow: 'hidden', borderWidth: 0}}>
                                <SelectPicker
                                    doneText={'Pronto'}
                                    //placeholder={{
                                    //  label: 'Destino',
                                    // value: null,
                                    //}} 
                                    value={destinoSelecionado}
                                    Icon={() => {
                                        return <FontAwesome name="angle-down" size={20} color="black" />;
                                    }}
                                    style={picker2}
                                    onValueChange={(value) => setDestinoSelecionado(value)}
                                    items={destinos}
                                />
                            </View>
                        </View>

                        <View style={{width: '100%', flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Fontisto name="date" size={20} color={'#FD5266'} style={{margin: 5}}/>
                                    <Text style={{margin: 5, fontSize: 20, color: '#FD5266'}}>Ida</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={{padding: 10, backgroundColor: '#FD5266', borderRadius: 100, marginTop: 5}} onPress={()=> navigation.navigate('DataIda')}>
                                        <Text style={{color: 'white'}}>{dataIda}</Text>
                                    </TouchableOpacity> 
                                </View>
                            </View>
                            <View style={{flexDirection: 'column', flex: 1, marginLeft: 10}}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Fontisto name="date" size={20} color={'#FD5266'} style={{margin: 5}}/>
                                    <Text style={{margin: 5, fontSize: 20, color: '#FD5266'}}>Volta</Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={{padding: 10, backgroundColor: '#FD5266', borderRadius: 100, marginTop: 5}} onPress={()=> ValidaIda()}>
                                        <Text style={{color: 'white'}}>{dataVolta}</Text>
                                    </TouchableOpacity> 
                                </View>
                            </View>
                        </View>

                        <View style={{width: '100%', display: 'flex', margin: 10}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <SimpleLineIcons name="people" size={20} color={'#FD5266'}/>
                                <Text style={{margin: 5, fontSize: 17, color: '#FD5266'}}>Passageiros</Text>
                            </View>
                            <TouchableOpacity style={{padding: 5, backgroundColor: '#fafafa', width: '100%', borderRadius: 100, overflow: 'hidden', borderWidth: 0, flexDirection: 'row', alignItems: 'center', marginTop: 5}} activeOpacity={1} onPress={()=> navigation.navigate("Passageiros", {passengers: selectedPassengers})}>
                                <View style={{flex: 8, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{margin: 5, fontSize: 17, color: '#FD5266', paddingLeft: 5}}>{passageiros}</Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <FontAwesome name="angle-right" size={20} color="black" style={{marginLeft: 15}}/>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{paddingTop: '85%'}}/>
                    <TouchableOpacity activeOpacity={1} style={{width: '100%', padding: 12, backgroundColor: '#FD5266', borderRadius: 100, shadowOffset:{  width: 0,  height: 0 }, shadowColor: 'black', shadowRadius: 5, shadowOpacity: 0.3}} onPress={() => Calcular()}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        display: 'flex', 
        flex: 1,
        padding: 20,
        paddingTop: '10%',
    },
});

const picker1 = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 0,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'gray',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      borderWidth: 0,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
  });

  const picker2 = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      borderWidth: 0,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
  });