import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import { Color, Font, GlobalStyle, Window } from '../../../globalStyle/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../../core/Icon';
import { ShareIcon, CartSvg } from '../../../assets/svgs/SocialIconsSvgs';
import DileveryPopup from '../../../components/DileveryPopup';
import ReadMoreText from '../../../components/ReadMoreText';
import PopularProducts from './_partials/PopularProducts';
import Heading from '../../../components/Heading';
import RenderHtml from 'react-native-render-html';

const ProductDetail = ({ route, navigation }) => {

  const { product } = route.params;

  const [openPopup, setOpenPopup] = useState(false);

  const onShowPopup = () => {
    setOpenPopup(true);
  };
  const onClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: Color.white, flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 0}}
        style={{backgroundColor: Color.white, flex: 1}}>
        <View
          style={{
            backgroundColor: '#F6F4F0',
            paddingVertical: Window.fixPadding,
            borderBottomRightRadius: Window.fixPadding * 2,
            borderBottomLeftRadius: Window.fixPadding * 2,
          }}>
          <AppBar
            theme="dark"
            header="solid"
            customStyle={{paddingHorizontal: Window.fixPadding * 2}}
            right={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ShareIcon />
              </View>
            }
          />
          <View
            style={{alignItems: 'center', width: Window.width, height: 200}}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              source={{uri: product.node.featuredImage?.url}}
            />
          </View>
        </View>

        <View style={{backgroundColor: Color.white, paddingTop: 20}}>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                iconFamily={'Fontisto'}
                name={'star'}
                size={15}
                color={Color.tertiary}
              />
              <Text
                style={{
                  paddingLeft: 5.5,
                  fontSize: 13,
                  fontFamily: Font.Gilroy_Medium,
                  color: Color.primary,
                }}>
                {product.average_rating + ' '}(
                {product.rating_count + ' Reviews'})
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Heading name={product.node.title} />
            <Text
              style={{
                fontSize: 20,
                fontFamily: Font.Gilroy_Bold,
                color: Color.primary,
              }}>
              {product.node.priceRange.minVariantPrice.amount +
                ' ' +
                product.node.priceRange.minVariantPrice.currencyCode}
            </Text>
          </View>
          {product.sku && product.categories && (
            <View
              style={{
                paddingHorizontal: Window.fixPadding * 2,
                marginTop: Window.fixPadding,
              }}>
              <Text style={{...GlobalStyle.textStlye}}>SKU: {product.sku}</Text>
              <Text style={{...GlobalStyle.textStlye}}>
                Category:{' '}
                {product?.categories.map((item, i) => {
                  if (i === 0) {
                    return item.name;
                  } else {
                    return ' / ' + item.name;
                  }
                })}
              </Text>
            </View>
          )}
          <View style={GlobalStyle.borderStyle} />
          <Heading
            containerStyle={{
              paddingHorizontal: Window.fixPadding * 2,
              marginTop: Window.fixPadding * 2,
            }}
            name="Description"
          />

          <View style={{marginTop: 14, paddingHorizontal: 20}}>
            <RenderHtml
              tagsStyles={{
                p: {
                  color: 'black',
                  fontSize: 14,
                  letterSpacing: -0.3,
                },
                iframe: {
                  display: 'none',
                },
              }}
              contentWidth={Window.width}
              source={{html: product.node.descriptionHtml}}
            />
            {/* <ReadMoreText
              text={product.node.descriptionHtml}
              textStyle={{
                lineHeight: 20,
                fontFamily: Font.Gilroy_Regular,
                fontSize: 13,
                color: 'rgba(8, 14, 30, 0.4)',
              }}
              readMoreStyle={{
                fontFamily: Font.Gilroy_Medium,
                fontSize: 13,
                color: Color.primary,
              }}
            /> */}
          </View>

          <View style={GlobalStyle.borderStyle} />

          <Heading
            name="Latest"
            containerStyle={{
              paddingHorizontal: Window.fixPadding * 2,
              marginTop: Window.fixPadding * 2,
            }}
          />
          <PopularProducts />
          <DileveryPopup
            ref={target => (popupRef = target)}
            onTouchOutside={onClosePopup}
            openPopup={openPopup}
            product={product}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: Color.light,
          paddingVertical: 10,
          elevation: 10,
          marginTop: Window.fixPadding * 1.6,
        }}>
        <Button
          onPressFunc={onShowPopup}
          type="tertiary"
          theme="tertiary"
          text="Add to Cart"
        />
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          backgroundColor: Color.white,
          paddingVertical: 20,
        }}>
        <View style={{ width: '50%', paddingRight: 5 }}>

        </View>
        <View style={{ width: '50%', paddingLeft: 5 }}>
          <Button onPressFunc={onShowPopup} theme="tertiary" text="Buy Now" />
        </View>
      </View> */}
    </SafeAreaView>
  );
};

export default ProductDetail;


