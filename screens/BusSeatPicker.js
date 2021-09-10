import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Platform, Dimensions, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import plants from '../components/plants';

// IMPORT PERSONAL COMPONENTS
//  import BusFooter from  '../components/BusFooter';
import Card from '../components/Card';
import Cart from '../components/Cart';

import { useSelector, useDispatch } from 'react-redux';
import * as seatActions from '../store/actions/seats';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
let seats = [];
const BusSeatPicker = ({route, navigation}) => {
    const {busID, busFare, cityFromId, cityToId, travelDate, serviceType} = route.params;

    const seats = useSelector(state =>  state.seats.seats);
    const sumOfTotal = useSelector(state =>  state.booking.total);
    const dispatch = useDispatch();
    const totalSum = [];
    


    const transformedSeatItems = [];
   
     const bookSeats = useSelector(state => {
         for (const key in state.booking.bookedSeats) {
            transformedSeatItems.push({
                     uniq: key,
                     seatId: state.booking.bookedSeats[key].seatId,
                     seatNo: state.booking.bookedSeats[key].seatNo,
                     price: state.booking.bookedSeats[key].price,
                 });

            totalSum.push(state.booking.bookedSeats[key].price);
             
         }
         return transformedSeatItems;
       });

       const EmptyComponent = () => {
            return (
                <View style={styles.flatlist__placeholder}>
                    <View>
                        <Image source={require('../images/icons/dots.gif')} style={styles.loading} />
                    </View>
                    <Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        Loading seats...
                    </Text>
                </View>
            );
        }

    const BusFooter = () => {
        return  <View style={styles.footer__bottom}></View>
    }

    useEffect(() => {
        dispatch(seatActions.fetchSeats(JSON.parse(cityFromId), JSON.parse(cityToId), JSON.parse(travelDate), JSON.parse(busID)));
    },[dispatch])

    //  console.log('PICKER',seats)

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                <Ionicons name="arrow-back-outline" size={24} color='#003c30' onPress={() => navigation.goBack()} />
                    
                </View>

                <View>
                    <Text style={styles.headerTitle}>SEATING ARRANGEMENT</Text>
                </View>
            </View>

            <View style={styles.formDetailsBg}>

                    <Cart navigation={navigation} serviceType={JSON.parse(serviceType)} />

                    <View style={styles.seatInterporation}>
                        <View style={styles.individualSeat}>
                            <Image style={styles.seat__blank} source={require('../images/icons/seat.png')} />
                            <Text style={styles.seat__description__small}>Empty Seat</Text>
                        </View>

                        <View style={styles.individualSeat}>
                            <Image style={styles.seat__blank} source={require('../images/icons/selected.png')} />
                            <Text style={styles.seat__description__small}>Selected Seat</Text>
                        </View>

                        <View style={styles.individualSeat__last}>
                            <Image style={styles.seat__blank} source={require('../images/icons/booked.png')} />
                            <Text style={styles.seat__description__small}>Booked Seat</Text>
                        </View>
                    </View>

                    <View style={styles.busSimulator}>
                        {seats.length > 0 && (
                            <Animatable.View animation="fadeInLeftBig" style={styles.steering__bus__front}>
                                <Image style={styles.steeringWheel} source={require('../images/icons/steering.png')} />
                            </Animatable.View>
                        )}
                        
                        
                        {/* THIS IS THE BLOCK FOR SEATS */}
                        <View style={styles.centeredBus}>
                            <FlatList 
                                ListEmptyComponent={ <EmptyComponent />}
                                numColumns={7} 
                                data={seats}
                                renderItem={({item}) => {
                                    return <Card props={item} />;
                                }}
                                ListFooterComponent={<BusFooter />}
                            />
                        </View>
                            {/* THIS IS THE BLOCK FOR SEATS */}
                    </View>
         

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
    card: {
        height: 60,
        backgroundColor: '#eaf2e9',
        width: 60,
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 2,
    },
    centered__seat__number: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList__seat: {
        width: 25,
        height: 25,
    },
    seat__numbering: {
        fontSize: 10,
        fontFamily: 'Oswald-Regular'
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
    },
    seat__description__small: {
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
        color: '#8c8d8c',
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
    seatInterporation: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 60,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 4,
    },
    seatInterporation__results: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 50,
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 4,
    },
    footer__bottom: {
        height: 50,
    },
    seat__blank: {
        width: 20,
        height: 20,
    },
    individualSeat: {
         paddingHorizontal: 15,
        // paddingVertical: 15,
        borderRightWidth: 1,
        marginVertical: 5,
        borderRightColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    individualSeat__last: {
        paddingHorizontal: 15,
        // paddingVertical: 15,
        // marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busSimulator: {
        width: width - 15,
        height: 400,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 15,
        paddingVertical: 15,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 4,
    },
    steeringWheel: {
        width: 25,
        height: 25,
        marginLeft: 25,
    },
    centeredBus: {
        // width: width - 25,
        // height: 500,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    steering__bus__front: {
        height: 50,
    },
    footer__bottom: {
        height: 20,
    } ,
    booking__details: {
        marginRight: 15,
    }, 
    booked__details__container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
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

export default BusSeatPicker; 
