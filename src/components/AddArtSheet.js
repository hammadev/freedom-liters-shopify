import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from './Button';
import { COLORS, FONTS, RADIUS } from '../constants';
import Icon from '../core/Icon';
import TextField2 from './TextFeild2';

const AddArtSheet = ({ setAddArtSheet, setText }) => {
    const hideSheet = () => {
        setAddArtSheet(false)
    }

    return (
        <>
            <View style={{ marginTop: 15 }}>
                <Button
                    text="Done"
                    type="primary"
                    onPressFunc={hideSheet}
                />
            </View>
        </>
    );
};

export default AddArtSheet;
