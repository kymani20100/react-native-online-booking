import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './screens/DrawerContent';
import { ActivityIndicator, Colors } from 'react-native-paper';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { AppLoading} from 'expo';
const {width, height} = Dimensions.get('screen');

// Redux
// import {Provider} from 'react-redux';
// import store from './Redux/store';
import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import seatsReducer from './store/reducers/seats';
import routesReducer from './store/reducers/routes';
import busesReducer from './store/reducers/buses';
import bookingReducer from './store/reducers/booking';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  seats: seatsReducer,
  routes: routesReducer,
  buses: busesReducer,
  booking: bookingReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// import {StateProvider} from './src/StateProvider';
// import reducer, {initialState} from './src/reducer';

// IMPORT MY OWNS SCREENS
import HomeScreen from './screens/HomeScreen';
import FormDetailsScreen from './screens/FormDetailsScreen';
import BusSeatPicker from './screens/BusSeatPicker';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShareScreen from './screens/ShareScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import ChangeCurrencyScreen from './screens/ChangeCurrencyScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import TravellerDetailsScreen from './screens/TravellerDetailsScreen';
import JourneyDetailsScreen from './screens/JourneyDetailsScreen'
import Loading from './screens/Loading'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {
  const [loaded] = useFonts({
    'Oswald-Regular' : require('./assets/fonts/Oswald-Regular.ttf'),
    'Oswald-Light' : require('./assets/fonts/Oswald-Light.ttf'),
    'Oswald-Medium' : require('./assets/fonts/Oswald-Medium.ttf'),
    'Oswald-ExtraLight' : require('./assets/fonts/Oswald-ExtraLight.ttf'),
    'Oswald-SemiBold' : require('./assets/fonts/Oswald-SemiBold.ttf'),
    'Oswald-Bold' : require('./assets/fonts/Oswald-Bold.ttf'),
    'Montserrat-ExtraLight' : require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-Light' : require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Regular' : require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium' : require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold' : require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-ExtraBold' : require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-Black' : require('./assets/fonts/Montserrat-Black.ttf'),
  });

  if(!loaded) {
    return (
      <Loading />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="FormDetails" component={FormDetailsScreen} />
            <Drawer.Screen name="BusSeatPicker" component={BusSeatPicker} />
            <Drawer.Screen name="SignUp" component={SignUpScreen} />
            <Drawer.Screen name="SignIn" component={SignInScreen} />
            <Drawer.Screen name="History" component={BookingHistoryScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Currency" component={ChangeCurrencyScreen} />
            <Drawer.Screen name="Share" component={ShareScreen} />
            <Drawer.Screen name="Password" component={ChangePasswordScreen} />
            <Drawer.Screen name="Reviews" component={ReviewsScreen} />
            <Drawer.Screen name="About" component={AboutUsScreen} />
            <Drawer.Screen name="Contact" component={ContactUsScreen} />
            <Drawer.Screen name="Traveller" component={TravellerDetailsScreen} />
            <Drawer.Screen name="Journey" component={JourneyDetailsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
        </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader_gif: {
    width: 70,
    height: 70,
  }
});
