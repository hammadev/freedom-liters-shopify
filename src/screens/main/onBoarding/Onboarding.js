import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { Font, Color, Window, GlobalStyle } from '../../../globalStyle/Theme';
import deviceInfoModule from 'react-native-device-info';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Button from '../../../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';
let hasNotch = deviceInfoModule.hasNotch();

const OnBoarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const progress = useSharedValue(0);
  const progressIndicator = useSharedValue(8);
  const progressIndicator1 = useSharedValue(8);
  const progressIndicator2 = useSharedValue(8);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);
  const reanimatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      width: progressIndicator.value,
    };
  }, []);
  const reanimatedIndicator1Style = useAnimatedStyle(() => {
    return {
      width: progressIndicator1.value,
    };
  }, []);
  const reanimatedIndicator2Style = useAnimatedStyle(() => {
    return {
      width: progressIndicator2.value,
    };
  }, []);

  useEffect(() => {
    if (currentSlideIndex > 0) {
      progress.value = withSpring(1);
    } else {
      progress.value = withSpring(0);
    }
    if (currentSlideIndex === 0) {
      progressIndicator.value = withSpring(27);
    } else {
      progressIndicator.value = withSpring(8);
    }
    if (currentSlideIndex === 1) {
      progressIndicator1.value = withSpring(27);
    } else {
      progressIndicator1.value = withSpring(8);
    }
    if (currentSlideIndex === 2) {
      progressIndicator2.value = withSpring(27);
    } else {
      progressIndicator2.value = withSpring(8);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlideIndex]);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / Window.width);
    setCurrentSlideIndex(currentIndex);
  };
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (currentSlideIndex === 2) {
      navigation.replace('SignIn');
      return;
    }
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * Window.width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const goLastSlide = () => {
    const offset = 2 * Window.width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(2);
  };
  const goToPrevSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1;
    if (currentSlideIndex === 0) {
      return;
    }
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * Window.width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Color.tertiary} barStyle={'light-content'} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        contentContainerStyle={{
          alignItems: 'center',
          backgroundColor: Color.light,
        }}
        horizontal
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={Window.width}
        onScrollEndDrag={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => <Slide item={item} />}
      />

      <Indicators
        currentSlideIndex={currentSlideIndex}
        goToNextSlide={goToNextSlide}
        goToPrevSlide={goToPrevSlide}
        navigation={navigation}
        reanimatedStyle={reanimatedStyle}
        reanimatedIndicatorStyle={reanimatedIndicatorStyle}
        reanimatedIndicator1Style={reanimatedIndicator1Style}
        reanimatedIndicator2Style={reanimatedIndicator2Style}
      />
    </>
  );
};
export default OnBoarding;
const Slide = ({ item }) => {
  return (
    <View
      style={{
        width: Window.width,
        height: Window.height / 1.25,
        backgroundColor: '#021851',
      }}>
      <Image
        style={{
          width: Window.width,
          height: Window.height,
        }}
        source={item.image}
      />

      <View
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: hasNotch ? 110 : 70,
        }}>
        <Text
          style={{
            ...GlobalStyle.heading,
            color: Color.white,
            fontSize: 14,
            lineHeight: 34,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: Color.white,
            fontSize: 15,
            fontFamily: Font.Gilroy_Medium,
            paddingTop: 20,
            lineHeight: 20,
            letterSpacing: 1,
          }}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
};
const Indicators = ({
  currentSlideIndex,
  goToPrevSlide,
  goToNextSlide,
  reanimatedStyle,
  reanimatedIndicatorStyle,
  reanimatedIndicator1Style,
  reanimatedIndicator2Style,
  navigation,
}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#021851',
        paddingBottom: 20,
      }}>
      <View style={{ paddingBottom: 20 }}>
        <Button
          text={currentSlideIndex === 2 ? 'Continue' : 'Next'}
          icon="mail"
          isIcon={false}
          theme="white"
          navLink="SignIn"
          borderWidth={1}
          borderColor={Color.tertiary}
          onPressFunc={
            currentSlideIndex === 2
              ? async () => {
                await AsyncStorage.setItem('onBoardCompleted', 'Done');
                navigation.replace('SignIn');
              }
              : goToNextSlide
          }
        />
      </View>

      <Button
        text={currentSlideIndex == 2 ? 'Skip' : 'Skip'}
        icon="mail"
        isIcon={false}
        theme="tertiary"
        navLink="SignIn"
        type="primary"
        onPressFunc={
          currentSlideIndex === 2
            ? async () => {
              await AsyncStorage.setItem('onBoardCompleted', 'Done');
              navigation.replace('SignIn');
            }
            : goToNextSlide
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // height: Window.height,
    width: Window.width / 1.5,
  },
  title: {
    fontFamily: Font.Manrope_bold,
    alignSelf: 'center',
    // textAlign: 'center',
    fontSize: 24,
    color: Color.light,
    letterSpacing: 1.75,
  },
  subTitle: {
    fontFamily: Font.Manrope_regular,
    fontSize: 16,
    color: '#BDBDBD',
    marginTop: 0,
    marginBottom: 65,
    textAlign: 'center',
  },
  indicator: {
    height: 8,
    width: 8,
    // opacity: 0.5,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  fab: {
    height: 55,
    width: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.secondary,
    shadowColor: Color.secondary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
});
const slides = [
  {
    id: 1,
    title: 'Discover a better way to shop online',
    subtitle:
      'Explore our wide selection of products and brands, and save time with smart search tools.',
    image: require('../../../assets/images/products/onboarding1.png'),
    // background: (
    //   <Onboard1 width={Window.width / 1.25} height={Window.height / 1.35} />
    // ),
  },
  {
    id: 2,
    title: 'Your One-Stop Shop for Everything',
    subtitle:
      'Browse our curated collections and get personalized recommendations based on your preferences.',
    image: require('../../../assets/images/products/onboarding2.png'),
    // background: (
    //   <Onboard2 width={Window.width / 1.25} height={Window.height / 1.35} />
    // ),
  },
  {
    id: 3,
    title: 'fast -  secure -  and easy!',
    subtitle:
      'Enjoy interactive product demos, 360-degree views, and user-generated reviews.',
    image: require('../../../assets/images/products/onboarding3.png'),
    // background: (
    //   <Onboard3 width={Window.width / 1.25} height={Window.height / 1.35} />
    // ),
  },
];
