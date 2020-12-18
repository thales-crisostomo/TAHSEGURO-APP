import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect} from 'react';
import { RefreshControl, StyleSheet, Text, View, SafeAreaView, Alert, Keyboard, Platform, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { FontAwesome, Feather } from '@expo/vector-icons';
import axios from 'axios';
import SkeletonContent from 'react-native-skeleton-content';
import { TouchableOpacity } from 'react-native-gesture-handler';

const url = 'https://41lh09l2zk.execute-api.us-east-1.amazonaws.com/prod/'

const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
};

export default function CalcularViagem(props) {

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [conteudo, setConteudo] = React.useState('none');
  const [loading, setLoading] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true)
    wait(2000).then(() => {setRefreshing(false), setLoading(false)});
  }, []);

  useEffect(() => {
    var timer = setInterval(function() {
        setLoading(false)
        clearInterval( timer);
    }, 3000);
  }, [])

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#FD5266' }} />
      <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
        <Header name={'Algumas opções para você'} icon1={<Feather name="chevron-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#FD5266' onPress1={() => navigation.goBack()}/>
        <View style={styles.centeredView}>
          <View>
              <ScrollView
                  contentContainerStyle={{height:  1500, padding: 5, flexDirection: 'column'}}
                  showsVerticalScrollIndicator={false}
                  refreshControl={<RefreshControl refreshing={refreshing} tintColor="gray" onRefresh={onRefresh} />}>
                  
                  <View style={{height:  1500,  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <SkeletonContent
                          containerStyle={{ flex: 2, width: '100%', justifyContent: "space-around", margin: '3%', padding: 5}}
                          isLoading={loading} 
                          layout={[ 
                              { key: 'someId', flex: 1, width: '100%', borderRadius: 10},
                          ]}
                      >
                        <>
                        <View style={{flex: 1, justifyContent: "space-around", alignItems: 'center', backgroundColor: 'white', borderRadius: 20, shadowOffset:{  width: 0,  height: 5 }, shadowColor: 'black', shadowRadius: 15, shadowOpacity: 0.2}}>
                          <TouchableOpacity onPress={() => alert('aqiii')}>
                            <View style={{width: '100%', flex: 1, overflow: 'hidden', borderRadius: 10}}>
                              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>AC 250 + TELEMEDICINA</Text>
                              </View>
                              <View style={{flex: 2, marginLeft: '-10%', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row'}}>
                                <Text style={{color: 'gray', fontSize: 30, marginTop: '-7%', fontWeight: 'bold'}}>R$</Text><Text style={{color: '#FD5266', fontSize: 70, fontWeight: 'bold'}}>160</Text>
                              </View>
                              <View style={{flex: 2, padding: 10}}>
                                  <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 20, color: 'gray', textAlign: 'center'}}>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>USD 250.000</Text> - Despesas Médicas, Hospitalares + Despesas Médicas Hospitalares Complementares
                                    </Text>
                                  </View>
                                  <TouchableOpacity>
                                    <Text style={{margin: 15, fontSize: 20, color: '#FD5266', textAlign: 'right'}}>
                                        Mais detalhes 
                                    </Text>
                                  </TouchableOpacity>
                              </View>
                            </View>
                          </TouchableOpacity>
                          </View>
                        </>
                      </SkeletonContent>
                      <SkeletonContent
                          containerStyle={{ flex: 2, width: '100%', justifyContent: "space-around", margin: '3%', padding: 5}}
                          isLoading={loading}
                          layout={[
                              { key: 'someId', flex: 1, width: '100%', borderRadius: 10},
                          ]}
                      >
                        <>
                          <View style={{flex: 1, justifyContent: "space-around", alignItems: 'center', backgroundColor: 'white', borderRadius: 20, shadowOffset:{  width: 0,  height: 5 }, shadowColor: 'black', shadowRadius: 15, shadowOpacity: 0.2}}>
                            <TouchableOpacity onPress={() => alert('aqiii')}> 
                              <View style={{width: '100%', flex: 1, overflow: 'hidden', borderRadius: 10}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                  <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>AC 150 + TELEMEDICINA</Text>
                                </View>
                                <View style={{flex: 2, marginLeft: '-10%', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row'}}>
                                  <Text style={{color: 'gray', fontSize: 30, marginTop: '-7%', fontWeight: 'bold'}}>R$</Text><Text style={{color: '#FD5266', fontSize: 70, fontWeight: 'bold'}}>134</Text>
                                </View>
                                <View style={{flex: 2, padding: 10}}>
                                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                                      <Text style={{fontSize: 20, color: 'gray', textAlign: 'center'}}>
                                          <Text style={{color: 'black', fontWeight: 'bold'}}>USD 150.000</Text> - Despesas Médicas, Hospitalares + Despesas Médicas Hospitalares Complementares
                                      </Text>
                                    </View>
                                    <TouchableOpacity>
                                      <Text style={{margin: 15, fontSize: 20, color: '#FD5266', textAlign: 'right'}}>
                                          Mais detalhes 
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </>
                      </SkeletonContent>
                      <SkeletonContent
                          containerStyle={{ flex: 2, width: '100%', justifyContent: "space-around", margin: '3%', padding: 5}}
                          isLoading={loading}
                          layout={[
                              { key: 'someId', flex: 1, width: '100%', borderRadius: 10},
                          ]}
                      >
                        <>
                          <View style={{flex: 1, justifyContent: "space-around", alignItems: 'center', backgroundColor: 'white', borderRadius: 20, shadowOffset:{  width: 0,  height: 5 }, shadowColor: 'black', shadowRadius: 15, shadowOpacity: 0.2}}>
                            <TouchableOpacity onPress={() => alert('aqiii')}> 
                              <View style={{width: '100%', flex: 1, overflow: 'hidden', borderRadius: 10}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
                                  <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>AC 60 + TELEMEDICINA</Text>
                                </View>
                                <View style={{flex: 2, marginLeft: '-10%', justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row'}}>
                                  <Text style={{color: 'gray', fontSize: 30, marginTop: '-7%', fontWeight: 'bold'}}>R$</Text><Text style={{color: '#FD5266', fontSize: 70, fontWeight: 'bold'}}>91</Text>
                                </View>
                                <View style={{flex: 2, padding: 10}}>
                                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                                      <Text style={{fontSize: 20, color: 'gray', textAlign: 'center'}}>
                                          <Text style={{color: 'black', fontWeight: 'bold'}}>USD 60.000</Text> - Despesas Médicas, Hospitalares + Despesas Médicas Hospitalares Complementares
                                      </Text>
                                    </View>
                                    <TouchableOpacity>
                                      <Text style={{margin: 15, fontSize: 20, color: '#FD5266', textAlign: 'right'}}>
                                          Mais detalhes 
                                      </Text>
                                    </TouchableOpacity>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </>
                      </SkeletonContent>
                      <View style={{padding: 20}}/>
                  </View>
                  
              </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        display: 'flex', 
        flex: 1,
        padding: 5
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