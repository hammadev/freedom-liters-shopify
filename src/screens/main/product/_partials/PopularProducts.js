import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Window } from '../../../../globalStyle/Theme';
import ProductBox from './ProductBox';
import { useSelector } from 'react-redux';

const PopularProducts = () => {
    const { product, wishlist } = useSelector(state => ({ ...state }));

    return (
        <FlatList
            contentContainerStyle={{ paddingHorizontal: Window.fixPadding * 2, marginBottom: Window.fixPadding }}
            data={product.latest}
            // renderItem={({ item, index }) => {
            //   console.log("item", item);
            // }}
            renderItem={({ item, index }) => (
                <ProductBox wishlist={wishlist} customStyle={{ width: Window.width / 2.3 }} item={item} index={index} />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: Window.fixPadding * 1.5 }}></View>}
        />
    );
}

export default PopularProducts;

const styles = StyleSheet.create({})