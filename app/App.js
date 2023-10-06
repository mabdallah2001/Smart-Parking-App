
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View , Image, LogBox} from 'react-native';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CarRegScreen from './screens/CarRegScreen';
import HomeScreen from './screens/HomeScreen';
import CounterScreen from './screens/CounterScreen';
import SettingsScreen from './screens/SettingsScreen';
import SComplex from './pages/SComplex';
import StudCenter from './pages/StudCenter';
import Physics from './pages/Physics';
import SBA from './pages/SBA';
import Library from './pages/Library';
import FreeP1 from './pages/FreeP1';
import FreeP2 from './pages/FreeP2';
import EditProf from './pages/EditProf'
import Subscription from './pages/Subscription'
import Funds from './pages/Funds'
import ContactUs from './pages/ContactUs'
import Payment from './pages/Payment'


import {StripeProvider} from '@stripe/stripe-react-native';









import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

LogBox.ignoreAllLogs();


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  headerTitleStyle: {color:"white"}, 
  headerTintColor: "white",
}

function Home() {
  return (
    <Tab.Navigator screenOptions={globalScreenOptions} >
     <Tab.Screen name="Home" component={HomeScreen} options={{
       tabBarIcon:({focused}) => (
        <View>
          <Image 
            source={require('./icons/home.png')}
            style={{tintColor: focused ? '#2C6BED' : 'gray',  width:30,
            height: 30,
            marginTop: 5,}}
          />
        
        </View>
       )
     }}/>
          <Tab.Screen name="Office" component={CounterScreen} options={{
       tabBarIcon:({focused}) => (
        <View >
          <Image 
            source={require('./icons/people.png')}
            style={{tintColor: focused ? '#2C6BED' : 'gray',  width:30,
            height: 30,
            marginTop: 5,}}
          />
        

        </View>
       )
     }}/>
          <Tab.Screen name="Settings" component={SettingsScreen} options={{
       tabBarIcon:({focused}) => (
        <View >
          <Image 
            source={require('./icons/settings.png')}
            style={{tintColor: focused ? '#2C6BED' : 'gray',  width:27,
            height: 27,
            marginTop: 5,}}
          />
        </View>
       )
     }}/>

    </Tab.Navigator>
  );
}

function App() {


  return (
    <StripeProvider publishableKey="pk_test_51KTugfB8vhb9ZmvPaDZM44Ua4pV6IepGmG0or84O3aPSRXVUi60HziqVPVW8yCJSItVPlR2ghZ2FyaxL3Evx5DGD008ykP8eSx">
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        {/* <Stack.Screen name = 'Login' component = {LoginScreen} />
        <Stack.Screen name = 'Register' component = {RegisterScreen} /> */}
        <Stack.Screen options={{headerShown: false}} name = 'HomeNav' component = {Home} />
        <Stack.Screen name = 'Sports Complex' component = {SComplex} />
        <Stack.Screen name = 'Student Center' component = {StudCenter} />
        <Stack.Screen name = 'Physics' component = {Physics} />
        <Stack.Screen name = 'SBA' component = {SBA} />
        <Stack.Screen name = 'Library' component = {Library} />
        <Stack.Screen name = 'Free Parking 1' component = {FreeP1} />
        <Stack.Screen name = 'Free Parking 2' component = {FreeP2} />
        <Stack.Screen name = 'Edit Profile' component = {EditProf} />
        <Stack.Screen name = 'Subscription' component = {Subscription} />
        <Stack.Screen name = 'Funds' component = {Funds} />
        <Stack.Screen name = 'Contact' component = {ContactUs} />

        
        <Stack.Screen name = 'Payment' component = {Payment} />
        




      </Stack.Navigator>
     

      </NavigationContainer>
      </StripeProvider>

    
  

  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
