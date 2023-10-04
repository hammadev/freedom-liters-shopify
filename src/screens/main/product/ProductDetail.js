import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {ShareIcon} from '../../../assets/svgs/SocialIconsSvgs';
import PopularProducts from './_partials/PopularProducts';
import Heading from '../../../components/Heading';
import RenderHtml from 'react-native-render-html';
import BottomPopupHOC from '../../../components/BottomPopupHOC';
import VariationsDetails from '../../../components/VariationsDetails';
import {hasNotch} from 'react-native-device-info';
import {StyleSheet} from 'react-native';

const ProductDetail = ({route}) => {
  const {product} = route.params;
  const [visible, setVisible] = useState(false);

    return (
    <SafeAreaView
      style={{backgroundColor: Color.white, flex: 1}}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        showHideTransition={'fade'}
        translucent
      />
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 0}}
        style={{backgroundColor: Color.white, flex: 1}}>
        <ImageBackground
                  resizeMode="cover"

          source={{uri: product.node.featuredImage?.url}}
          style={{
            width: '100%',
            paddingVertical: Window.fixPadding * 2,
            height: Window.height / 3,
          }}>
          <View style={styles.overlay} />
          <AppBar
            theme="#fff"
            header="solid"
            customStyle={{paddingHorizontal: Window.fixPadding * 2}}
            right={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ShareIcon />
              </View>
            }
          />
        </ImageBackground>

        <View style={{backgroundColor: Color.white, paddingTop: 20}}>
          {/* <View
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
          </View> */}
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

          {/* Select Vatiations Popup */}
          <BottomPopupHOC
            title="Select Varaition"
            visible={visible}
            setVisible={setVisible}
            product={product}

            PopupBody={<VariationsDetails product={product} />}
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
          onPressFunc={() => setVisible()}
          type="tertiary"
          theme="tertiary"
          text="Add to Cart"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
