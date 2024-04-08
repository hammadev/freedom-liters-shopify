import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from './Button';
import { COLORS, FONTS, RADIUS } from '../constants';
import Icon from '../core/Icon';
import TextField2 from './TextFeild2';

const AddTextSheet = ({ setTextSheet, setSelectedText, selectedText }) => {
    const hideSheet = () => {
        setTextSheet(false)
    }

    return (
        <>
            <TextField2
                label="Enter Text"
                placeholder={'John'}
                maxLength={15}
                onChanged={setSelectedText}
                value={selectedText}
            />
            <TextField2
                label="Font Style"
                placeholder={'Arial'}
                maxLength={10}

            />
            <TextField2
                label="Text Color"
                placeholder={'Black'}
                maxLength={10}

            />
            <TextField2
                label="Letter Spacing"
                placeholder={'1.5'}
                maxLength={10}

            />
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

export default AddTextSheet;
