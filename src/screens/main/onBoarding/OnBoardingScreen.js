import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import { Font, Color, Window, GlobalStyle } from '../../../globalStyle/Theme';
import deviceInfoModule from 'react-native-device-info';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';

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
    // const offset = 2 * Window.width;
    // ref?.current.scrollToOffset({offset});
    // setCurrentSlideIndex(2);
    navigation.navigate('SignIn');
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
      <FocusAwareStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'light-content'}
        showHideTransition={'fade'}
        translucent
      />
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
        disableIntervalMomentum={true}
      />

      <Indicators
        currentSlideIndex={currentSlideIndex}
        goToNextSlide={goToNextSlide}
        goToPrevSlide={goToPrevSlide}
        goLastSlide={goLastSlide}
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
        height: Window.height / 1.21,
        backgroundColor: '#fff',
      }}>
      <Image
        style={{
          width: Window.width,
          height: Window.height / 1.60,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
        source={item.image}
      />

      <View
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: hasNotch ? 110 : 20,
        }}>
        <Text
          style={{
            color: Color.black,
            fontSize: 28,
            textAlign: 'center',
            fontWeight: '900'
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: Color.gryLight,
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
  goToNextSlide,
  navigation,
  goLastSlide,
}) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingBottom: 25,
      }}>
      <View style={{ paddingBottom: 20 }}>
        <Button
          text={currentSlideIndex === 2 ? 'Continue' : 'Next'}
          type="secondary"
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
        type="alternate"
        onPressFunc={
          currentSlideIndex === 2
            ? async () => {
              await AsyncStorage.setItem('onBoardCompleted', 'Done');
              navigation.replace('SignIn');
            }
            : goLastSlide
        }
      />
    </View>
  );
};

const slides = [
  {
    id: 1,
    title: `Custom Apparel  
Your Way`,
    subtitle:
      'Explore our wide selection of products and brands, and save time with smart search tools.',
    image: require('../../../assets/images/images/onboarding1.png'),
  },
  {
    id: 2,
    title: `Custom Apparel
Your Way`,
    subtitle:
      'Browse our curated collections and get recommendations based on your preferences.',
    image: require('../../../assets/images/images/onboarding2.png'),
  },
  {
    id: 3,
    title: `Custom Apparel 
Your Way`,
    subtitle:
      'Enjoy interactive product demos, 360-degree views, and user-generated reviews.',
    image: require('../../../assets/images/images/onboarding3.png'),
  },
];
