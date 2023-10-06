import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput, Alert , Image} from "react-native";
import {Button} from "react-native-elements";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import {db} from '../firebase';




//ADD localhost address of your server
const API_URL = "http://localhost:3000";

const Payment = ({navigation}) => {
  const [amount, setAmount] = useState();
  const [tax, setTax] = useState();
  const [total, setTotal] = useState();
  const [owner, setOwner] = useState();
  const [subscription, setSubscription] = useState()
  const [balance, setBalance] = useState(0);

  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();


  useEffect(() => {
    axios.get("http://localhost:3000/receive-amount").then(function(response){

      setAmount(parseFloat(response.data*0.95).toFixed(2));
      setTax(parseFloat(response.data*0.05).toFixed(2));
      setTotal(parseFloat(response.data).toFixed(2));
      setBalance(parseInt(response.data));
    });

    axios.get("http://localhost:3000/receive-key").then(function(response){
      setOwner(response.data);
    });

    axios.get("http://localhost:3000/receive-subs").then(function(response){
      setSubscription(response.data);
    });

  },[]);

  
 

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      Alert.alert("Please enter card details");
      return;
    }
    // const billingDetails = {
    //   email: email,
    // };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          // billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
          console.log(subscription);
          if(subscription === 'balance')
          {
            let oldB;

            db.collection('Users').where('Email', '==', owner).get().then(snapshot => {
              snapshot.forEach(doc => {
                  oldB = parseInt( doc.get('Balance') );
                  
              });
            })
            .catch(err => {
                console.log('Error getting documents', err);}
            );
            
          
            db.collection("Users")
            .where("Email", "==", owner)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(document) {
                
                  document.ref.update({Balance: oldB+balance}); 
                
              });
            });
          }
          else if (subscription === "fines"){

            db.collection("Fines")
            .where("Owner", "==", owner)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(document) {
              document.ref.delete(); 
              });
            });

          }
          else{
            db.collection("Users")
            .where("Email", "==", owner)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(document) {
              document.ref.update({Subscription: subscription}); 
              });
            });
          }
          // db.collection("Users").where('Email', '==', owner).update({Subscription: "Gold"});

          navigation.reset({index: 0, routes:[{name: 'HomeNav'}]});
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      /> */}
      <Image source={require('../assets/premier-black-new.jpeg')} 
      style={{width:'80%', height:'80%', justifyContent:'center', alignSelf:'center', resizeMode:'contain', marginTop:'-55%' }}
      />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: "1234 1234 1234 1234",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />

      <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        top:'-25%',
        alignSelf:'center',
        width:'100%',
      }} />
      <View style={{marginTop:'-40%'}}>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Text>Subtotal {"\n"}</Text>
          <Text style={{marginLeft:'60%'}}>AED {amount} {"\n"}</Text>
        </View>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        <Text>Tax {"\n"}{"\n"}</Text>
        <Text style={{marginLeft:'72%'}}>AED {tax}</Text>

        </View>

        <View style={{flexDirection:'row', flexWrap:'wrap'}}>

        <Text style={{fontWeight:'bold', fontSize:20}}>Total</Text>
        <Text style={{marginLeft:'54%', fontWeight:'bold', fontSize:20}}>AED {total}</Text>

        </View>

      </View>
      <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        top:'5%',
        alignSelf:'center',
        width:'100%',
      }} />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} buttonStyle={styles.button} />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    top:-180,
  },
  button:{
    width:250,
    alignSelf:'center',
    backgroundColor:'#2C6BED',
    borderRadius:20,
    marginTop:'30%',
  },
});