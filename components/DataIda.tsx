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
import { FontAwesome, Feather } from '@expo/vector-icons';
import axios from 'axios';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Calendario(e) {
    const route = useRoute();
    const navigation = useNavigation();
    const [marked, setMarked] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    LocaleConfig.locales['pr-br'] = {
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan.','Fev.','Mar','Abri','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
        today: 'Hoje'
    };
      
    LocaleConfig.defaultLocale = 'pr-br';
    
    function Selected (day) {
        if(marked != null){
            if(day.dateString === selectedDate){
                setMarked({[day.dateString] : {selected: false}});
                setSelectedDate(null)
            }else{
                setMarked({[day.dateString] : {selected: true, selectedColor: '#FD5266'}});
                setSelectedDate(day.dateString)
            }
        }else{
            setMarked({[day.dateString] : {selected: true, selectedColor: '#FD5266'}});
            setSelectedDate(day.dateString)
        }
    }

    function Voltar(){
        navigation.navigate("Viagem", {
            dateGo: selectedDate,
        });
    }

    return (
      <>
        {e.params == true ?
            <>
                <CalendarList
                    current={new Date()}
                    minDate={new Date()}
                    markedDates={marked}
                    disableAllTouchEventsForDisabledDays={true}
                    pastScrollRange={0}
                    futureScrollRange={12}
                    scrollEnabled={true}
                    showScrollIndicator={false}
                    onDayPress={(day) => Selected(day)}
                />
                <View style={{position: 'absolute', bottom: 0, width: '100%', alignItems: 'center'}}>
                    <TouchableOpacity activeOpacity={1} onPress={() => Voltar()} style={{shadowOffset:{  width: 0,  height: 0 }, shadowColor: 'black', shadowRadius: 5, shadowOpacity: 0.3, width: 200, padding: 10, backgroundColor: '#FD5266', borderRadius: 100}}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Pronto</Text>
                    </TouchableOpacity>
                </View>
            </>
        : <></>
        }
      </>
    );
  }
  
export default function Viagem(props) {

    const navigation = useNavigation();
    const route = useRoute();
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        var timer = setInterval(function() {
            setShowCalendar(true)
            clearInterval( timer);
        }, 100);
    }, [showCalendar])

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FD5266' }} />
            <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'white'}}>
                <Header name={'Data início'} icon1={<Feather name="chevron-left" size={24} color="white" />} icon2={''} colorText={'white'} color='#FD5266' onPress1={() => navigation.goBack()}/>
                <View style={styles.centeredView}>
                    <Calendario params={showCalendar} />
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
});