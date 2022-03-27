import { StyleSheet, View , Image, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements'
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import Counter from "react-native-counters";



const Funds = ({navigation}) => {

  const onChange = (number, type) => {
    // console.log(number, type) // 1, + or -
  };
  return (
    <ScrollView>
      <View>
      <Text  style={{top:10, left:5, fontSize:20}}>Current Balance:</Text>
      <Card style={styles.cardfst}>
          <Card.Content>
          <Image style={{height:30, width:30, alignSelf:'flex-end',}} source={require('../icons/funds.png')}/>
          <Text style={{color:'white', fontSize:12, marginTop:10}}>Your Balance</Text>
          <Text style={{color:'white', fontWeight:'bold', fontSize:25, marginTop:-1,}}>AED 10.00</Text>
          </Card.Content>
        </Card>
        <Text style={{marginTop:50, left:5, fontSize:20}}>Add Funds:</Text>
        <View style={{alignSelf:'center', marginTop:80, flexDirection:'row', flexWrap:'wrap'}}>
          <Text h3 style={{marginRight:25, color:'steelblue'}}>AED</Text>
          <Counter  max={100}  onChange={onChange.bind(this)}/>
        </View>
        <Text style={{marginTop:150, margin:10}}>Please Note: Every paid parking visit will deduct AED 4 from your current balance</Text>
        <Button buttonStyle={styles.button} title={"Next >"} onPress={() => navigation.navigate('Payment')}></Button>

      </View>
    </ScrollView>
  );
};

export default Funds;

const styles = StyleSheet.create({
  cardfst:{
    width:'60%',
    height:'23%',
    alignSelf:'center',
    elevation: 7,
    backgroundColor:'royalblue',
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
    marginTop:50,
    backgroundColor:"#2C6BED",
    
  }
 
});
