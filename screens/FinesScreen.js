import React, {useState} from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper';



const FinesScreen = () => {
    const [fine, setFine] = useState(false)
    
    return (
        fine?
        <ScrollView>
            <Card style={styles.card}>
                <Card.Content>



                    
                    <Image style={{resizeMode:'contain', height:'10%', width:'10%'}} source={require('../icons/AUS.jpg')}></Image>
                    
                    <Text style={{fontSize:10, alignSelf:'flex-end', top:-18}}>18/01/2022 ∘ 10:48 AM</Text>
                    <View style={{flexDirection:'row', flexWrap:'wrap' , marginTop: 15}}>
                        <Image style={styles.icon} source={require('../icons/person.png')}></Image>
                        <Text>AUS Security</Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap' , marginTop: 10}}>
                        <Image style={styles.icon} source={require('../icons/location.png')}></Image>
                        <Text>Sports Complex</Text>
                        
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 10}}>
                        <Image style={styles.icon} source={require('../icons/ticket.png')}></Image>
                        <Text>Parking in a paid parking lot</Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 30, alignSelf:'center'}}>
                    <View>
                    <Text style={{alignSelf:'center'}}>78987328</Text>
                    <Text style={{color:'#909090'}}>Ticket Number</Text>
                    </View>
                    <View style={styles.verticleLine}></View>
                    <View>
                    <Text style={{alignSelf:'center'}}>50 AED</Text>
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
