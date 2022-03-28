import React , {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Image, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import {Text} from 'react-native-elements'
import {db} from '../firebase'




const SettingsScreen = ({navigation}) => {

    const [first,setFirst] = useState("");
    const [last,setLast] = useState("");
    const [occ, setOcc] = useState("");


    useEffect(() => {
        db.collection('Users').where('Email', '==', 'Hudamiran@hudhud.com').get().then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.id, '=>', doc.data());
                setFirst(doc.get("FirstName"));
                setLast(doc.get("LastName"));
                setOcc(doc.get("Occupation"));
          
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);}
          );
      });

    return (
        <ScrollView>
            <Card style={{height:'25%'}} onPress={() => navigation.navigate('Edit Profile')}>
                <View style={{ flexDirection:'row', flexWrap:'wrap', marginTop:15, left:'10%'}}>
                    <Image style={{width:65, height:65, borderRadius:100}} source={require('../assets/dp.png')}/>
                <Card.Content>
                    <Title>{first} {last}</Title>
                    <Paragraph>{occ}</Paragraph>
                </Card.Content>
                    <Image style={{width: 30, height: 30, left:42, marginTop:15}} source={require('../icons/arrow.png')}></Image>
                </View>
              
            </Card>

            <Card style={{height:'13%', top:'15%',}} onPress={() => navigation.navigate('Subscription')}>
                <Card.Content>
                    <Text>Change Subscription
                    </Text>
                <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>


            <Card style={{height:'13%', top:'15%',}} onPress={() => navigation.navigate('Funds')}>
                <Card.Content>
                    <Text>Add Funds
                    </Text>
                <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>



            <Card style={{height:'13%', top:'30%',}}>
                <Card.Content>
                    <Text>Notifications
                    </Text>
                <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
            <Card style={{height:'13%', top:'30%',}} onPress={() => navigation.navigate('Contact')}>
                <Card.Content>
                    <Text>Contact Us
                    </Text>
                <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
            <Card style={{height:'13%', top:'30%',}}>
                <Card.Content>
                    <Text>Share
                    </Text>
                <Image style={{width:15, height:15, alignSelf:'flex-end', top:'-45%'}} source={require('../icons/arrow.png')}/>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({})
