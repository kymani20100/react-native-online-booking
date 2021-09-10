import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableHighlight, Platform, Dimensions, Image, FlatList, Button, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableRipple } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useSelector, useDispatch } from 'react-redux';
import * as busActions from '../store/actions/buses';

const SPACING = 5;
const AVATAR_SIZE = 15;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const FormDetailsScreen = ({route, navigation}) => {
    const { cityFrom, cityFromId, cityTo, cityToId, tripDate } = route.params;

    
   const trip_date = JSON.parse(tripDate);
   const splitted_date = trip_date.split("/");

    let output = '';
    if(splitted_date[0] === "1"){
        output = 'Jan';
    }else if(splitted_date[0] === "2"){
        output = 'Feb';
    }else if(splitted_date[0] === "3"){
        output = 'Mar';
    }else if(splitted_date[0] === "4"){
        output = 'Apr';
    }else if(splitted_date[0] === "5"){
        output = 'May';
    }else if(splitted_date[0] === "6"){
        output = 'Jun';
    }else if(splitted_date[0] === "7"){
        output = 'Jul';
    }else if(splitted_date[0] === "8"){
        output = 'Aug';
    }else if(splitted_date[0] === "9"){
        output = 'Sep';
    }else if(splitted_date[0] === "10"){
        output = 'Oct';
    }else if(splitted_date[0] === "11"){
        output = 'Nov';
    }else if(splitted_date[0] === "12"){
        output = 'Dec';
    }
    // THIS BLOCK FORMATS THE DATE
    const formatted_date = `${splitted_date[1]}-${output}-${splitted_date[2]}`;

    const buses = useSelector(state =>  state.buses.availableBuses);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(busActions.fetchBuses(JSON.parse(cityFromId),JSON.parse(cityToId),formatted_date));
    },[dispatch])

    const EmptyComponent = () => {
        return (
            <View style={styles.flatlist__placeholder}>
                <View>
                    <Image source={require('../images/icons/dots.gif')} style={styles.loading} />
                </View>
                <Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    Finding you a bus...
                </Text>
            </View>
        );
    }

   

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                <Ionicons name="arrow-back-outline" size={24} color='#003c30' onPress={() => navigation.goBack()} />
                    
                </View>

                <View>
                    <Text style={styles.headerTitle}>STC BUSES</Text>
                </View>
            </View>

            <View style={styles.formDetailsBg}>

                <View style={styles.form__details__section}>
                    <View style={styles.img__bg}>
                        <FontAwesome5 name="map-marker-alt" size={35} color="#fe0103" />
                    </View>
                    
                    <View style={styles.detailsText}>
                        <View style={styles.destination_format_style}>
                            <Text style={styles.destination_small_form}>From : </Text>
                            <Text style={styles.form__details__padding}>{JSON.parse(JSON.stringify(cityFrom))}</Text>
                        </View>

                        <View style={styles.destination_format_style}>
                            <Text style={styles.destination_small_form}>To : </Text>
                            <Text style={styles.form__details__padding_to}>{JSON.parse(JSON.stringify(cityTo))}</Text>
                        </View>

                        <View style={styles.destination_format_style}>
                            <Text style={styles.destination_small_form}>Date : </Text>
                            <Text style={styles.form__details__padding_date}>{formatted_date}</Text>
                        </View>
                    </View>
                </View>

                

                <FlatList data={buses} keyExtractor={item => item.id} 
                    
                        ListEmptyComponent={ <EmptyComponent />}
                        renderItem={itemData => (
                            <TouchableOpacity
                            activeOpacity={.9}
                            style={styles.sinIn}
                            onPress={() => {
                                itemData.item.id !== '0' ? (
                                    navigation.navigate('BusSeatPicker',{
                                        busID: JSON.stringify(itemData.item.id),
                                        busFare: JSON.stringify(itemData.item.fare),
                                        cityFromId: JSON.stringify(cityFromId),
                                        cityToId: JSON.stringify(cityToId),
                                        travelDate: JSON.stringify(formatted_date),
                                        serviceType: JSON.stringify(itemData.item.service),
                                    })
                                ) : (
                                    navigation.navigate('Home')
                                )
                                }}>
    
    
                            <LinearGradient colors={itemData.item.id !== '0' ? (['#002d24', '#003c30', '#002d24']) : (['#127f41', '#148d49', '#127f41'])} style={styles.stc__bus__bg}>
                                <View style={styles.form__navigation__seat__page}>
                                    <View>
                                        <Text style={styles.destination_small_form_api}>{itemData.item.terminal}</Text>
                                    </View>
    
                                    <View style={styles.row__column}>
                                        <View style={styles.img__bg}>
                                            <Image style={styles.destination_from_img_fare_seat} source={require('../images/bus.png')} />
                                        </View>
    
                                        <View style={styles.detailsText_fare}>
                                            <Text style={styles.destination_small_form_grey}>Departure Time - {itemData.item.departure}</Text>
                                            <Text style={styles.destination_small_form_grey}>{itemData.item.seat} Totals seats - {itemData.item.lseat} Seats left</Text>
                                            <View style={styles.two__block__float}>
                                            <Text style={styles.destination_small_form_fare}>GH₵ {itemData.item.fare}</Text>
                                            <FontAwesome name="chevron-right" size={14} color="#FFF" />
                                            </View>
                                        </View>
                                    </View>
                                </View>
    
                            </LinearGradient>
                        </TouchableOpacity>
                    )} />

                

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
        marginRight: 40,
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
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: height - 40,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
    destination_from_img:{
        width: 40,
        height: 40,
        // borderRadius: 15,
    },
    destination_from_img_fare_seat: {
        width: 35,
        height: 17,
    },
    img__bg__icon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 40,
        textAlign: 'right'
    },
    section: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 60,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    form__details__section: {
        backgroundColor: '#FFF',
        width: width - 39,
        height: 100,
        borderRadius: 15,
        overflow: 'hidden',
        paddingLeft: 10,
        paddingRight: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    form__details__section__navigation: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        paddingLeft: 10,
        paddingRight: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 2,
    },
    form__details__padding: {
        paddingLeft: 10,
        color: '#003c30',
        fontFamily: 'Montserrat-Medium',
    },
    form__details__padding_to: {
        paddingLeft: 30,
        color: '#003c30',
        fontFamily: 'Montserrat-Medium',
    },
    form__details__padding_date: {
        paddingLeft: 14,
        color: '#003c30',
        fontFamily: 'Montserrat-Medium',
    },
    sectionTotal: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 150,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    detailsText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        marginTop: 15,
        marginLeft: 10,
        paddingLeft: 3,
        paddingRight: 10,
        width: width - 35,
        height: 80,
        flexWrap: 'wrap',
    },
    destination_format_style: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    detailsText_fare: {
        marginLeft: 10,
        paddingLeft: 3,
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    img__bg: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    destination_city: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#003c30',
        marginTop: -7,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        fontWeight: 'bold',
        fontSize: 18
    },
    continueButton: {
        width: width - 15,
        paddingHorizontal: 10,
    },
    destination_small:{
        color: '#949594',
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        flexWrap: 'wrap',
    },
    destination_small_form: {
        color: '#003c30',
        fontSize: 13,
        // flexWrap: 'wrap',
        // width: '100%',
        fontFamily: 'Montserrat-Regular'
    },
    destination_small_form__price: {
        color: '#003c30',
        fontSize: 13,
        // justifyContent: 'space-between',
        fontFamily: 'Montserrat-ExtraBold'
    },
    destination_small_form_fare: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 10,
        fontFamily: 'Montserrat-SemiBold'
    },
    destination_small_form_grey: {
        color: '#f5f5f5',
        fontSize: 12,
        // flexWrap: 'wrap',
        // width: '100%',
        fontFamily: 'Montserrat-Light'
    },
    destination_small_form_api: {
        color: '#FFF',
        fontSize: 12,
        flexWrap: 'wrap',
        paddingRight: 10,
        fontFamily: 'Montserrat-SemiBold'
    },
    destination_text_component: {
        color: '#003c30',
        fontSize: 14,
        flexWrap: 'wrap',
        fontFamily: 'Montserrat-ExtraBold'
    },
    destination_price: {
        color: '#003c30',
        fontSize: 14,
        fontFamily: 'Montserrat-Black'
    },
    textSign: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold'
    },
    form__navigation__seat__page: {
        width: width - 35,
        height: 130,
        paddingHorizontal: 15, 
        paddingVertical: 15,
        flexDirection: 'column',
    },
    stc__bus__bg: {
        borderRadius: 15,
        marginBottom: 15,
    },
    stc__bus: {
        width: width - 15,
    },
    row__column: {
        flexDirection: 'row',
    },
    two__block__float: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loading: {
        width: 200,
        height: 200,
    },
    flatlist__placeholder: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    }
})

export default FormDetailsScreen
