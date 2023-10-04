import React, {useEffect, useState} from 'react'
import { StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import axios from 'axios';
 

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


          try{
            axios.post("http://localhost:3000/send-key", {
            email: email
            });
          }
          catch (error){
            console.log(error);
          }
          
      };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light'/>
            <Image source = {{uri:"data:image/png;base64,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",}} 
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
