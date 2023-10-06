import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'; // Import ActivityIndicator for loading spinner
import { db } from '../firebase';

const OfficeScreen = ({ navigation }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true); // Step 1: Introduce loading state


    const LOCATION_COORDINATES = {
        "Office A": { x: '15%', y: '4%' },
        "Office B": { x: '10%', y: '20%' },
        "Conference": { x: '10%', y: '30%' },
        "Open Office A": { x: '10%', y: '60%' },
        "Open Office B": { x: '10%', y: '80%' },
        "Open Area": { x: '45%', y: '70%' },
        "Office C": { x: '80%', y: '80%' },
        "Support": { x: '80%', y: '70%' },
        "Reception": { x: '50%', y: '40%' },
        "Waiting Zone": { x: '50%', y: '10%' },
        "Lounge": { x: '80%', y: '20%' },
        "Bathroom": { x: '60%', y: '70%' },
        "Entrance": { x: '75%', y: '37%' },
    };

    const locationCount = {};

    

    useEffect(() => {
        const unsubscribe = db.collection('FireEvac').onSnapshot(snapshot => {
            const allEmployees = snapshot.docs.map(doc => {
                return {
                    id: doc.get('EmployeeID'),
                    location: doc.get('Location') || {}  // Default to an empty object if no location is found
                };
            });
    
            setEmployees(allEmployees);
            setLoading(false);  // Step 3: Update loading state once data is fetched
        }, err => {
            console.log('Error listening to real-time updates:', err);
            setLoading(false);  // Ensure we still set loading to false even if there's an error
        });

        return () => unsubscribe();
    }, []);
    
    
    const renderEmployeeItem = ({ item }) => {
        // Fetch the coordinates for the given location
        const defaultCoords = { x: '75%', y: '35%' };
        const coords = LOCATION_COORDINATES[item.location] || defaultCoords;
    
        // Check and update the count for the location
        if (!locationCount[item.location]) {
            locationCount[item.location] = 1;
        } else {
            locationCount[item.location]++;
        }
    
        // Calculate yOffset in percentage (here I'm taking each offset as 1% for simplicity)
        const yOffsetPercentage = (locationCount[item.location] - 1) * 2;
    
        // Convert the y-coordinate from percentage to a decimal
        const originalYDecimal = parseFloat(coords.y) / 100;
    
        // Adjust the y-coordinate
        const adjustedYDecimal = originalYDecimal + yOffsetPercentage / 100;
    
        // Convert the decimal back to a percentage string
        const adjustedY = `${adjustedYDecimal * 100}%`;
    
        return (
            <View 
                key={item.id}
                style={[
                    styles.employeeContainer, 
                    { 
                        position: 'absolute', 
                        left: coords.x, 
                        top: adjustedY 
                    }
                ]}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('UserInfo', { employeeId: item.id });
                    }}
                    style={styles.touchableArea}
                >
                    <View style={[styles.circle, item.id.includes('Guest') ? styles.blueCircle : styles.greenCircle]} />
                    <Text style={styles.text}>{item.id}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    
    
    
    if (loading) {  // Step 2: Display loading spinner when loading is true
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/deloitteOffice.jpg')}
                style={styles.image}
                resizeMode="cover"
            />
            {employees.map((employee) => renderEmployeeItem({ item: employee }))}
        </View>
    );

    
    
};

export default OfficeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Ensures absolute positioned children are relative to this container
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    employeeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    touchableArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,  // Ensures a larger touch area
        borderRadius: 5, // Optional: if you want rounded corners
        // ... [any other styles you'd like for the touchable area]
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'blue',
        marginRight: 10,
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    blueCircle: {
        backgroundColor: 'blue',
    },
    greenCircle: {
        backgroundColor: 'green',
    },
});