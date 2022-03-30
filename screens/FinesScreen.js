import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper';
import {db} from '../firebase';
import axios from 'axios';



const FinesScreen = () => {
    const [fine, setFine] = useState(false)
    const [owner, setOwner] = useState("");

    const [tickNo, setTickNo] = useState();
    const [amount, setAmount] = useState();
    const [provider, setProvider] = useState();
    const [loc, setLoc] = useState();
    const [reason, setReason] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [render, rerender] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:3000/receive-key").then(function(response){
          setOwner(response.data);
        });
    
        db.collection('Fines').where('Owner', '==', owner).get().then(snapshot => {
            snapshot.forEach(doc => {
                setTickNo(doc.get('Ticket Number'));
                setAmount(doc.get('Amount'));
                setProvider(doc.get('Provider'));
                setLoc(doc.get('Location'));
                setReason(doc.get('Reason'));
                setDate(doc.get('Date'));
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);}
        );


        // db.collection('Fines').onSnapshot(querySnapshot => {
        //     querySnapshot.docChanges().forEach(change => {
        //         setTickNo(change.doc.get('Ticket Number'));
        //         setAmount(change.doc.get('Amount'));
        //         setProvider(change.doc.get('Provider'));
        //         setLoc(change.doc.get('Location'));
        //         setReason(change.doc.get('Reason'));
        //         setDate(change.doc.get('Date'));

        //     });
        // });

        if(tickNo === undefined){
            setFine(false)
        }
        else{
            setFine(true);
        }

        setTimeout(() => {
            rerender(!render);
        }, 10000);


    },[render]);

    return (
        fine?
        <ScrollView>
            <Card style={styles.card}>
                <Card.Content>
                    
                    <Image style={{resizeMode:'contain', height:'10%', width:'10%'}} source={require('../icons/AUS.jpg')}></Image>
                    
                    <Text style={{fontSize:10, alignSelf:'flex-end', top:-18}}>18/01/2022 ∘ 10:48 AM</Text>
                    <View style={{flexDirection:'row', flexWrap:'wrap' , marginTop: 15}}>
                        <Image style={styles.icon} source={require('../icons/person.png')}></Image>
                        <Text>{provider}</Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap' , marginTop: 10}}>
                        <Image style={styles.icon} source={require('../icons/location.png')}></Image>
                        <Text>{loc}</Text>
                        
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 10}}>
                        <Image style={styles.icon} source={require('../icons/ticket.png')}></Image>
                        <Text>{reason}</Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 30, alignSelf:'center'}}>
                    <View>
                    <Text style={{alignSelf:'center'}}>{tickNo}</Text>
                    <Text style={{color:'#909090'}}>Ticket Number</Text>
                    </View>
                    <View style={styles.verticleLine}></View>
                    <View>
                    <Text style={{alignSelf:'center'}}>{amount} AED</Text>
                    <Text style={{color:'#909090'}}>Total Amount</Text>
                    </View>
                    </View>


                 
                    
                </Card.Content>
            </Card>
        </ScrollView>
        :
        <View style={{alignSelf:'center', top:'35%'}}>
            <Image style={{alignSelf:'center'}} source={require('../icons/thumbsup.png')}></Image>
            <Text h3 style={{fontWeight:'bold'}}>Congratulations!</Text>
            <Text h4>you don't have any fines</Text>
        
        </View>

        )
  
}

export default FinesScreen

const styles = StyleSheet.create({
    card:{
        width:'90%', height:'100%', alignSelf:'center', marginTop:25, borderRadius:10,
    },
    icon: {
        width:18, height:18, marginRight: 10,
    },
    verticleLine: {
        height: '100%',
        width: 2,
        backgroundColor: '#909090',
        marginLeft:50,
        marginRight:50,
        marginTop:2,
      }
})
