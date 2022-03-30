import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import {db} from '../firebase';


const CounterScreen = ({navigation}) => {

    const [sComplex, setSComplex] = useState(0);
    const [sCenter, setSCenter] = useState(0);
    const [physics, setPhysics] = useState(0);
    const [SBA, setSBA] = useState(0);
    const [lib, setLib] = useState(0);
    const [FP1, setFP1] = useState(0);
    const [FP2, setFP2] = useState(0);

    const [render,rerender] = useState(false);




    useEffect(() => {

        db.collection('Counter').onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                setSComplex(change.doc.get('SpComplex'));
                setSCenter(change.doc.get('StCenter'));
                setPhysics(change.doc.get('Physics'));
                setSBA(change.doc.get('SBA'));
                setLib(change.doc.get('Library'));
                setFP1(change.doc.get('FreeP1'));
                setFP2(change.doc.get('FreeP2'));

            });
        });

  }, []);

    return (
        <ScrollView>
            <Card style={styles.card} onPress={() => navigation.navigate('Sports Complex')} >
                <Card.Content style={{flexDirection: "row", flexWrap: "wrap",}}>
                    <Image source={{uri:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/intTFNX2AHxk/v0/150x-1.jpg",}} style={{width:'20%', height:'120%'}}/>
                    <Card.Content>
                        <Title>Sports Complex</Title>
                        <Paragraph>Counter: {sComplex}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Image source={require('../icons/arrow.png')} style={{height:25,width:25, left:'280%', top:'28%'}}/>
                    </Card.Content>
                </Card.Content>
                </Card>
                <Card style={styles.card} onPress={() => navigation.navigate('Student Center')}>
                <Card.Content style={{flexDirection: "row", flexWrap: "wrap",}}>
                    <Image source={{uri:"https://2yono02cw6ml229wkckhjk13-wpengine.netdna-ssl.com/wp-content/uploads/2019/02/clean-parking-lot.jpeg",}} style={{width:'20%', height:'120%'}}/>
                    <Card.Content>
                        <Title>Student Center</Title>
                        <Paragraph>Counter: {sCenter}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Image source={require('../icons/arrow.png')} style={{height:25,width:25, left:'280%', top:'28%'}}/>
                    </Card.Content>
                </Card.Content>
            </Card>


            <Card style={styles.card} onPress={() => navigation.navigate('Physics')}>
                <Card.Content style={{flexDirection: "row", flexWrap: "wrap",}}>
                    <Image source={{uri:"https://podofblunders.files.wordpress.com/2021/03/img_84461817343196.jpg",}} style={{width:70, height:70}}/>
                    <Card.Content>
                        <Title>Physics</Title>
                        <Paragraph>Counter: {physics}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Image source={require('../icons/arrow.png')} style={{height:25,width:25, left:'510%', top:'28%'}}/>
                    </Card.Content>
                </Card.Content>
            </Card>



            <Card style={styles.card} onPress={() => navigation.navigate('SBA')}>
                <Card.Content style={{flexDirection: "row", flexWrap: "wrap",}}>
                    <Image source={{uri:"data:image/jpeg;base64,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",}} style={{width:70, height:70}}/>
                    <Card.Content>
                        <Title>School of Business</Title>
                        <Paragraph>Counter: {SBA}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Image source={require('../icons/arrow.png')} style={{height:25,width:25, left:'140%', top:'28%'}}/>
                    </Card.Content>
                </Card.Content>
            </Card>





            <Card style={styles.card} onPress={() => navigation.navigate('Library')}>
                <Card.Content style={{flexDirection: "row", flexWrap: "wrap",}}>
                    <Image source={{uri:"https://img.freepik.com/free-photo/empty-parking-lot-parking-lane-outdoor-park_34362-1727.jpg?size=626&ext=jpg",}} style={{width:70, height:70}}/>
                    <Card.Content>
                        <Title>Library</Title>
                        <Paragraph>Counter: {lib}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Image source={require('../icons/arrow.png')} style={{height:25,width:25, left:'550%', top:'28%'}}/>
                    </Card.Content>
                </Card.Content>
            </Card>




            <Card style={styles.card} onPress={() => navigation.navigate('Free Parking 1')}>
                <Card.Content style={{flexDirection: "row", flexWrap: "wrap",}}>
                    <Image source={{uri:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/intTFNX2AHxk/v0/150x-1.jpg",}} style={{width:70, height:70}}/>
                    <Card.Content>
                        <Title>Free Parking 1</Title>
                        <Paragraph>Counter: {FP1}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Image source={require('../icons/arrow.png')} style={{height:25,width:25, left:'320%', top:'28%'}}/>
                    </Card.Content>
                </Card.Content>
            </Card>

            <Card style={styles.card} onPress={() => navigation.navigate('Free Parking 2')}>
                <Card.Content style={{flexDirection: "row", flexWrap: "wrap",}}>
                    <Image source={{uri:"https://assets.bwbx.io/images/users/iqjWHBFdfxIU/intTFNX2AHxk/v0/150x-1.jpg",}} style={{width:70, height:70}}/>
                    <Card.Content>
                        <Title>Free Parking 2</Title>
                        <Paragraph>Counter: {FP2}</Paragraph>
                    </Card.Content>
                    <Card.Content>
                        <Image source={require('../icons/arrow.png')} style={{height:25,width:25, left:'320%', top:'28%'}}/>
                    </Card.Content>
                </Card.Content>
            </Card>

            

        </ScrollView>
    )
}

export default CounterScreen

const styles = StyleSheet.create({
    card:{
        height: 100,


    }
})
