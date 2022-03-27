import React, {useState} from 'react'
import { StyleSheet, Text, Button, KeyboardAvoidingView} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { StatusBar } from 'expo-status-bar';
import { Input } from 'react-native-elements/dist/input/Input';
import { auth } from '../firebase';





const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [occ, setOcc] = useState(null);

    
    const data = [
        { label: 'Student', occ: 'Student' },
        { label: 'Professor', occ: 'Professor' },
        { label: 'Staff', occ: 'Staff' },
        { label: 'Visitor', occ: 'Visitor' },
      ];

      

    const register = () => {
      auth.createUserWithEmailAndPassword(email,password)
      .then((userCredentials)=>{
        userCredentials.user.updateProfile({
          displayName: name,
          phoneNumber: phone,
        }).then(()=> {
          navigation.replace('Car Registeration');
        })
      })
      .catch((error) => alert(error.message));

    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Text style={{marginBottom:50, marginTop:20, marginLeft:12}}>Create a Smart Parking account</Text>


            <Input placeholder='Full Name' autofocus type='text' value={name} onChangeText={(text) => setName(text)}/> 
            <Input placeholder='Email' type='text' value={email} onChangeText={(text) => setEmail(text)}/>
            <Input placeholder='Password' secureTextEntry type='text' value={password} onChangeText={(text) => setPassword(text)}/> 
            <Input placeholder='Phone Number' type='text' value={phone} onChangeText={(text) => setPhone(text)}/>
            
                
            <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            maxHeight={220}
            labelField="label"
            valueField="value"
            placeholder={'Occupation'}
            value={occ}
            onChange={item => {
                setOcc(item.occ);
            }}
            />

            <Button onPress={register} containerStyle={styles.button} title="Next >" />
            
            {/* () => navigation.navigate('Car Registeration') */}
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
    },
    
    dropdown: {
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width:370,
        marginLeft: 10,
        marginBottom: 250,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 18,
        color:'silver',
      },
      selectedTextStyle: {
        fontSize: 18,
      },
      

})
