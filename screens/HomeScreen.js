
import React, {useEffect} from 'react'
import { StyleSheet, View , Image, ScrollView} from 'react-native'
import { Text } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper';



import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {

    return (
        <ScrollView>
           
            <Text h3 style={{marginTop: 40, marginLeft:10, fontWeight:'bold',  }}>Hi Mohammed!</Text>
            <Text h5 style={{marginTop: 10, marginLeft:10, fontWeight:'bold', color: 'gray', }}>American University of Sharjah</Text>
            <Image source = {{uri:"https://www.smartparking.com/asset/524.png",}} 
            style={{width:100, height:100, alignSelf:'flex-end', marginRight: 10, marginTop: -100}}
            />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Card style={styles.cardfst} onPress={() => navigation.navigate('Subscription')}>
                    <Card.Content>
                    <Image style={{height:25, width:25, alignSelf:'flex-end',}} source={require('../icons/subscription.png')}/>
                        <Text style={{color:'black', fontSize:12, marginTop:15}}>Your Subscription</Text>
                        <Text style={{color:'black', fontWeight:'bold', fontSize:35, marginTop:-5,}}>Platinum</Text>
                        <Text style={{color:'black', fontSize:10, marginTop:40,}}>Expires: 08/02/2023</Text>

                    </Card.Content>
                </Card>

                <Card style={styles.cardsec} onPress={() => navigation.navigate('Funds')}>
                    <Card.Content>
                    <Image style={{height:30, width:30, alignSelf:'flex-end',}} source={require('../icons/funds.png')}/>
                    <Text style={{color:'white', fontSize:12, marginTop:10}}>Your Balance</Text>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:25, marginTop:-1,}}>AED 10.00</Text>

                    
                    </Card.Content>
                </Card>

            </ScrollView>



            <Card style={styles.cardthrd}>
                    <Card.Content>
                    <Text  h6 style={{color:'white', fontWeight:'bold', }}>DUBAI</Text>
                    <Image style={{height:35, width:35, alignSelf:'flex-end', top: -30,}} source={require('../icons/car.png')}/>


                    <Text  h4 style={{color:'white', fontWeight:'bold', alignSelf:'center', top: -30,}}>Car Details</Text>
                    <View
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 2,
                        top:-25,
                        alignSelf:'center',
                        width:250,
                    }}
                    />
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20, marginTop:10,}}>Audi A4
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20, marginTop:45,}}>                                    2017</Text> </Text>
                    {/* <Text style={{color:'white', fontWeight:'bold', fontSize:30, marginTop:-5,}}>Gray</Text> */}
                    {/* <Card style={{width:'50%', height:'20%', borderRadius: 5, alignSelf:'center', marginTop: 25}}> */}
                        
                    <Text style={{color:'white', fontWeight:'bold', fontSize:20, top: 27, alignSelf:'center',}}>   G  50328</Text>
                    <Text></Text>
                    <Text></Text>

                    {/* </Card> */}


                    </Card.Content>
                </Card>


        </ScrollView>
      );
}

export default HomeScreen

const styles = StyleSheet.create({
    cardfst:{
       width:'47.5%',
       height:'72%',
       margin:10,
       elevation: 7,
       backgroundColor:'white',
       borderRadius: 10,
       marginTop:50,

    //    alignSelf:'center',
    },
    cardsec:{
        width:'47%',
        height:'72%',
        margin:10,
        elevation: 7,
        backgroundColor:'royalblue',
        borderRadius: 10,
        marginTop:50,

     //    alignSelf:'center',
     },

     cardthrd:{
        width:'80%',
        height:'37%',
        top: '7%',
        marginLeft:10,
        elevation: 7,
        backgroundColor:'darkred',
        borderRadius: 10,

    

        left:'8%',
        alignItems:'center'
     },
})
