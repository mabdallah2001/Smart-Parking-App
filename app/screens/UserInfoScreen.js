import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase';

const UserInfoScreen = ({ navigation, route }) => {
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const employeeId = route.params?.employeeId ?? 'No ID Provided';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fireEvacData = await getEmployeeData('FireEvac', employeeId);
                const employeesData = await getEmployeeData('Employees', employeeId);

                setEmployeeData({ ...fireEvacData, ...employeesData });
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [employeeId]);

    const getEmployeeData = async (collection, employeeId) => {
        const dataDoc = await db.collection(collection).where('EmployeeID', '==', employeeId).get();
        let data = {};
        dataDoc.forEach(doc => {
            data = doc.data();
        });
        return data;
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!employeeData) {
        return (
            <View style={styles.container}>
                <Text>No data found for employee ID: {employeeId}</Text>
            </View>
        );
    }

    const formatFirebaseDate = (firebaseDate) => {
        if (firebaseDate && firebaseDate.seconds) {
            return new Date(firebaseDate.seconds * 1000).toLocaleString();
        }
        return firebaseDate;
    };

    const mainKeys = ['Name', 'EmployeeID', 'Department', 'Title', 'Age', 'Gender', 'Email', 'Phone'];
    const metadataKeys = ['Location', 'Date', ...Object.keys(employeeData).filter(
        key => ![...mainKeys, 'Location', 'Date', 'FirstName', 'LastName'].includes(key)
    )];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Details</Text>
            {mainKeys.map((key, index) => (
                employeeData[key] !== undefined && (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cellKey}>{key}:</Text>
                        <Text style={styles.cellValue}>{String(formatFirebaseDate(employeeData[key]))}</Text>
                    </View>
                )
            ))}
            <Text style={styles.subheader}>Meta-data</Text>
            {metadataKeys.map((key, index) => (
                employeeData[key] !== undefined && (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cellKey}>{key}:</Text>
                        <Text style={styles.cellValue}>{String(formatFirebaseDate(employeeData[key]))}</Text>
                    </View>
                )
            ))}
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subheader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    cellKey: {
        width: 150,
        fontWeight: 'bold',
    },
    cellValue: {
        maxWidth: 200,
    },
});

export default UserInfoScreen;
