import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../../components/AppBar";
import { Window, GlobalStyle } from "../../../globalStyle/Theme";
import TextField2 from "../../../components/TextFeild2";
import Button from "../../../components/Button";
const AddAddress = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address1, setAddress1] = useState();
  const [province, setProvince] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();
  const [city, setCity] = useState();
  const [loading, setLoading] = useState();

  return (
    <SafeAreaView style={{ ...GlobalStyle.Container }}>
      <AppBar theme="dark" title="Add Address" />
      <ScrollView
      showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
        style={{ flex: 1 }}
      >
        <TextField2
          label="firstName"
          onChanged={setFirstName}
          customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
          value={firstName}
        />

        <TextField2
          label="lastName"
          onChanged={setLastName}
          customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
          value={lastName}
        />
        <TextField2
          label="address1"
          onChanged={setAddress1}
          customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
          value={address1}
        />

        <TextField2
          label="province"
          onChanged={setProvince}
          customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
          value={province}
        />

        <TextField2
          label="country"
          onChanged={setCountry}
          customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
          value={country}
        />
        <TextField2
          label="zip"
          onChanged={setZip}
          customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
          value={zip}
        />

        <TextField2
          label="city"
          onChanged={setCity}
          customStyle={{ marginBottom: Window.fixPadding * 1.5 }}
          value={city}
        />
      </ScrollView>
      <View style={{ paddingBottom: 15 }}>
        <Button
          text="Update"
          isIcon={false}
          theme="tertiary"
          navLink='Profile'
          loading={loading}
          // onPressFunc={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({});
