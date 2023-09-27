import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Font, GlobalStyle } from "../globalStyle/Theme";
import { useNavigation } from '@react-navigation/native';

const Heading = ({ name, showMore, showMoreLink, containerStyle }) => {
    let navigation = useNavigation();
    return (
        showMore ?
            <View style={{ ...containerStyle, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                    style={style.textStyle}>
                    {name}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate(showMoreLink)}>
                    <Text style={style.showMoreStyle}>
                        See All
                    </Text>
                </TouchableOpacity>
            </View>
            :
            <Text
                style={{ ...containerStyle, ...style.textStyle }}>
                {name}
            </Text>
    );
};

export default Heading;

const style = StyleSheet.create({
    textStyle: {
        ...GlobalStyle.heading,
    },
    showMoreStyle: {
        fontSize: 14,
        fontFamily: Font.Gilroy_Medium,
        color: 'rgba(8, 14, 30, 0.4)',
    }
})