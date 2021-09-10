import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';

// REDUX
import {useSelector, useDispatch} from 'react-redux';
// import { toggleSeats } from '../store/actions/booking';
import * as bookingActions from '../store/actions/booking';

const Card = (data) => {
    const [isSelected, setIsSelected] = useState(false);
    // const [visible, setVisible] = useState('Hide');
    // const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    // MY API DATA 
    const { props } = data;
    
    //  console.log('CARD',props)

    const dispatch = useDispatch();
    
    // if(props.length > 0){
    //     isbookedSeats = useSelector(state =>  state.seats.bookedSeats.some(seat => seat.seatNo === props.seatNo));
    // }

    //  const isbookedSeats = useSelector(
    //     state =>  state.seats.seats.find(seat => seat.seatNo === props.seatNo)
    // );
     

    // useEffect(()=> {
    //     isbookedSeats = useSelector(state =>  state.seats.bookedSeats.some(seat => seat.seatNo === props.seatNo));
    // }, [props])

    //  const toggleSeatsHandler = useCallback(() => {
    //     setIsSelected(!isSelected);
    //     dispatch(toggleSeats(props.seatNo));
    //  }, [dispatch]);

    const toggleSeatsHandler = () => {
        setIsSelected(!isSelected);
        dispatch(bookingActions.toggleSeats(props));
    }

    return <>
            {props.showStatus === '1' && props.bookStatus === '0' && (
                
                <TouchableOpacity onPress={toggleSeatsHandler}>
                    <View style={styles.card}>
                        <View style={styles.centered__seat__number}>
                            {isSelected ? (
                                <Image style={styles.flatList__seat} source={require('../images/icons/selected.png')} />
                            ) : (
                                <Image style={styles.flatList__seat} source={require('../images/icons/seat.png')} />
                            )}
                            <Text style={styles.seat__numbering}>{props.seatNo}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            {props.showStatus === '1' && props.bookStatus === '1' && (
                <TouchableOpacity onPress={() => {alert('I am Booked')}}>
                    <View style={styles.card}>
                        <View style={styles.centered__seat__number}>
                            <Image style={styles.flatList__seat} source={require('../images/icons/booked.png')} />
                            <Text style={styles.seat__numbering}>{props.seatNo}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            {props.showStatus === '0' && props.seatNo === '0' && (
                    <View style={styles.blank_space}>

                    </View>
            )}
            

        </>

}

const styles = StyleSheet.create({
    card: {
        height: 40,
        backgroundColor: '#F1F1F1',
        width: 40,
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 2,
    },
    blank_space: {
        height: 35,
        width: 35,
    },
    centered__seat__number: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList__seat: {
        width: 18,
        height: 18,
    },
    seat__numbering: {
        fontSize: 7,
        fontFamily: 'Montserrat-Regular',
    },
})

export default Card;
