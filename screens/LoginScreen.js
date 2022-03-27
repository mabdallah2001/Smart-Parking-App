import React, {useEffect, useState} from 'react'
import { StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

 

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged ( (authUser) => {
    //       console. log(authUser);
    //       if (authUser) {
    //         navigation.replace("HomeNav");
    //       }
    //     });
    //     return unsubscribe;
    // }, []);
    
    
    const signIn = () => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(()=> {
            navigation.replace('HomeNav');
          })
          .catch((error) => alert(error));
      };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light'/>
            <Image source = {{uri:"https://www.smartparking.com/asset/524.png",}} 
            style={{width:180, height:180, marginBottom:30}}
            />

            <View style = {styles.inputContainer}>
            <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} type='outline' title="Register" />
            <View style={{height:100}}/>

        </KeyboardAvoidingView>

    )
}


export default LoginScreen



const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10 
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    },
})
