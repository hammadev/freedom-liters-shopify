import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Searchbar} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {postSearch} from '../apis/blogs';
import {SvgXml} from 'react-native-svg';
import {noSearchResults, searchSvg} from '../assets/svgs/TopicsSvg';
import {CatBox} from '../screens/main/home/Home';
import {Color, Font, Window} from '../globalStyle/Theme';

const Search = ({
  setScrollActive,
  type,
  focus,
  setFocus,
  expand,
  setExpand,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeSearch = query => setSearchQuery(query);
  const theme = {
    roundness: 120 / 8,
    colors: {
      onSurface: Color.light,
      onSurfaceVariant: focus ? Color.tertiary : Color.light,
      elevation: {
        level3: Color.white,
      },
    },
  };

  const heightProgress = useSharedValue(58);
  const reanimatedHeightStyle = useAnimatedStyle(() => {
    return {
      height: heightProgress.value,
    };
  }, []);
  useEffect(() => {
    if (expand) {
      heightProgress.value = withSpring(Window.height - 162);
    } else {
      heightProgress.value = withTiming(55);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expand]);
  const search = query => {
    postSearch(setData, query, setLoading);
  };
  return (
    <Animated.View style={[reanimatedHeightStyle, {overflow: 'hidden'}]}>
      <Searchbar
        theme={theme}
        placeholder="Search"
        onClearIconPress={() => {
          setLoading(false);
          setSearchedQuery('');
          setData([]);
        }}
        onEndEditing={text => {
          if (text.nativeEvent.text) {
            setLoading(true);
            search(text.nativeEvent.text);
            setSearchedQuery(text.nativeEvent.text);
          }
        }}
        onChangeText={text => {
          onChangeSearch(text);
        }}
        value={searchQuery}
        onFocus={() => {
          setScrollActive(false);
          setFocus(true);
          setExpand(true);
        }}
        onBlur={() => {
          // setScrollActive(true);
          setFocus(false);
        }}
        style={[
          {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderRadius: 100,
            borderColor: '#CBD1DA',
            //   height: 50,
          },
        ]}
        mode="view"
        rippleColor={Color.primary}
        showDivider={false}
        inputStyle={{minHeight: 48}}
      />

      {loading && expand ? (
        <View style={{marginTop: 50}}>
          <ActivityIndicator animating={true} color={Color.tertiary} />
        </View>
      ) : data.length > 0 ? (
        <>
          <Text style={styles.sectionSubHeading}>
            Showing results of {searchedQuery} ({data.length})
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            style={{flex: 1, borderRadius: 100, overflow: 'hidden'}}
            contentContainerStyle={{
              flexGrow: 1,
              borderRadius: 100,
              paddingBottom: 150,
            }}
            renderItem={({item}) => <CatBox item={item} />}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={
              <View
                style={{
                  marginVertical: 5,
                }}
              />
            }
          />
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          {searchedQuery !== '' && (
            <Text style={[styles.sectionSubHeading, {alignSelf: 'flex-start'}]}>
              Showing results of {searchedQuery} ({data.length})
            </Text>
          )}
          <SvgXml
            xml={searchedQuery !== '' ? noSearchResults : searchSvg}
            width={Window.width / 1.5}
            height={Window.height / 2}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default Search;

const styles = StyleSheet.create({
  title: {
    fontFamily: Font.Gilroy_Bold,
    fontSize: 16,
    color: Color.tertiary,
    marginVertical: 25,
  },
  sectionSubHeading: {
    fontSize: 16,
    color: Color.light,
    fontFamily: Font.Gilroy_Medium,
    marginVertical: 25,
  },
});
