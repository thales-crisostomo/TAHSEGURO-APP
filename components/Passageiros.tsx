import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Keyboard, Button, Platform, Picker} from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from './Header';
import {  Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
  
export default function Viagem(props) {

    const navigation = useNavigation();
    const route = useRoute();
    const [showCalendar, setShowCalendar] = useState(false);
    const [quantAdults, setQuantAdults] = useState(1);
    const [quantKids, setQuantKids] = useState(0);
    const [quantElderly, setQuantElderly] = useState(0);

    console.log(route.params.passengers)

    useEffect(() => {
        var timer = setInterval(function() {
            setShowCalendar(true)
            clearInterval( timer);
        }, 100);
    }, [showCalendar])

    useEffect(() => {
        if(route.params.passengers){
            if(route.params.passengers.adults){
                setQuantAdults(route.params.passengers.adults)
            }
            if(route.params.passengers.kids){
                setQuantKids(route.params.passengers.kids)
            }
            if(route.params.passengers.elderly){
                setQuantElderly(route.params.passengers.elderly)
            }
        }
    }, [route.params.passengers])

    //Adults
    function AddQuantAdults(){
        if(quantAdults < 8){
            setQuantAdults(quantAdults + 1)
        }
        return;
    }

    function MinusQuantAdults(){
        if(quantAdults > 0){
            setQuantAdults(quantAdults - 1)
        }
        return;
    }

    //KIDS
    function AddQuantKids(){
        if(quantKids < 8){
            setQuantKids(quantKids + 1)
        }
        return;
    }

    function MinusQuantKids(){
        if(quantKids > 0){
            setQuantKids(quantKids - 1)
        }
        return;
    }

    //ELDERLYS
    function AddQuantElderly(){
        if(quantElderly < 8){
            setQuantElderly(quantElderly + 1)
        }
        return;
    }

    function MinusQuantElderly(){
        if(quantElderly > 0){
            setQuantElderly(quantElderly - 1)
        }
        return;
    }


    function Voltar(){
        navigation.navigate("Viagem", {
            passengers: {adults: quantAdults, kids: quantKids, elderly: quantElderly},
        });
    }

    
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FD5266' }} />
            <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
                <Header name={'Passageiros'} icon1={<Feather name="chevron-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#FD5266' onPress1={() => navigation.goBack()}/>
                <View style={styles.centeredView}>
                    <View style={{display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eeeeee', paddingBottom: 15, paddingTop: 15}}>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            <Text style={{color: '#FD5266', fontSize: 20}}>Adultos</Text>
                            <Text style={{color: 'gray', fontSize: 20}}>22 a 69 anos</Text>
                        </View>
                        
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                                <TouchableOpacity style={{padding: 10}} onPress={() => AddQuantAdults()}>
                                    <Feather name="plus" size={20} color="#FD5266" />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>{quantAdults}</Text> 
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{padding: 10}} onPress={() => MinusQuantAdults()}>
                                    <Feather name="minus" size={20} color="#FD5266" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eeeeee', paddingBottom: 15, paddingTop: 15}}>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            <Text style={{color: '#FD5266', fontSize: 20}}>Crianças</Text>
                            <Text style={{color: 'gray', fontSize: 20}}>0 a 21 anos</Text>
                        </View>
                        
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                                <TouchableOpacity style={{padding: 10}} onPress={() => AddQuantKids()}>
                                    <Feather name="plus" size={20} color="#FD5266" />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>{quantKids}</Text> 
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{padding: 10}} onPress={() => MinusQuantKids()}>
                                    <Feather name="minus" size={20} color="#FD5266" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eeeeee', paddingBottom: 15, paddingTop: 15}}>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            <Text style={{color: '#FD5266', fontSize: 20}}>Idosos</Text>
                            <Text style={{color: 'gray', fontSize: 20}}>70 a 85 </Text>
                        </View>
                        
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                                <TouchableOpacity style={{padding: 10}} onPress={() => AddQuantElderly()}>
                                    <Feather name="plus" size={20} color="#FD5266" />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>{quantElderly}</Text> 
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{padding: 10}} onPress={() => MinusQuantElderly()}>
                                    <Feather name="minus" size={20} color="#FD5266" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{position: 'absolute', bottom: 0, width: '100%', alignItems: 'center'}}>
                        <TouchableOpacity activeOpacity={1} onPress={() => Voltar()} style={{shadowOffset:{  width: 0,  height: 0 }, shadowColor: 'black', shadowRadius: 5, shadowOpacity: 0.3, width: 200, padding: 10, backgroundColor: '#FD5266', borderRadius: 100}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Pronto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 10
    },
});