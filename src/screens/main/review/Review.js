import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, Font, GlobalStyle} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../../../core/Icon';
import TextField from '../../../components/TextFeild';
import {ReviewsApply} from '../../../apis/review_rating';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';

const StarReveiews = ({item}) => {
  return (
    <View
      style={{
        backgroundColor: '#FAF7F1',
        // shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 3,
        marginTop: 18,
        marginRight: 16,
        width: 48,
        height: 48,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        iconFamily={'FontAwesome'}
        name={item.star}
        color={Color.secondary}
        size={20}
      />
      {/* <Text style={{color: '#000'}}>{item.rating} </Text> */}
    </View>
  );
};
const Headings = ({item, props, name, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation()} style={{marginTop: 24}}>
      <Text
        style={{
          fontSize: 15,
          fontFamily: Font.Gilroy_SemiBold,
          color: Color.primary,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const Review = ({route, item}) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');

  // const {productId} = route.params;

  const {auth} = useSelector(state => ({...state}));
  //   console.log('reviewText', auth);

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar />
      <ScrollView>
        <Text style={GlobalStyle.heading}>Write a Review</Text>
        <View style={{marginTop: 34}}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: Font.Gilroy_Medium,
              color: 'rgba(8, 14, 30, 0.4)',
            }}>
            Ratingsfs
          </Text>
          <View style={{flexDirection: 'row'}}>
            {StarData.map(item => (
              <StarReveiews item={item} />
            ))}
          </View>
        </View>
        <Headings name={'Product Details'} />

        <TextField
          placeholder={'Review'}
          value={reviewText}
          onChanged={setReviewText}
          textColor={Color.white}
          // activeOutlineColor={Color.secondary}
          // multiline={50}
        />
        {/* <TextInput
          // placeholderTextColor={Color.secondary}
          placeholder={'Review'}
          multiline="20"
          activeOutlineColor={Color.white}
          style={{backgroundColor: '#ccc'}}
        /> */}
      </ScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 15}}>
        <Button
          text="Submit"
          isIcon={false}
          theme="secondary"
          onPressFunct={() =>
            ReviewsApply(
              {
                product_id: item.id,
                review: reviewText,
                reviewer: auth.meta.first_name + ' ' + auth.meta.last_name,
              },
              auth,
              navigation,
              setLoading,
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};
export default Review;

const StarData = [
  {
    star: 'star',
  },
  {
    star: 'star',
  },
  {
    star: 'star',
  },
  {
    star: 'star',
  },
  {
    star: 'star',
  },
];

{
  /* <TextInput
  selectTextOnFocus={false}
  placeholder="Write Here"
  placeholderTextColor={'#000'}
  style={{
    borderRadius: 16,
    paddingVertical: 50,
    marginTop: 20,
    paddingLeft: 10,
    textAlignVertical: 'top',
    backgroundColor: Color.light,
    borderColor: Color.secondary,
    borderWidth: 1,
  }}
/>; */
}
