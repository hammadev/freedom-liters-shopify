import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '../../../components/AppBar'
import { Window } from '../../../globalStyle/Theme'
import TextField2 from '../../../components/TextFeild2'

const AddAddress = () => {
    const [data,setData] = useState({
        firstName:'',
        lastName:'',
        address1: '',
        province: '',
        country: '',
        zip: '',
        city: '',
    })
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ ...GlobalStyle.Container }}>
        <AppBar
        theme='dark'
        title='Update Shipping Address'
        />
        
        <TextField2
        label="firstName"
        // onChanged={setFirstName}
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={firstName}
        />
        
        <TextField2
        label="lastName"
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={lastName}
        />
        <TextField2
        label="address1"
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={address1}
        />
        
        <TextField2
        label="province"
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={province}
        />
        
        <TextField2
        label="country"
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={country}
        />
        <TextField2
        label="zip"
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={zip}
        />
        
        <TextField2
        label="city"
        customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
        value={city}
        />
        
        <Button
        text="Update"
        isIcon={false}
        theme="tertiary"
        loading={loading}
        onPressFunc={handleSubmit}
        />
        
        </ScrollView>
        </SafeAreaView>
        )
    }
    
    export default AddAddress
    
    const styles = StyleSheet.create({})