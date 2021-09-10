import React from 'react';
import { View, StyleSheet } from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch, Text} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 


export default function DrawerContent(props) {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image source={require('../images/explorer.jpg')} size={50} />
                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style={styles.title}>
                                    Emmanuel Kymani
                                </Title>

                                <Caption style={styles.caption}>
                                    02451601234
                                </Caption>
                            </View>
                        </View>

                        <View style={styles.row}>

                            <View style={styles.section}>
                                {/* <Paragraph style={[styles.papragraph, styles.caption]}>100 </Paragraph> */}
                                <Caption style={styles.caption}> kymani201000@gmail.com</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        {/* THIS BLOCK IS FOR THE MENU ITEMS */}
                        <DrawerItem icon={({color, size}) => (
                            <FontAwesome name="home" color="black" size={24} />
                        )} 
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <Octicons name="history" size={24} color="black" />
                        )} 
                        label="Booking History"
                        onPress={() => {props.navigation.navigate('History')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <MaterialCommunityIcons name="face-profile" size={24} color="black" />
                        )} 
                        label="Profile"
                        onPress={() => {props.navigation.navigate('Profile')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <Entypo name="share" size={24} color="black" />
                        )} 
                        label="Share"
                        onPress={() => {props.navigation.navigate('Share')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <MaterialCommunityIcons name="home-currency-usd" size={24} color="black" />
                        )} 
                        label="Change Currency"
                        onPress={() => {props.navigation.navigate('Currency')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <Feather name="lock" size={24} color="black" />
                        )} 
                        label="Change Password"
                        onPress={() => {props.navigation.navigate('Password')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <MaterialIcons name="rate-review" size={24} color="black" />
                        )} 
                        label="Reviews"
                        onPress={() => {props.navigation.navigate('Reviews')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <Entypo name="creative-commons-attribution" size={24} color="black" />
                        )} 
                        label="About Us"
                        onPress={() => {props.navigation.navigate('About')}}
                        />

                        <DrawerItem icon={({color, size}) => (
                            <FontAwesome5 name="phone-volume" size={24} color="black" />
                        )} 
                        label="Contact Us"
                        onPress={() => {props.navigation.navigate('Contact')}}
                        />
                        
                        
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            {/* THIS BLOCK IS FOR THE BOTTOM  */}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem icon={({color, size}) => (
                    <MaterialIcons name="logout" size={24} color="black" />
                )} 
                label="Sign Out"
                onPress={() => {alert('working on it')}}
                />
            </Drawer.Section>
            {/* THIS BLOCK IS FOR THE BOTTOM */}
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      borderBottomColor: '#CCC',
      borderBottomWidth: 1,
    //   backgroundColor: 'teal'
    },
    title: {
      fontSize: 14,
      marginTop: 3,
      fontFamily: 'Montserrat-Medium'
    },
    caption: {
      fontSize: 11,
      lineHeight: 14,
      fontFamily: 'Montserrat-Regular'
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    label: {
        fontFamily: 'Oswald-Regular'
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      borderTopColor: '#f4f4f4',
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

