import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    StatusBar,
    ImageBackground,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import TextFeild from '../../../components/TextFeild';
import { FilterSearchSvg, FilterSvg } from '../../../assets/svgs/FilterSvg';
import FilterPopup from '../../../components/FilterPopup';
import SortPopup from '../../../components/SortPopup';

const PopularProducts = ({ item }) => {
    const [actve, setActive] = useState('');
    const [heartActive, setHeartActive] = useState('');

    return (
        <View style={{ paddingHorizontal: 15 }}>
            <ImageBackground
                style={{
                    shadowColor: 'rgba(0,0,0,0.4)',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25, justifyContent: 'center', alignItems: 'center',
                    shadowRadius: 3.84,
                    elevation: 22,
                    backgroundColor: '#FAF7F1', borderRadius: 16, width: 156, height: 157,
                }}>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 10, top: 12, }}
                    onPress={() => {
                        item.fav = !item.fav;
                        setHeartActive(!heartActive);
                    }}>
                    <Icon iconFamily={'AntDesign'} name={item.fav ? 'heart' : 'hearto'} color={item.fav ? '#F91212' : Color.secondary} size={20} />
                </TouchableOpacity>
                <Image style={{ width: 120, height: 120 }} source={item.img} />
                <TouchableOpacity
                    style={{ position: 'absolute', right: 10, bottom: 12, backgroundColor: Color.tertiary, alignItems: 'center', justifyContent: 'center', borderRadius: 100, width: 28, height: 28 }}
                    onPress={() => {
                        item.isFav = !item.isFav;
                        setActive(!actve);
                    }}
                >
                    <Icon
                        iconFamily={'Entypo'} name={item.isFav ? 'plus' : 'minus'} color={Color.white} size={20} />
                </TouchableOpacity>
            </ImageBackground>
            <Text style={{ marginTop: 7, color: Color.primary, fontFamily: Font.Gilroy_SemiBold, fontSize: 13 }}>{item.name}</Text>
            <Text style={{ marginTop: 4, color: '#1B2336', fontFamily: Font.Gilroy_Medium, fontSize: 11 }}>{item.price}</Text>
            <View style={{ marginTop: 6, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ color: '#363B44', fontFamily: Font.Gilroy_Medium, fontSize: 11 }}>{item.product}</Text>
                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ paddingRight: 5, }}>
                        <Icon iconFamily={'Fontisto'} name={'star'} size={15} color={Color.tertiary} />
                    </View>
                    <Text style={{ color: 'rgba(8, 14, 30, 0.6)', fontFamily: Font.Gilroy_Medium, fontSize: 13 }}>({item.rating})</Text>
                </View>
            </View>
        </View>
    )
}

const Filter = ({ }) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [openFilterPopup, SetOpenFilterPopup] = useState(false);

    const onShowPopup = () => {
        setOpenPopup(true);
    };
    const onClosePopup = () => {
        setOpenPopup(false);
    };
    const onShowFilterPopup = () => {
        SetOpenFilterPopup(true);
    };
    const onFilterClosePopup = () => {
        SetOpenFilterPopup(false);
    };
    return (
        <SafeAreaView style={{}}>
            <View style={{ marginTop: 0, paddingHorizontal: 20, backgroundColor: Color.white, paddingVertical: 20 }}>
                <AppBar
                    left={
                        <View style={{ width: Window.width / 1.4 }}>
                            <TextFeild icon={'magnify'} placeholderTextColor={'rgba(8, 14, 30, 0.4)'} placeholder={'Search'} />
                        </View>
                    }
                    right={
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: Color.tertiary, width: 56, height: 56 }}>
                            <FilterSvg />
                        </View>
                    }
                />
                <View style={{ marginTop: 24, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }} >
                    <TouchableOpacity
                        onPress={onShowFilterPopup}
                        style={{ backgroundColor: 'rgba(157, 157, 157, 0.12)', flexDirection: 'row', alignItems: 'center', alignItems: 'center', justifyContent: 'center', width: 108, borderRadius: 100, height: 44 }}>
                        <FilterSearchSvg />
                        <Text style={{ color: Color.secondary, fontSize: 11, fontFamily: Font.Gilroy_Medium, paddingHorizontal: 10 }}>2 Filters</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onShowPopup}
                        style={{ backgroundColor: 'rgba(157, 157, 157, 0.12)', flexDirection: 'row', alignItems: 'center', alignItems: 'center', justifyContent: 'center', width: 108, borderRadius: 100, height: 44 }}>
                        <Icon iconFamily={'Feather'} name={'chevron-down'} color={Color.primary} size={20} />
                        <Text style={{ color: Color.primary, fontSize: 13, fontFamily: Font.Gilroy_Medium, paddingHorizontal: 10 }}>Sort By</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingTop: 18, backgroundColor: Color.light, paddingHorizontal: 20 }}
            >
                <FlatList
                    contentContainerStyle={{ alignItems: 'center', }}
                    style={{}}
                    data={TrendData}
                    renderItem={({ item }) => (
                        <PopularProducts item={item} />
                    )}
                    numColumns={2}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                />
                <FilterPopup
                    onTouchOutside={onFilterClosePopup}
                    openFilterPopup={openFilterPopup}
                />
                <SortPopup
                    onTouchOutside={onClosePopup}
                    openPopup={openPopup}
                />
            </ScrollView>

        </SafeAreaView>
    )
}
export default Filter;

const TrendData = [
    {
        img: require('../../../assets/images/products/T-Shirt.png'),
        name: 'Run Tight Trouser',
        saleItems: '21 Sold',
        price: '$20.00',
        rating: '4.8',
        product: 'Mens T-Shirt',
    },
    {
        img: require('../../../assets/images/products/T-Shirt.png'),
        name: 'Run Tight Trouser',
        saleItems: '21 Sold',
        price: '$20.00',
        rating: '4.8',
        product: 'Mens T-Shirt',
    },
    {
        img: require('../../../assets/images/products/T-Shirt.png'),
        name: 'Run Tight Trouser',
        saleItems: '21 Sold',
        price: '$20.00',
        rating: '4.8',
        product: 'Mens T-Shirt',
    },

    {
        img: require('../../../assets/images/products/T-Shirt.png'),
        name: 'Run Tight Trouser',
        saleItems: '21 Sold',
        price: '$20.00',
        rating: '4.8',
        product: 'Mens T-Shirt',
    },

]