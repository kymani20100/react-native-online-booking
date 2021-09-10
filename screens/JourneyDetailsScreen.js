import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, TextInput, RadioButton, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import plants from '../components/plants';

 // IMPORT PERSONAL COMPONENTS
//  import BusFooter from  '../components/BusFooter';
//  import Card from '../components/Card'

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';


const JourneyDetailsScreen = ({navigation}) => {
    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [checked, setChecked] = useState('Male');
   

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                <Ionicons name="arrow-back-outline" size={24} color='#003c30' onPress={() => navigation.goBack()} />
                    
                </View>

                <View>
                    <Text style={styles.headerTitle}>JOURNEY DETAILS</Text>
                </View>
            </View>

            <View style={styles.formDetailsBg}>

                <View style={styles.form__background}>
                    <Text style={styles.journey__destination}>ACCRA MAIN - CAPE COAST</Text>
                    <Text style={styles.journey__date}>2021-8-20</Text>
                    <View style={styles.travellers__number__seats}>
                        <Text style={styles.grey__title}>Travellers</Text>
                        <Text style={styles.dark__title}>Total Seats : 4</Text>
                    </View>
                    <View style={styles.travellers__number__seats}>
                        <Text style={styles.grey__title}>Fare</Text>
                        <Text style={styles.dark__title}>GH₵ 168</Text>
                    </View>
                </View>

                <View style={styles.form__background__fare}>
                    <Text style={styles.journey__destination}>Fare Details</Text>
                    <View style={styles.travellers__number__seats}>
                        <Text style={styles.grey__title}>Fare</Text>
                        <Text style={styles.dark__title}>GH₵ 168</Text>
                    </View>
                    <View style={styles.travellers__number__seats}>
                        <Text style={styles.grey__title}>Online Transaction</Text>
                        <Text style={styles.dark__title}>GH₵ 12</Text>
                    </View>
                    <View style={styles.travellers__number__seats}>
                        <Text style={styles.grey__title}>Total</Text>
                        <Text style={styles.dark__title}>GH₵ 168</Text>
                    </View>
                </View>

                <TouchableWithoutFeedback
                style={styles.signIn}
                onPress={() => {navigation.navigate('Journey')}}>
                    <LinearGradient
                    colors={['#003c30',  '#0f352d']}
                    style={styles.signIn}>
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>MAKE PAYMENT</Text>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#003c30',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: 35, 
        paddingVertical: 15,
    },
    drawerBarsIcon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginLeft: 25,
        marginRight: 20,
        borderRadius: 20,
        // padding: 15,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 20
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
    form__background: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 130,
        borderRadius: 15,
        paddingHorizontal: 15, 
        paddingVertical: 20,
        flexDirection: 'column',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5
    },
    form__background__fare: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 130,
        borderRadius: 15,
        paddingHorizontal: 15, 
        paddingVertical: 20,
        flexDirection: 'column',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5
    },
    journey__destination: {
        marginBottom: 10,
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        color: '#003c30',  
    },
    travellers__number__seats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    journey__date: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 11,
        color: '#9c9c9c', 
        marginBottom: 5,
    },
    grey__title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: '#9c9c9c', 
        // marginBottom: 5,
    },
    dark__title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: '#000', 
        // marginBottom: 5,
    },
    signIn: {
        width: width - 55,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },  
})

export default JourneyDetailsScreen
