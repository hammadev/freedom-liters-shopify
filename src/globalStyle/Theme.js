import {Dimensions, Platform} from 'react-native';
const Color = {
  primary: '#231F20',
  secondary: '#656872',
  tertiary: '#021C5E',
  light: '#F5F5F5',
  white: '#fff',
  black: '#000',
  gryLight: '#A0A0A0',
};

const Font = {
  Gilroy_Regular: 'Gilroy-Regular',
  Gilroy_Medium: 'Gilroy-Medium',
  Gilroy_SemiBold: 'Gilroy-SemiBold',
  Gilroy_Bold: 'Gilroy-Bold',
  Gilroy_Black: 'Gilroy-Black',
  Gilroy_ExtraBold: 'Gilroy-ExtraBold',
  Gilroy_Light: 'Gilroy-Light',
  Automove_Personal:
    Platform.OS == 'ios' ? 'AutomovePersonalUse' : 'Automove-Personal',
};

const Window = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  fixPadding: 10.0,
};

const GlobalStyle = {
  Container: {
    paddingHorizontal: Window.fixPadding * 2,
    backgroundColor: Color.light,
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontFamily: Font.Automove_Personal,
    color: Color.primary,
    lineHeight: Window.fixPadding * 2,
  },
  textStlye: {
    fontSize: 15,
    fontFamily: Font.Gilroy_Medium,
    color: Color.tertiary,
  },
  bottomButtonContainer: {
    flex: 1,
    backgroundColor: Color.light,
    justifyContent: 'flex-end',
  },
  appbarCenterStyle: {
    fontSize: 22,
    fontFamily: Font.Gilroy_Bold,
    color: Color.primary,
  },
  borderStyle: {
    marginTop: Window.fixPadding * 2,
    borderWidth: 0.2,
    height: 0.7,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  showMoreStyle: {
    fontSize: 14,
    fontFamily: Font.Gilroy_Medium,
    color: 'rgba(8, 14, 30, 0.4)',
  },
};

export {Color, Font, Window, GlobalStyle};
