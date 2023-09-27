import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { CartSvg } from '../../../assets/svgs/SocialIconsSvgs';
import { useSelector } from 'react-redux';
import { SkypeIndicator } from 'react-native-indicators';
import { ProductPaginationReq, ProductCategoryWiseReq } from '../../../apis/product';
import ProductBox from './_partials/ProductBox';

const ProductListing = ({ navigation, route }) => {
    // const navigation = useNavigation('');
    const { product, categories, wishlist } = useSelector(state => ({ ...state }));
    // console.log("product",product.products[0]);
    const [products, setProducts] = useState(product.all);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [endOfScrolling, setEndOfScrolling] = useState(false);
    const [categoryWiseList, setCategoryWiseList] = useState(null);
    const [active, setActive] = useState(0);
    // console.log(product);

    function handleEnd() {
        if (!endOfScrolling) {
            setLoading(true);
            ProductPaginationReq(page + 1, setEndOfScrolling, setLoading, setProducts, setCategoryWiseList, active);
            setPage(page + 1);
            console.log('endddd');
        }
    }


    function setCategory(catId) {
        setActive(catId);
        if (catId !== 0) {
            setCategoryWiseList(null);
            setPage(1);
            ProductCategoryWiseReq(catId, setLoading, setCategoryWiseList, setEndOfScrolling);
            setEndOfScrolling(false);
        }
    }

    useEffect(() => {
        if (route.params?.catId > 0)
            setCategory(route.params.catId);
    }, [route.params?.catId])

    const MenuItem = ({ item }) => (
        <TouchableOpacity
            style={{
                ...styles.menuButton,
                backgroundColor: active === item.id ? Color.tertiary : 'white',
            }}
            onPress={() => setCategory(item.id)}>
            <Text
                style={{
                    ...styles.menuText,
                    color: active === item.id ? 'white' : '#707070',
                }}>
                {item.name.replace('&amp;', '&')}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    backgroundColor: Color.light,
                    paddingHorizontal: Window.fixPadding * 2,
                    marginBottom: Window.fixPadding / 2
                }}>
                <AppBar
                    theme='dark'
                    title='Product Listing'
                />
                {/* <AppBar
                    theme='dark'
                    center={
                        <Text style={{ ...GlobalStyle.heading, fontSize: 17 }}>Product Listing</Text>
                    }
                    right={
                        <TouchableOpacity onPress={() => navigation.navigate('CheckOut')}>
                            <CartSvg />
                        </TouchableOpacity>
                    }
                /> */}
            </View>
            <View >
                <FlatList
                    horizontal
                    data={[{ id: 0, name: 'All' }, ...categories[0]]}
                    renderItem={MenuItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginHorizontal: '3%', marginVertical: Window.fixPadding }}
                />
            </View>
            <FlatList
                contentContainerStyle={{ justifyContent: 'space-between', paddingHorizontal: Window.fixPadding * 2, paddingVertical: Window.fixPadding, flexDirection: 'row', flexWrap: 'wrap' }}
                style={{ flex: 1 }}
                data={active === 0 ? products : categoryWiseList}
                renderItem={({ item }) => <ProductBox
                    customStyle={{ width: Window.width / 2.3 }}
                    item={item}
                    wishlist={wishlist}
                />}
                // numColumns={2}
                // horizontal={true}
                showsHorizontalScrollIndicator={false}
                // ListFooterComponent={renderFooter}
                // ItemSeparatorComponent={() => <View style={{ width: 15, margin: 20 }} />}
                onEndReached={handleEnd}
                onEndReachedThreshold={0.5}
                refreshing={loading}
                onRefresh={() => (
                    <SkypeIndicator size={40} color={Color.tertiary} />
                )}
                ListFooterComponent={() =>
                    !endOfScrolling &&
                    <SkypeIndicator size={40} color={Color.light} />
                }
            />
            {loading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#000000AA',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <SkypeIndicator size={40} color={Color.light} />
                </View>
            )}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        borderRadius: Window.width * 0.05,
        marginHorizontal: 5,
        paddingHorizontal: 9,
        paddingVertical: 7,
    },
    menuText: {
        //   fontSize: Text_Size_Type.Text_Type_6,
        //   fontFamily: font.regular,
        ...GlobalStyle.textStlye,
        textTransform: 'capitalize',
    },
});

export default ProductListing;