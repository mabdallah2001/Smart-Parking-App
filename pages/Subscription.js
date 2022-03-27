import { StyleSheet, View , Image, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements'
import React, {useState, useEffect} from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';




const Subscription = ({navigation}) => {

  const [subscription, setSubscription] = useState('Bronze');
  
    // useEffect(() => {
    //   console.log(subscription);
    // }, []);


  return (
    <ScrollView>
      <View>
      <Text  style={{top:10, left:5, fontSize:20}}>Current Subscription:</Text>
      <Card style={[styles.cardfst,{backgroundColor:'#CD7F32'}]}>
          <Card.Content>
            <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
              <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Bronze</Text>
              <Text style={{color:'black', fontSize:12}}>Free Parking Subscription</Text>
              <Text style={{color:'black', fontSize:10, marginTop:45,}}>Expires: 08/02/2023</Text>

          </Card.Content>
      </Card>
        <Text style={{marginTop:30, left:5, fontSize:20}}>Available Subscriptions:</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <Card onPress={() => setSubscription('Bronze')} style={[styles.cards, {backgroundColor:'#CD7F32'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Bronze</Text>
                        <Text style={{color:'black', fontSize:12}}>Free Parking Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 0</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

                <Card onPress={() => setSubscription('Silver')} style={[styles.cards, {backgroundColor:'silver'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Silver</Text>
                        <Text style={{color:'black', fontSize:12}}>Weekly Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 12</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

                <Card onPress={() => setSubscription('Gold')} style={[styles.cards, {backgroundColor:'gold'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Gold</Text>
                        <Text style={{color:'black', fontSize:12}}>Monthly Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 40</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

                <Card onPress={() => setSubscription('Platinum')} style={[styles.cards, {backgroundColor:'#E5E4E2'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Platinum</Text>
                        <Text style={{color:'black', fontSize:12}}>Semester Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 150</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

                <Card  onPress={() => setSubscription('Diamond')} style={[styles.cards, {backgroundColor:'#b9f2ff'}]}>
                    <Card.Content>
                      <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35,}}>Diamond</Text>
                        <Text style={{color:'black', fontSize:12}}>Yearly Based Subscription</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:45,}}>AED 280</Text>
                        <Text></Text>
                    </Card.Content>
                </Card>

              </ScrollView>

            <Button buttonStyle={styles.button} onPress={() => navigation.navigate('Payment')} title={"Next >"}></Button>


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
