import React, {useState, useEffect, useCallback, Component} from 'react';
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, FlatList, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Button, RadioButton, Divider, Snackbar, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import plants from '../components/plants';
import Countries from '../components/countries';
import Types from '../components/types';
import { Formik } from 'formik';
import * as Yup from 'yup';

// REDUX MAGIC
import {useSelector, useDispatch} from 'react-redux';
import { emptyBucket } from '../store/actions/seats';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';


const TravellerDetailsScreen = ({route, navigation}) => {
    let {traveller} = route.params;
    const dispatch = useDispatch();
    // const details = JSON.parse(traveller);

    console.log('Traveller',traveller)

    const EmptyBucketHandler = useCallback(() => {
        dispatch(emptyBucket());
        navigation.navigate('Home');
    }, [dispatch]);
    
    
    const [age, setAge] = useState('');
    const [citizenship, setCitizenship] = useState('Nationality');
    const [idType, setIdType] = useState('ID Type');
    const [idNumber, setIdNumber] = useState('');
    const [checked, setChecked] = useState('Male');
    const [foreign, setForeign] = useState(false);

    // THIS BLOCK IS FOR THE STATE OF THE FORMS
    const [mobileNumber, setMobileNumber] = useState('');
    const [kinName, setKinName] = useState('');
    const [kinNumber, setKinNumber] = useState('');

    const [fields, setFields] = useState(traveller);

    // const handleFullnameChange = (targetField, value) => {

    //     setFields({...fields, [targetField]: value });
    //     // setFields({ [targetField]: value });

    //     console.log(' Target Fields Reporting ',fields)
    // }

    const handleFullnameChange = (targetField, value) => {
        let targetAcquired = traveller[targetField].fullname;
        targetAcquired = value;

        console.log(' Target Fields Reporting ', targetAcquired);
    }

    // WORKS WITH THE MODAL TO SELECT COUNTRY
    const handleCountrySelect = (val) => {
        setCitizenship(val);
    }

    // WORKS WITH THE MODAL TO SELECT ID TYPE
    const handleIdSelect = (val) => {
        setIdType(val);
    }


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                    <Ionicons name="arrow-back-outline" size={24} color='#003c30' onPress={EmptyBucketHandler} />
                </View>

                <View>
                    <Text style={styles.headerTitle}>TRAVELLER DETAILS</Text>
                </View>
            </View>

            <View style={styles.formDetailsBg}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={200}>
                    <View style={styles.section}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Text style={styles.section__title}>Traveller Information</Text>
                            <Divider />
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Text style={styles.yellow_label}>Note: Name should match that on ID card.</Text>
                            <Divider />
                        </View>
                    </View>

                    <Formik
                        initialValues={traveller}
                        onSubmit={values => console.log(values)}
                        
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            {traveller.map((item,index) => {
                                return (
                                    <View style={styles.section} key={index}>

                                        <View style={styles.firstDetailsText}>
                                            <Text>Passenger {index+1}</Text>
                                            <Text>Seat No : {item.seatNo}</Text>
                                            <Text>Fare : GH₵ {item.price}</Text>
                                        </View>

                                        <View style={styles.firstDetailsText}>
                                            <Text>Passenger {index+1}</Text>
                                            <Text>Seat No : {item.seatNo}</Text>
                                            <Text>Fare : GH₵ {item.price}</Text>
                                        </View>

                                        <View style={styles.radioButton__container}>
                                            <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginRight: 20,}}>
                                                <RadioButton
                                                    label="Male"
                                                        value="Male"
                                                        color="#003c30"
                                                        status={ values[`${index}`].gender === 'Male' ? 'checked' : 'unchecked' }
                                                        onPress={() => {}}
                                                    />
                                                <Text>Male</Text> 
                                            </View>

                                            <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                                                <RadioButton
                                                    label="Female"
                                                        value="Female"
                                                        color="#003c30"
                                                        status={ values[`${index}`].gender === 'Female' ? 'checked' : 'unchecked' }
                                                        onPress={() => {}}
                                                    />
                                                <Text>Female</Text> 
                                            </View>
                                        </View>

                                        <View style={styles.form__input__container}>
                                            <TextInput style={styles.text__input} 
                                            theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                            mode="outlined"
                                            selectionColor="#003c30" 
                                            underlineColor="#003c30" 
                                            outlineColor="grey" 
                                            label="Full Name" 
                                            onBlur={handleBlur(`[${index}].fullname`)}
                                            value={values[`${index}`].fullname}
                                            placeholder="Full Name" 
                                            onChangeText={handleChange(`[${index}].fullname`)} />
                                        </View> 

                                        {foreign ? (
                                            <View style={styles.form__input__container}>
                                                <TextInput style={styles.text__input} 
                                                theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                                mode="outlined"
                                                selectionColor="#003c30" 
                                                underlineColor="#003c30" 
                                                outlineColor="grey" 
                                                label="Date of Birth" 
                                                onBlur={handleBlur(`[${index}].fullname`)}
                                                value={values[`${index}`].fullname}
                                                placeholder="Full Name" 
                                                onChangeText={handleChange(`[${index}].fullname`)} />
                                            </View> 
                                        ) : (
                                            <View style={styles.form__input__container}>
                                                <TextInput style={styles.text__input} 
                                                theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                                mode="outlined"
                                                selectionColor="#003c30" 
                                                underlineColor="#003c30" 
                                                outlineColor="grey" 
                                                label="Full Name" 
                                                keyboardType="numeric"
                                                onBlur={handleBlur(`[${index}].fullname`)}
                                                value={values[`${index}`].fullname}
                                                placeholder="Full Name" 
                                                onChangeText={handleChange(`[${index}].fullname`)} />
                                            </View> 
                                        )}

                                        <View style={styles.nationality}>
                                            <Text style={styles.formText}>
                                                <Types text={idType} data-id={index} onChangeText={handleChange(`[${index}].idType`)} onChangeSelect={(id) => handleIdSelect(id)} />
                                            </Text>
                                        </View>
                                        
                                        <View style={styles.form__input__container}>
                                            <TextInput style={styles.text__input} 
                                            theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                            mode="outlined" selectionColor="#003c30" 
                                            underlineColor="#003c30" outlineColor="grey" 
                                            keyboardType="numeric" label="ID Number" 
                                            value="9213499865" 
                                            placeholder="ID Number" 
                                            onChangeText={() => {}} />
                                        </View>

                                        <View style={styles.nationality}>
                                            <Text style={styles.formText}>
                                                <Countries text={citizenship} data-id={index} onChangeSelect={(id) => handleCountrySelect(id)} />
                                            </Text>
                                        </View>

                                    </View>
                                    // <View>
                                    //     <View style={styles.form__input__container}>
                                    //         <TextInput style={styles.text__input} 
                                    //         theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                    //         mode="outlined"
                                    //         selectionColor="#003c30" 
                                    //         underlineColor="#003c30" 
                                    //         outlineColor="grey" 
                                    //         label="Full Name" 
                                    //         onBlur={handleBlur(`[${index}].fullname`)}
                                    //         value={values[`${index}`].fullname}
                                    //         placeholder="Full Name" 
                                    //         onChangeText={handleChange(`[${index}].fullname`)} />
                                    //     </View> 

                                    //     <View style={styles.form__input__container}>
                                    //         <TextInput style={styles.text__input} 
                                    //         theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                    //         mode="outlined"
                                    //         selectionColor="#003c30" 
                                    //         underlineColor="#003c30" 
                                    //         outlineColor="grey" 
                                    //         label="Age" 
                                    //         onBlur={handleBlur(`[${index}].age`)}
                                    //         value={values[`${index}`].age}
                                    //         placeholder="Age" 
                                    //         onChangeText={handleChange(`[${index}].age`)} />
                                    //     </View>
                                    // </View>
                                );
                            })} 

                            {/* <Button onPress={handleSubmit} title="Submit" /> */}

                            <TouchableWithoutFeedback
                                style={styles.signIn}
                                onPress={handleSubmit}>
                                <LinearGradient
                                colors={['#003c30',  '#0f352d']}
                                style={styles.signIn}>
                                    <Text style={[styles.textSign, {
                                        color:'#fff'
                                }]}>PROCEED TO BOOK</Text>
                                </LinearGradient>
                            </TouchableWithoutFeedback>
                        </View>
                        )}
                    </Formik>
                    
                            
                    

                {/* {traveller.map((item, index) => {
                    
                    return (
                        <View style={styles.section} key={index}>

                            <View style={styles.firstDetailsText}>
                                <Text>Passenger {index+1}</Text>
                                <Text>Seat No : {item.seatNo}</Text>
                                <Text>Fare : GH₵ {item.price}</Text>
                            </View>

                            <View style={styles.radioButton__container}>
                                <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginRight: 20,}}>
                                    <RadioButton
                                        label="Male"
                                            value="Male"
                                            color="#003c30"
                                            status={ fields[index].gender === 'Male' ? 'checked' : 'unchecked'}
                                            onPress={() => {}}
                                        />
                                    <Text>Male</Text> 
                                </View>

                                <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                                    <RadioButton
                                        label="Female"
                                            value="Female"
                                            color="#003c30"
                                            status={fields[index].gender === 'Female' ? 'checked' : 'unchecked'}
                                            onPress={() => {}}
                                        />
                                    <Text>Female</Text> 
                                </View>
                            </View>

                            <View style={styles.form__input__container}>
                                <TextInput style={styles.text__input} 
                                theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                mode="outlined"
                                selectionColor="#003c30" 
                                underlineColor="#003c30" 
                                outlineColor="grey" 
                                label="Full Name" 
                                
                                placeholder="Full Name" 
                                onChangeText={(text) => {handleFullnameChange(index, text)}} />
                            </View>

                            {foreign ? (
                                <View style={styles.form__input__container}>
                                    <TextInput style={styles.text__input} 
                                    theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                    mode="outlined" 
                                    selectionColor="#003c30" 
                                    underlineColor="#003c30" 
                                    outlineColor="grey" 
                                    label="DOB" 
                                    value={item.dob}
                                    placeholder="DOB" 
                                    onChangeText={() => {}} />
                                </View>
                            ) : (
                                <View style={styles.form__input__container}>
                                    <TextInput style={styles.text__input} 
                                    theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                    mode="outlined" 
                                    selectionColor="#003c30" 
                                    underlineColor="#003c30" 
                                    keyboardType="numeric" 
                                    outlineColor="grey" 
                                    label="Age" 
                                    value={item.age}
                                    placeholder="Age" 
                                    onChangeText={() => {}} />
                                </View>
                            )}

                            <View style={styles.nationality}>
                                <Text style={styles.formText}>
                                    <Types text={idType} onChangeSelect={(id) => handleIdSelect(id)} />
                                </Text>
                            </View>
                            
                            <View style={styles.form__input__container}>
                                <TextInput style={styles.text__input} 
                                theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} 
                                mode="outlined" 
                                selectionColor="#003c30" 
                                underlineColor="#003c30" 
                                outlineColor="grey" 
                                keyboardType="numeric" 
                                label="ID Number" 
                                value={item.idNumber} 
                                placeholder="ID Number" 
                                onChangeText={() => {}} />
                            </View>

                            <View style={styles.nationality}>
                                <Text style={styles.formText}>
                                    <Countries text={citizenship} onChangeSelect={(id) => handleCountrySelect(id)} />
                                </Text>
                            </View>

                            </View>
                    );
                })} */}

            </KeyboardAvoidingView>
            </ScrollView>
                
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
    scrollContainer: {
        marginTop: 15,
        paddingHorizontal: 5,
    },
    section: {
        backgroundColor: '#FFF',
        width: width - 40,
        // height: 100,
        borderRadius: 15,
        paddingHorizontal: 10, 
        paddingVertical: 15,
        // flexDirection: 'row',
        marginBottom: 10,
        shadowColor: "#a5a5a6",
        shadowOffset: { width: 0, height: 10},
        shadowOpacity: .5,
        shadowRadius: 20,
        elevation: 5,
    },
    yellow_label: {
        marginBottom: 10,
        backgroundColor: 'yellow', 
        borderRadius: 5, 
        padding: 8, 
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    section__title: {
       marginBottom: 10,
       fontFamily: 'Montserrat-Medium',
       fontSize: 14,
       color: '#000'
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 10
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height + 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
    form__background: {
        // backgroundColor: '#FFF',
        width: width - 15,
        height: 560,
        borderRadius: 15,
        paddingHorizontal: 15, 
        paddingVertical: 20,
        flexDirection: 'column',
        // marginBottom: 15,
        // shadowColor: "#a5a5a6",
        // shadowOffset: { width: 0, height: 10},
        // shadowOpacity: .5,
        // shadowRadius: 20,
        // elevation: 5
    },
    form__section__block: {
        backgroundColor: '#FFF',
        width: width - 35,
        // height: 400,
        padding: 15,
        borderRadius: 15,
    },
    form__container: {
        flex: 1,
        padding: 5,
        width: width - 25,
        // height: 540,
    },
    form__input__container: {
        width: width - 20,
    },
    text__input: {
        width: width - 60,
        height: 50,
        marginVertical: 10,
    },
    firstDetailsText: {
        width: width - 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    radioButton__container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
    signIn: {
        width: width - 55,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    contianerScrollViewMargin: {
        height: 235,
    },
    contentContainer: {
        marginBottom: 50,
    },
    nationality: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 60,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#f6f6f6',
        borderWidth: 1,
        borderColor: '#a0a0a0',
        paddingHorizontal: 15,
        marginVertical: 10,
        overflow: 'hidden'
    },
    formText: {
        color: '#747474',
        fontSize: 16
    }
})

export default TravellerDetailsScreen
