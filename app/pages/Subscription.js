import { StyleSheet, View , Image, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements'
import React, {useState, useEffect} from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios'
import {db} from '../firebase';




const Subscription = ({navigation}) => {

  const [subscription, setSubscription] = useState('Bronze');
  const [amount, setAmount] = useState("");


  const [bronze, setBronze] = useState(false);
  const [silver, setSilver] = useState(false);
  const [gold, setGold] = useState(false);
  const [plat, setPlat] = useState(false);
  const [diamond, setDiamond] = useState(false);

  const [owner, setOwner] = useState('');
  const [current, setCurrent] = useState();
  const [message, setMessage] = useState();


  const BronzeFunc = () => {
    setSubscription('Bronze');
    setAmount('0');
    setBronze(!bronze);
    setSilver(false);
    setGold(false);
    setPlat(false);
    setDiamond(false);
  };
  const SilverFunc = () => {
    setSubscription('Silver');
    setAmount("12");
    setBronze(false);
    setSilver(!silver);
    setGold(false);
    setPlat(false);
    setDiamond(false);
  };
  const GoldFunc = () => {
    setSubscription('Gold');
    setAmount('40');
    setBronze(false);
    setSilver(false);
    setGold(!gold);
    setPlat(false);
    setDiamond(false);
    console.log(amount);
  };
  const PlatFunc = () => {
    setSubscription('Platinum');
    setAmount('150');
    setBronze(false);
    setSilver(false);
    setGold(false);
    setPlat(!plat);
    setDiamond(false);
  };
  const DiamondFunc = () => {
    setSubscription('Diamond');
    setAmount('280');
    setBronze(false);
    setSilver(false);
    setGold(false);
    setPlat(false);
    setDiamond(!diamond);
  };
    useEffect(() => {
      axios.get("http://localhost:3000/receive-key").then(function(response){
        setOwner(response.data);
      });

      db.collection('Users').where('Email', '==', owner).get().then(snapshot => {
          snapshot.forEach(doc => {
              setCurrent(doc.get("Subscription"));
          });
      })
      .catch(err => {
          console.log('Error getting documents', err);}
      );

    },[owner, current]);

    useEffect(() => {
      if(current === 'Bronze'){
        setMessage('Free Parking Subscription');
      }
      else if (current === 'Silver'){
        setMessage('Weekly Based Subscription');
      }
      else if (current === 'Gold'){
        setMessage('Monthly Based Subscription');
      }
      else if (current === 'Platinum'){
        setMessage('Semester Based Subscription');
      }
      else if (current === 'Diamond'){
        setMessage('Yearly Based Subscription');
      }
    },[current]);

    const next = () => {
      try{
        axios.post("http://localhost:3000/send-amount", {
        amount: amount
        });
      }
      catch (error){
        console.log(error);
      };

      try{
        axios.post("http://localhost:3000/send-subs", {
        subs: subscription
        });
      }
      catch (error){
        console.log(error);
      };
      navigation.navigate('Payment');
    };


  return (
    <ScrollView>
      <View>
      <Text  style={{top:10, left:5, fontSize:20}}>Current Subscription:</Text>
      <Card style={[styles.cardfst,{backgroundColor:'white'}]}>
          <Card.Content>
            <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
              <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>{current}</Text>
              <Text style={{color:'black', fontSize:12}}>{message}</Text>
              <Text style={{color:'black', fontSize:10, marginTop:45,}}>Expires: 08/02/2023</Text>

          </Card.Content>
      </Card>
        <Text style={{marginTop:30, left:5, fontSize:20}}>Available Subscriptions:</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <Card onPress={BronzeFunc} style={[styles.cards, {backgroundColor: bronze? "#2C6BED" :'#CD7F32'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Bronze</Text>
                        <Text style={{color:'black', fontSize:12}}>Free Parking Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 0</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

                <Card onPress={SilverFunc} style={[styles.cards, { backgroundColor: silver ? "#2C6BED" : 'silver'}]} >
        
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Silver</Text>
                        <Text style={{color:'black', fontSize:12}}>Weekly Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 12</Text>
                        <Text></Text>
                        
                       
                    </Card.Content>

                </Card>

                <Card onPress={GoldFunc} style={[styles.cards, {backgroundColor: gold? "#2C6BED" : 'gold'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Gold</Text>
                        <Text style={{color:'black', fontSize:12}}>Monthly Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 40</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

                <Card onPress={PlatFunc} style={[styles.cards, {backgroundColor: plat? "#2C6BED":'#E5E4E2'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Platinum</Text>
                        <Text style={{color:'black', fontSize:12}}>Semester Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 150</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

                <Card  onPress={DiamondFunc} style={[styles.cards, {backgroundColor: diamond? "#2C6BED" : '#b9f2ff'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Diamond</Text>
                        <Text style={{color:'black', fontSize:12}}>Yearly Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 280</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

              </ScrollView>

            <Button buttonStyle={styles.button} onPress={next} title={"Next >"}></Button>


      </View>
    </ScrollView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  cardfst:{
    width:'60%',
    height:'26%',
    alignSelf:'center',
    elevation: 7,
    backgroundColor:'white',
    borderRadius: 10,
    marginTop:30,
    
 },
  cards:{
    marginTop:15,
    marginLeft:7.5,
    marginRight:7.5,
    height:'85%',
    elevation: 7,
    borderRadius: 10,
    width:200,


  },
  button:{
    width:'30%',
    alignSelf:'center',
    marginTop:120,
    backgroundColor: "#2C6BED",
  }
 
});
