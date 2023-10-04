import React, {useState} from 'react'
import { StyleSheet, Text, Button, KeyboardAvoidingView, View} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { StatusBar } from 'expo-status-bar';
import { Input } from 'react-native-elements/dist/input/Input';
import { auth, db } from '../firebase';
import axios from 'axios';



const RegisterScreen = ({navigation}) => {
  const [ID, SetID] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRePass] = useState("");
  const [company, setCompany] = useState(null);
  const [department, setDepartment] = useState("");
    


    
    const data = [
        { label: 'Deloitte', company: 'Deloitte' },
        { label: 'Google', company: 'Google' },
        { label: 'Accenture', company: 'Accenture' },
        { label: 'University of Syndey', company: 'University of Sydney' },
        { label: 'University of New South Wales', company: 'University of New South Wales' },
      ];
      
      const register = () => {
        if (password !== repass) {
          alert("Passwords do not match");
        } else {
          db.collection('Employees').where('Email', '==', email).get()
            .then(snapshot => {
              let emailFound = false;
        
              snapshot.forEach(doc => {
                emailFound = true;
                const data = doc.data(); // Get the data from the document
        
                // Store the fetched data in variables
                const fetchedFname = data.FirstName;
                const fetchedLname = data.LastName;
                const fetchedID = data.EmployeeID;
                const fetchedDepartment = data.Department;
        
                auth.createUserWithEmailAndPassword(email, password)
                  .then(() => {
                    db.collection('Users').add({
                      Email: email,
                      FirstName: fetchedFname,
                      LastName: fetchedLname,
                      Company: company,
                      Department: fetchedDepartment,
                      ID: fetchedID,
                    })
                    // send email to backend using axios:
                    try{
                      axios.post("http://localhost:3000/send-key", {
                      email: email,
                      });
                      console.log("axios");
                    }
                    catch (error){
                      console.log(error);
                    }
                    navigation.reset({ index: 0, routes: [{ name: 'HomeNav' }] });
                  })
                  .catch((error) => alert(error.message));
              });
        
              if (!emailFound) {
                alert('No record found at ' + company + ' with this email address\nPlease check and try again.');
              }
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });
        }
        
      };
        // if (emailVerify === false){
        //   alert('No record found at ' + company + ' with this email address\nPlease check and try again.');
        
      
        // }
        // else{
        //   alert('Success');
          // auth.createUserWithEmailAndPassword(email,password)
          // .then((userCredentials)=>{
          //   userCredentials.user.updateProfile({
          //     displayName: fname,
          //     // phoneNumber: phone,
          //   }).then(()=> {
          //     navigation.replace('Car Registeration');
          //   })
          // })
          // .catch((error) => alert(error.message));

        //   // db.collection('').add({
        //   //   Email: email,
        //   //   FirstName: fname,
        //   //   LastName: lname,
        //   //   Company: company,
        //   //   // PhoneNo: phone,
        //   //   Subscription: 'Bronze',
        //   //   Balance: 0
        //   // });

        //   // // send email to backend using fetch:
        //   // // fetch("http://localhost:3000/send-key",{
        //   // //     method:"post",
        //   // //     headers:{
        //   // //         'Content-Type': 'application/json'
        //   // //     },
        //   // //     body:JSON. stringify({
                  
        //   // //       email: email
                  
        //   // //     })
        //   // // })
          

          
        // }
     
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Text style={{marginBottom:50, marginTop:20, marginLeft:12}}>Create a Smart Attend account</Text>

            <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            maxHeight={220}
            labelField="label"
            valueField="company"
            placeholder={'Company / School'}
            value={company}
            onChange={(item) => {
                setCompany(item.company);
            }}
            />

            <Input placeholder='Email' type='text' value={email} autoCapitalize="none" onChangeText={(text) => setEmail(text)}/>
            <Input placeholder='Password' secureTextEntry type='text' value={password} onChangeText={(text) => setPassword(text)}/> 
            <Input placeholder='Re-enter Password' secureTextEntry type='text' value={repass} onChangeText={(text) => setRePass(text)}/>
            
                
            <View style={styles.buttonContainer}>
              <Button onPress={register} title="Register" />
            </View>

            
            {/* () => navigation.navigate('Car Registeration') */}
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    
    dropdown: {
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width:370,
        marginLeft: 10,
        marginBottom: 25,
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
      buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Push the button to the bottom
        marginBottom: 90, // Add space between inputs and button
      },
    
      

})
