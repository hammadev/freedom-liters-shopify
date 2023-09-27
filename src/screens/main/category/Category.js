import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

import AppBar from '../../../components/AppBar';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import Heading from '../../../components/Heading';
import { useSelector } from 'react-redux';

const CatBox = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductListing', { catId: item.id })}>
            <ImageBackground style={{ height: 210, flex: 1, marginBottom: Window.fixPadding }}
                source={item.image ? { uri: item.image.src } : require('../../../assets/images/products/review.png')}
            >
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 0.85, paddingBottom: 20, paddingLeft: 20, justifyContent: 'flex-end'
                }}>
                    <Text style={{ ...GlobalStyle.heading, color: Color.white }}>
                        {item.name}
                    </Text>
                    <View
                        style={{
                            height: 3,
                            width: item.name.length * 10,
                            borderRadius: 10,
                            marginTop: 12,
                            backgroundColor: Color.white,
                        }}
                    />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const Category = ({ navigation }) => {
    const { categories } = useSelector(state => ({ ...state }));
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ ...GlobalStyle.Container }}>
                    <AppBar
                        theme='dark'
                        title='Category'
                    />
                    <View style={{ marginVertical: Window.fixPadding }}>
                        {categories[0].map((item, i) => (
                            <CatBox navigation={navigation} item={item} key={i} />
                        ))}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Category;

const Data = [
    {
        img: require('../../../assets/images/products/review.png'),
        title: 'Shop men',
    },
    {
        img: require('../../../assets/images/products/review.png'),
        title: 'Head Wearghjhg',
    },
    {
        img: require('../../../assets/images/products/review.png'),
        title: 'Accessories',
    },
    {
        img: require('../../../assets/images/products/review.png'),
        title: 'Head Wear',
    },
    {
        img: require('../../../assets/images/products/review.png'),
        title: 'Head Wear',
    },
];
