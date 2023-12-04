import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {CatBoxCat} from '../../../components/CategoryCart';
import {COLORS, CONTAINER_PADDING} from '../../../constants';
import Header from '../../../components/Header';

const Category = ({navigation}) => {
  const {categories} = useSelector(state => ({...state}));
  return (
    <SafeAreaView style={styles.container}>
      <Header label="Category" hideBackButton />

      <ScrollView
        style={{flex: 1, marginTop: 25}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: CONTAINER_PADDING,
        }}>
        <FlatList
          data={categories.allcategories.edges}
          numColumns={2}
          renderItem={item => <CatBoxCat navigation={navigation} item={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
