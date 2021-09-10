import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView, Button,TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List'

const HomeScreen = ({navigation}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [tripDate, setTripDate] = useState([]);
    const [fromTripId, setFromTripId] = useState('');
    const [toTripId, setToTripId] = useState('');
    const [formData, setFormData] = useState({
        cityFrom: '',
        cityFromId: '',
        cityTo: '',
        cityToId: '',
        TripDate: '',
    });

    const limit = (string = '', limit = 0) => {  
        return string.substring(0, limit)
      }

    const [cityFrom, setCityFrom] = useState('');
    const [cityTo, setCityTo] = useState('');

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
    //   console.warn("A date has been picked: ", date);
    const selectedDate = new Date(date); // pass in date param here
    const formattedDate = `${selectedDate.getMonth()+1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
        setTripDate(formattedDate);
        handleTripDate(date)
        hideDatePicker();
    };

    const handleSelectFrom = (name, id) => {
        setFromTripId(id);
        setCityFrom(name);
        
        setFormData({
            ...formData,
            cityFrom: name,
            cityFromId: id
        });
    }

    const handleSelectTo = (name, id) => {
        setCityTo(name);
        setToTripId(id);
        
        setFormData({
            ...formData,
            cityTo: name,
            cityToId: id
        });
    }

    const handleTripDate = (val) => {
        // alert(val)
        setFormData({
            ...formData,
            TripDate: val
        });
    }

    const handleSubmit = () => {
        const pageData = formData;
        // navigation.setParams({pageData});
        const formSerialize = JSON.stringify({pageData});
        if(cityFrom != '' && cityTo != '' && tripDate != ''){
            navigation.navigate('FormDetails', {
                cityFrom: cityFrom,
                cityFromId: fromTripId,
                cityTo: cityTo,
                cityToId: toTripId,
                tripDate: JSON.stringify(tripDate)
            });
        }else{

            alert('Form Fields Required')
        }
        

        // navigation.navigate('FormDetails');
    }

    // ASYNC STORE HERE
    //  AsyncStorage.setItem('@formData', formData);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                    <FontAwesome name="bars" size={24} color='#003c30' onPress={() => navigation.toggleDrawer()} />
                </View>

                <View>
                    <Text style={styles.headerTitle}>STC TRAVEL</Text>
                </View>
            </View>

            <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}>
                
            <ScrollView>

            
            
            <View style={styles.form_input_block}>
                <View style={styles.formIcon}>
                    <FontAwesome5 name="map-marker-alt" size={25} color="#fe0103" />
                </View>
                <View style={styles.formText}>
                    <Select text='Where are you from?' onChangeSelect={(name, id) => handleSelectFrom(name, id)} />
                </View>
            </View>

            <View style={styles.form_input_block}>
                <View style={styles.formIcon}>
                    <FontAwesome5 name="map-marker-alt" size={25} color="#fe0103" />
                </View>
                <View style={styles.formText}>
                    <Select text='Where are you going?'  onChangeSelect={(name, id) => handleSelectTo(name, id)} />
                </View>
            </View>
            <TouchableOpacity activeOpacity={.7} style={styles.action_date_new} onPress={showDatePicker}>
                <View style={styles.form_input_block}>
                    <View style={styles.formIcon}>
                        <Fontisto name="date" size={23} color="#003c30" />
                    </View>
                    <View style={styles.formText}>
                        
                            <Text style={styles.date__format}>{String(tripDate) ? (String(tripDate)) : ('Choose a date')}</Text>
                    
                    </View>
                </View>
            </TouchableOpacity>
            
            

            {/* <Text style={styles.text_footer_relative}>From</Text>
            <View style={styles.action}>
                <Select options={List} text='' onChangeSelect={(id) => handleSelectFrom(id)} />
            </View>

            <Text style={styles.text_footer_relative}>To</Text>
            <View style={styles.action}>
                <Select options={List} text='' onChangeSelect={(name) => handleSelectTo(name)} />
            </View>

            <Text style={[styles.text_footer, {
            }]}>Trip Date</Text>
           
                <TouchableOpacity style={styles.action_date} onPress={showDatePicker}>
                    <Text style={styles.date__format}>{String(tripDate)}</Text>
                </TouchableOpacity> */}
            

        
            
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By clicking `Book Now` you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold',}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontFamily: 'Montserrat-SemiBold',}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableWithoutFeedback
                    style={styles.signIn}
                    onPress={handleSubmit}
                >
                <LinearGradient
                    colors={['#003c30',  '#0f352d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Book Now</Text>
                </LinearGradient>
                </TouchableWithoutFeedback>

                <TouchableOpacity
                    onPress={() => {navigation.navigate('SignIn')}}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

            </View>
            </ScrollView>
        </Animatable.View>

            

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
        marginLeft: 20,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    
    footer: {
        width: '100%',
        flex: 1,
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#eff5f9',
        color: '#003c30',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    formIcon: {
        width: 40,
        height: 40,
        borderRightWidth: 1,
        borderRightColor: '#003c30',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 8,
    },
    formText: {
        flex: 1,
        marginLeft: 15,
        position: 'relative',
        bottom: 2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        
    },
    formTextColor: {
        color: 'grey',
        fontFamily: 'Montserrat-Light',
        fontSize: 15,
    },
    form_input_block: {
        flex: 1,
        flexDirection: 'row',
        width: width - 45,
        height: 50,
        borderWidth: 1,
        borderColor: '#003c30',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    text_header: {
        color: '#003c30',
        // fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15,
        fontFamily: 'Oswald-Regular'
    },
    text_footer: {
        color: '#003c30',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Montserrat-Medium'
    },
    text_footer_relative: {
        color: '#003c30',
        fontSize: 15,
        marginTop: 5,
        marginBottom: -18,
        fontFamily: 'Montserrat-Medium'
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#003c30',
        paddingBottom: 5,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
    },
    action_date: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#003c30',
        paddingBottom: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 15,
        fontFamily: 'Montserrat-Light',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },
    color_textPrivate: {
        color: 'black',
        fontFamily: 'Montserrat-Light',
    },
    STC__BUS__PNG: {
        // marginTop: -30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    date__format:{
        textAlign: 'left',
        position: 'relative',
        top: 10,
        color: '#003c30',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
    }
})

export default HomeScreen
