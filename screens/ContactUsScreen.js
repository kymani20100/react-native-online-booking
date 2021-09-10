import React, {useState} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Platform, Dimensions, Image, ScrollView, Button,TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const {width, height} = Dimensions.get('screen');
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';


const ContactUsScreen = ({navigation}) => {
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.drawerBarsIcon}>
                    <FontAwesome name="bars" size={24} color='#003c30' onPress={() => navigation.toggleDrawer()} />
                </View>

                <View>
                    <Text style={styles.headerTitle}>CONTACT US</Text>
                </View>
            </View>

            <View style={styles.formDetailsBg}>

                <View style={styles.section}>
                    <View style={styles.img__bg}>
                        <Image style={styles.destination_from_img} source={require('../images/icons/phone-one.png')} />
                    </View>
                    

                    <View style={styles.detailsText}>
                        <Text style={styles.destination_small}>(+233)-(0)-573-100-375</Text>
                        <Text style={styles.destination_small}>(+233)-(0)-573-100-398</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.img__bg}>
                        <Image style={styles.destination_from_img} source={require('../images/icons/phone-two.png')} />
                    </View>
                    

                    <View style={styles.detailsText}>
                        <Text style={styles.destination_small}>(+233)-(0)-557-943-605</Text>
                        <Text style={styles.destination_small}>(+233)-(0)-557-943-606</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.img__bg}>
                        <Image style={styles.destination_from_img} source={require('../images/icons/email.png')} />
                    </View>
                    

                    <View style={styles.detailsText}>
                        <Text style={styles.destination_small}>support@stcticketing.gov.gh</Text>
                        <Text style={styles.destination_small}>info@stc.gov.gh</Text>
                    </View>
                </View>

                <View style={styles.sectionTotal}>
                    <View style={styles.img__bg}>
                        <Image style={styles.destination_from_img} source={require('../images/icons/address.png')} />
                    </View>
                    

                    <View style={styles.detailsText}>
                        <Text style={styles.destination_small}>No. 1 Ajuma Crescent opposite Awudome </Text>
                        <Text style={styles.destination_small}>Cemetery.</Text>
                        <Text style={styles.destination_small}>P.O.BOX 7384 Ring Road West Industrial</Text>
                        <Text style={styles.destination_small}>Area Accra.</Text>
                    </View>
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
        marginLeft: 30
    },
    formDetailsBg: {
        backgroundColor: '#f4f5f7',
        width: '100%',
        height: height - 40,
        paddingVertical: 20,
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
    sectionTotal: {
        backgroundColor: '#FFF',
        width: width - 15,
        height: 90,
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
        marginLeft: 10,
        padding: 5,
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
        color: '#003c30',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular'
    },
    destination_price: {
        color: '#003c30',
        fontSize: 20,
        fontFamily: 'Montserrat-Black'
    },
    textSign: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold'
    },
})

export default ContactUsScreen
