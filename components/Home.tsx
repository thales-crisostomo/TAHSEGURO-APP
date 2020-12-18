import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View,  SafeAreaView, TouchableHighlight, RefreshControl, ScrollView, Dimensions, Animated, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
//import { CheckBox } from 'react-native-elements';
///import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
//import Header from './Header';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Configuracoes from './Configuracoes';
import { BlurView } from 'expo-blur';
//import {ViewPlaceholder, Direction} from "react-native-js-shimmer-placeholder";
import SkeletonContent from 'react-native-skeleton-content';

const url = 'https://41lh09l2zk.execute-api.us-east-1.amazonaws.com/prod/'

const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
};

export default function Register(props) {

  const navigation = useNavigation();
  
  const loadingAnimation = useRef(null);
  const sucessAnimation = useRef(null);
  const errorAnimation = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('@Name')
    .then((value) => {
        //var name = value?.split(' ')[0]
        setName(value.split(' ')[0])
    });
  }, []);

  

  useEffect(() => {
    LoadingShow()
    setCard_1(
    <TouchableOpacity activeOpacity={1} style={{ borderRadius: 10, height: '100%', display: 'flex', width: '100%', display: 'flex', overflow: 'hidden'}} onPress={() => navigation.navigate('Viagem')}>   
        {/*<LottieView
            autoPlay
            loop
            source={require("../assets/animation/animation_3.json")}
            style={{width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        />
        <Entypo name="aircraft-take-off" size={40} color="white" style={{margin: 10}} />
        */}
        
        <View style={{backgroundColor: 'rgba(253, 82, 102, 0)', justifyContent: 'center', alignItems: 'center', height: '75%', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
            <BlurView intensity={0} style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               {/* <View style={{ backgroundColor: 'rgba(253, 82, 102, 0.5)', padding: 10, borderRadius: 100, flexDirection: 'row'}}>*/}
                    {/*<Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Contratar seguro</Text>*/}
                    <Image source={require('../assets/images/picture_2.jpg')} style={{borderRadius: 0, resizeMode: 'cover', width: '100%', height: '100%'}}
        />
                  {/* </View>*/}
            </BlurView>
        </View>
        <View style={{flexDirection: 'row', display: 'flex', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '25%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <View style={{flex: 6, height: '100%', padding: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{fontSize: 20, color: '#FD5266', fontWeight: 'bold'}}>Contratar seguro viagem</Text>
            </View>
            <View style={{flex: 1, height: '100%', padding: 10, justifyContent: 'center', alignItems: 'flex-end', }}>
                {/*<Entypo name="chevron-small-right" size={20} color="#FD5266" />*/}
            </View>
        </View>
    </TouchableOpacity>)

setCard_2(
    <TouchableOpacity activeOpacity={1} style={{ borderRadius: 10, height: '100%', display: 'flex', width: '100%', display: 'flex', overflow: 'hidden'}}>
        {/*<LottieView
            autoPlay
            loop
            source={require("../assets/animation/animation_3.json")}
            style={{width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        />
        <Entypo name="aircraft-take-off" size={40} color="white" style={{margin: 10}} />
        */}
        
        <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '100%', borderRadius: 10, flexDirection: 'row'}}>
            <View style={{ flex: 2, height: '100%', padding: 10, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 20, color: '#FD5266', fontWeight: 'bold'}}>Você não tem nenhum seguro ativo.</Text>
            </View>
            <View style={{ flex: 1, height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <LottieView
                    autoPlay
                    loop
                    source={require("../assets/animation/sad_1.json")}
                    style={{width: '90%'}}
                />
            </View>
        </View>
    </TouchableOpacity>)
  }, [])


  function LoadingShow() {
    setLoading(true)
    var timer = setInterval(function() {
        setLoading(false)
        clearInterval( timer);
    }, 2000);
  }

  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [modalLogin,setModalLogin] = useState(false)
  const [card_1, setCard_1] = useState();
  const [card_2, setCard_2] = useState();

  const onRefresh = React.useCallback(() => {
    LoadingShow()
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  function Close() {
    setModalLogin(false)
  }

  return (
    <>
        <StatusBar style="light" hidden={false}/>
        <Configuracoes visible={modalLogin} Close={() => Close()} RecoverPassword={() => RecoverPassword()}/>

        <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: '#FD5266'}}>
            <View style={styles.centeredView}>
                <View style={{flex: 1, display: 'flex'}}>

                    <View style={{color: 'white', display: 'flex', flexDirection: 'row', padding: 10}}>
                        
                        <View style={{flex: 1,  display: 'flex', padding: 10, justifyContent: 'center'}}>
                            <Text style={{fontSize: 25, color: 'tomato', color: 'white', fontWeight: 'bold'}}>E aí, {name}</Text>
                        </View>
                        <View style={{flex: 1, display:'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 10}}>
                            <TouchableHighlight style={{padding: 10, borderRadius: 1000, backgroundColor: 'rgba(255,255,255,0.3)'}} onPress={()=> setModalLogin(true)} activeOpacity={1} underlayColor="rgba(255,255,255,0.5)">
                                <SimpleLineIcons name="settings" size={20} color="white" />
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{flex: 4, display: 'flex', padding: 10}}>
                        <ScrollView
                            contentContainerStyle={{flex: 1, display: 'flex'}}
                            showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={refreshing} tintColor="white" onRefresh={onRefresh} />}>
                            
                            <View style={{flex: 1, display: 'flex'}}>
                                <SkeletonContent
                                    containerStyle={{ flex: 1}}
                                    isLoading={loading}
                                    layout={[
                                        { key: 'someId', flex: 1, width: '100%', borderRadius: 10},
                                    ]}
                                >
                                    <View style={{marginTop: 10, flex: 1, width: '100%', backgroundColor: 'white', borderRadius: 10}}>
                                        {card_1}
                                    </View>
                                </SkeletonContent>
                                <SkeletonContent
                                    containerStyle={{ flex: 1}}
                                    isLoading={loading}
                                    layout={[
                                        { key: 'someId 2', flex: 0.4, width: '100%', marginTop: 10, borderRadius: 10},
                                    ]}
                                >
                                    <View style={{marginTop: 10, flex: 0.4, width: '100%', backgroundColor: 'white', borderRadius: 10}}>
                                        {card_2}
                                    </View>
                                </SkeletonContent>
                                <View style={{flex: 1}}/>
                            </View>
                        </ScrollView>
                    </View>
                    
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity  activeOpacity={1} style={{height: 100, width: 100, backgroundColor: 'white', borderRadius: 10, marginLeft: 10}}>
                                    <View style={{display: 'flex', padding: 10, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                        <SimpleLineIcons name="settings" size={20} color="#FD5266" />
                                    </View>
                                    <View style={{padding: 10}}>
                                        <Text style={{color: '#FD5266', fontWeight: 'bold'}}>Meus seguros</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={{height: 100, width: 100, backgroundColor: 'white', borderRadius: 10, marginLeft: 10}}>
                                    <View style={{display: 'flex', padding: 10, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                        <SimpleLineIcons name="settings" size={20} color="#FD5266" />
                                    </View>
                                    <View style={{padding: 10}}>
                                        <Text style={{color: '#FD5266', fontWeight: 'bold'}}>Help 24h</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={{height: 100, width: 100, backgroundColor: 'white', borderRadius: 10, marginLeft: 10}}>
                                    <View style={{display: 'flex', padding: 10, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                        <SimpleLineIcons name="settings" size={20} color="#FD5266" />
                                    </View>
                                    <View style={{padding: 10}}>
                                        <Text style={{color: '#FD5266', fontWeight: 'bold'}}>Dúvidas</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={{height: 100, width: 100, backgroundColor: 'white', borderRadius: 10, marginLeft: 10}}>
                                    <View style={{display: 'flex', padding: 10, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                        <SimpleLineIcons name="settings" size={20} color="#FD5266" />
                                    </View>
                                    <View style={{padding: 10}}>
                                        <Text style={{color: '#FD5266', fontWeight: 'bold'}}>Indicar amigo</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={{height: 100, width: 100, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 10, marginLeft: 10, marginRight: 10}}>
                                    <View style={{display: 'flex', padding: 10, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                        <SimpleLineIcons name="settings" size={20} color="#FD5266" />
                                    </View>
                                    <View style={{padding: 10}}>
                                        <Text style={{color: '#FD5266', fontWeight: 'bold'}}>Seus pontos</Text>
                                    </View>
                                </TouchableOpacity>
                        </ScrollView>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',
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
    checkboxInput: {
        flexDirection: "row",
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start'
    },
});