import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Image, ScrollView, TextInputComponent } from 'react-native'
import { Text } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper';
import {db} from '../firebase';
import axios from 'axios';



const FinesScreen = () => {
    const [fine, setFine] = useState(false)
    const [owner, setOwner] = useState("");

    const [tickNo, setTickNo] = useState([]);
    const [amount, setAmount] = useState();
    const [provider, setProvider] = useState();
    const [loc, setLoc] = useState();
    const [reason, setReason] = useState();

    const [date, setDate] = useState("");
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [AMPM, setAMPM] = useState();


    const [render, rerender] = useState(false);



    var Tarr =[];
    var Aarr = [];
    var Parr = [];
    var Larr = [];
    var Rarr = [];
    var Darr = [];
    var NDarr = [];

    var DDarr = [];
    var MMarr = [];
    var YYarr = [];
    var HHarr = [];
    var MMarr = [];
    var AParr = [];


    useEffect(() => {
        axios.get("http://localhost:3000/receive-key").then(function(response){
          setOwner(response.data);
        });
    
    
        db.collection('Fines').where('Owner', '==', owner).get().then(snapshot => {
            snapshot.forEach(doc => {
                Tarr.push(doc.get('Ticket Number'));
                setTickNo(Tarr);
                // console.log(tickNo);

                // Aarr.push(doc.get('Amount'));
                // setAmount(Aarr);
                // console.log(amount);
                // setTickNo(doc.get('Ticket Number'));
                setAmount(doc.get('Amount'));
                // Parr.push(doc.get('Provider'));
                // setProvider(Parr);
                setProvider(doc.get('Provider'));
                // Larr.push(doc.get('Location'));
                // setLoc(Larr);
                setLoc(doc.get('Location'));
                // Rarr.push(doc.get('Reason'));
                // setReason(Rarr);
                setReason(doc.get('Reason'));
                const tempDate = doc.get('Date').toDate();
                // Darr.push( doc.get('Date').toDate());


                

                setDate(tempDate.toISOString().substring(0, 10));

                const dateArr = date.split('-');

                setDay(dateArr[2]);
                setMonth(dateArr[1]);
                setYear(dateArr[0]);

                const tempTime = tempDate.toISOString().substring(11, 16);

                if(tempTime.substring(0,2) > 12){
                    setHour(tempTime.substring(0,2) - 12);
                    setAMPM('PM');
                }
                else{
                    setHour(tempTime.substring(0,2));
                    setAMPM('AM');
                }
                setMinute(tempTime.substring(3,5));
               
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);}
        );


        console.log(tickNo);
        if(amount === undefined){
            setFine(false)
        }
        else{
            setFine(true);
        }

        setTimeout(() => {
            rerender(!render);
        }, 5000);


    },[render]);


    const Fines = () => {
        var output=[];

        for(let i = 0; i < tickNo.length; i++){

            var tempItem=  (
                <ScrollView>

                <Card style={styles.card}>
                <Card.Content>
                    
                    <Image style={{resizeMode:'contain', height:'10%', width:'10%'}} source={require('../icons/AUS.jpg')}></Image>
                    
                    <Text style={{fontSize:10, alignSelf:'flex-end', top:-18}}>{day}/{month}/{year} ∘ {hour}:{minute} {AMPM}</Text>
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
                    <Text style={{alignSelf:'center'}}>{tickNo[i]}</Text>
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
            );
            output[i] = (tempItem);

        }
        return(
            <ScrollView>
              {output}
            </ScrollView>
          );
    }

    // return (
    //     <ScrollView>
            
    //         {Fines()}

    //     </ScrollView>
    // )

    return (
        fine?
        <ScrollView> 
            {Fines()}
        </ScrollView>
        :
        <View style={{alignSelf:'center', top:'35%'}}>
            <Image style={{alignSelf:'center'}} source={require('../icons/thumbsup.png')}></Image>
            <Text h3 style={{fontWeight:'bold'}}>Congratulations!</Text>
            <Text h4>you don't have any fines</Text>
        
        </View>

    );


  
}

export default FinesScreen

const styles = StyleSheet.create({
    card:{
        width:'90%', height:230, alignSelf:'center', marginTop:25, borderRadius:10,
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
