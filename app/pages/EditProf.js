import React, {useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Settings } from 'react-native'
import { Button } from 'react-native-elements'
import { Dropdown } from 'react-native-element-dropdown';
import { Input } from 'react-native-elements/dist/input/Input';







const EditProf = ({navigation}) => {

    const [brand, setBrand] = useState("")
    const [type, setType] = useState("")
    const [model, setModel] = useState("")
    const [color, setColor] = useState("")
    const [emirate, setEmirate] = useState("")
    const [code, setCode] = useState("")
    const [plate, setPlate] = useState("")

    const Emirates = [
        { label: 'Abu Dhabi', emirate: 'Abu Dhabi' },
        { label: 'Dubai', emirate: 'Dubai' },
        { label: 'Sharjah', emirate: 'Sharjah' },
        { label: 'Ras Al Khamiah', emirate: 'Ras Al Khamiah' },
        { label: 'Fujairah', emirate: 'Fujairah' },
        { label: 'Ajman', emirate: 'Ajman' },
        { label: 'Umm Al Quwain', emirate: 'Umm Al Quwain' },
    ];
    
   


     
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text style={{marginBottom:30, marginTop:20, marginLeft:12}}>Edit Vehicle Details</Text>
            <Input placeholder='Brand' autofocus type='text' value={brand} onChangeText={(text) => setBrand(text)}/> 
            <Input placeholder='Type' type='text' value={type} onChangeText={(text) => setType(text)}/>
            <Input placeholder='Model' type='text' value={model} onChangeText={(text) => setModel(text)}/> 
            <Input placeholder='Color' type='text' value={color} onChangeText={(text) => setColor(text)}/>
            {/* <Input placeholder='Emirate' type='text' value={emirate} onChangeText={(text) => setEmirate(text)}/> */}

            <Dropdown
                    style={[styles.dropdown]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={Emirates}
                    maxHeight={500}
                    labelField="label"
                    valueField="value"
                    placeholder={'Emirate'}
                    value={emirate}
                    onChange={item => {
                        setEmirate(item.emirate);
                    }}
                    />

            <Input placeholder='Plate Code' type='text' value={code} onChangeText={(text) => setCode(text)}/>
            <Input placeholder='Plate Number'  type='text' value={plate} onChangeText={(text) => setPlate(text)} />
            <View style={{marginBottom:130}}/>
            <Button raised onPress = {() => navigation.reset({index: 0, routes:[{name: 'HomeNav'}]})} containerStyle={styles.button} title="Register Vehicle" />
            


            

        </KeyboardAvoidingView>
    )
}

export default EditProf

const styles = StyleSheet.create({
    button:{
        width:200,
        marginLeft:88,
    },
  
    dropdown: {
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width:370,
        marginLeft: 10,
        marginTop:-10,
        marginBottom: 20
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 18,
        color:'silver',
        marginBottom:-5,
      },
      selectedTextStyle: {
        fontSize: 18,
      },
})
