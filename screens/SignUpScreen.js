import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity,TouchableWithoutFeedback, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, TextInput, RadioButton, Divider, Avatar } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Select from '../components/select';
import List from '../components/List'



const SignUpScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
   
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                    <FontAwesome name="bars" size={24} color='#003c30' onPress={() => navigation.toggleDrawer()} />
                </View>

                <View>
                    <Text style={styles.headerTitle}>Sign Up</Text>
                </View>
            </View>

            <View style={styles.formDetailsBg}>

                <Avatar.Image size={124} style={styles.avatar__img} source={require('../images/icons/user.png')} />

                <Animatable.View 
                    animation="fadeInUpBig"
                    style={styles.footer}>
                        
                    <ScrollView>

                        <View style={styles.formScrollHeight}>
                        <View style={styles.form_layout}>
                            <View style={styles.form__input__container}>
                                <TextInput style={styles.text__input} theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} mode="outlined" selectionColor="#6e6e6e" underlineColor="#6e6e6e" outlineColor="#6e6e6e" label="Enter Full Name" value={name} placeholder="Full Name" onChangeText={name => setName(name)} />
                            </View>

                            <View style={styles.form__input__container}>
                                <TextInput secureTextEntry={true} style={styles.text__input} theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} mode="outlined" selectionColor="#6e6e6e" underlineColor="#6e6e6e" outlineColor="#6e6e6e" label="Enter Email" value={email} placeholder="Email" onChangeText={email => setEmail(email)} />
                            </View>

                            <View style={styles.form__input__container}>
                                <TextInput style={styles.text__input} theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} mode="outlined" selectionColor="#6e6e6e" underlineColor="#6e6e6e" outlineColor="#6e6e6e" label="Enter Mobile Number" value={phone} placeholder="Mobile Number" onChangeText={phone => setPhone(phone)} />
                            </View>

                            <View style={styles.form__input__container}>
                                <TextInput secureTextEntry={true} style={styles.text__input} theme={{ colors: { primary: '#003c30',underlineColor:'transparent'}}} mode="outlined" selectionColor="#6e6e6e" underlineColor="#6e6e6e" outlineColor="#6e6e6e" label="Enter Password" value={password} placeholder="Password" onChangeText={password => setPassword(password)} />
                            </View>

                        </View>

                        <View style={styles.button}>
                            <TouchableWithoutFeedback
                                style={styles.signIn}
                                onPress={() => {alert('working on it!!!')}}
                            >
                            <LinearGradient
                                colors={['#003127','#003c30',  '#003127']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color:'#FFF'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                            </TouchableWithoutFeedback>

                                <Text style={styles.signUpLink}>Already have an account?</Text>

                            <TouchableOpacity
                                onPress={() => {navigation.navigate('SignUp')}}
                                style={[styles.signIn, {
                                    borderColor: '#003127',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#003127'
                                }]}>Sign In</Text>
                            </TouchableOpacity>

                        </View>

                        </View>
                    </ScrollView>
                </Animatable.View>
               
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
        marginLeft: 50,
    },
    signUpLink: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
        // justifyContent: 'center'
        alignItems: 'center',
    },
    avatar__img: {
        backgroundColor: '#FFF',
        position: 'relative',
        bottom: -50,
        zIndex: 1000,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 9,
    },
    form_layout: {
        marginTop: 25,
        // height: 400,
    },
    formScrollHeight: {
        height: 900,
    },
    textSign: {
        fontSize: 15,
        fontFamily: 'Montserrat-Light',
    },
    footer: {
        zIndex: 100,
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#FFF',
        color: '#FFF',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: width - 20,
        // height: height - 400,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text__input: {
        width: width - 65,
        height: 50,
        marginVertical: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
})

export default SignUpScreen
