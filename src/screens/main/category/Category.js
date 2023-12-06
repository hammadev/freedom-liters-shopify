import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {CatBoxCat} from '../../../components/CategoryCart';
import {COLORS, CONTAINER_PADDING, RADIUS, WIDTH} from '../../../constants';
import Header from '../../../components/Header';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

const Category = ({navigation}) => {
  const {categories} = useSelector(state => ({...state}));
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={COLORS.white}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <Header label="Category" hideBackButton />

      <FlatList
        style={{
          flex: 1,
          marginTop: 25,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        data={categories.allcategories.edges}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: CONTAINER_PADDING,
        }}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item, index}) => (
          <CatBoxCat navigation={navigation} item={item} index={index} />
        )}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
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
