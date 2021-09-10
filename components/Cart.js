import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import {useSelector, useDispatch} from 'react-redux';
import { toggleSeats } from '../store/actions/booking';

import CartItem from '../models/cartItem';
import * as bookingActions from '../store/actions/booking';

const Cart = ({navigation, serviceType}) => {
    // const bookedSeats = useSelector(state =>  state.booking.bookedSeats);
    const TotalAmount = useSelector(state => state.booking.total);
    const transformedCartItems = [];
    const bookSeats = useSelector(state => {
        for (const key in state.booking.bookedSeats) {
                transformedCartItems.push({
                    uniq: key,
                    seatId: state.booking.bookedSeats[key].seatId,
                    seatNo: state.booking.bookedSeats[key].seatNo,
                    price: state.booking.bookedSeats[key].price,
                    gender: 'Male',
                    fullname: '',
                    dob: '',
                    age: '',
                    idType: '',
                    idNumber: '',
                    nationality: '',
                });
            
        }
        return transformedCartItems;
      });

    const dispatch = useDispatch();

    return (
        <View style={styles.seatInterporation__results}>
            <View style={styles.booked__details__container}>
                <Text style={styles.booking__details__seats}>
                    <FlatList
                        data={bookSeats}
                        horizontal
                        keyExtractor={item => item.uniq}
                        renderItem={itemData => (
                            <CartItem seatNo={itemData.item.seatNo} />
                        )}
                    />
                </Text>
            </View>

            <Text style={styles.booking__details}> GH₵ : {TotalAmount} </Text>

            <View style={styles.book__btn__container}>
               {transformedCartItems.length > 0 ? (
                <Button color='#003c30' mode="contained" onPress={() => navigation.navigate('Traveller',{traveller: transformedCartItems, serviceType: serviceType})}>
                    Book
                </Button>
                )
                : 
                (
                <Button color='#003c30' mode="contained" onPress={() => {alert('SELECT A SEAT')}}>
                    Book
                </Button>
                )}
                
            </View>

        </View>
        // <View style={styles.seatInterporation__results}>
        //     <View style={styles.booked__details__container}>
        //          <Text style={styles.booking__details}>
        //          {bookedSeats.length > 0 && (
        //              bookedSeats.map((item, index) => {
        //                  return <Text key={index}>{item.seatNo},</Text>
        //              })
        //          )}
        //          </Text>
        //         <Text style={styles.booking__details}>{bookedSeats.length > 0 && ('GH₵')} {bookedSeats.length > 0 && (total * bookedSeats.length)}</Text>
                
        //     </View>
        //     <Text>{bookedSeats.length}</Text>
        //     <View style={styles.book__btn__container}>
        //         {bookedSeats.length > 0 ? (
        //         <Button color='#003c30' mode="contained" onPress={() => navigation.navigate('Traveller',{busFare: busFare})}>
        //             Book
        //         </Button>
        //         )
        //         : 
        //         (
        //         <Button color='#003c30' mode="contained" onPress={() => {alert('SELECT A SEAT')}}>
        //             Book
        //         </Button>
        //         )}
                
        //     </View>
        // </View>
       
    );
}



const styles = StyleSheet.create({
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
    booked__details__container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    booking__details: {
        // flex: 1,
        borderColor: '#CCC',
        borderRightWidth: 1,
        // marginRight: 5,
        fontFamily: 'Montserrat-SemiBold'
    },
    booking__details__seats: {
        // flex: 1,
        // width: '100%',
        // marginRight: 5,
        borderColor: '#CCC',
        borderRightWidth: 1,
        overflow: 'hidden',
        fontFamily: 'Montserrat-SemiBold'
    },
    book__btn__container: {
        // flex: 1,
        marginRight: 5,
        borderColor: '#CCC',
    }
})

export default Cart;
