import { Platform } from 'react-native';

const colors = {
  primary: '#71B900',
  secondary: '#FFFFFF',
  accentColor: '#818181',
  Gold: 'rgb(249,176,0)',
  blue_light: '#E8F5FF',
  sceneBgColor: '#FFF1D8',
  searchBgColor: '#F3F7FA',
  searchIconColor: '#A3A3A3',
  white: '#FFFFFF',
  silver: 'hsl(0, 0%, 77%)',
  loadingBgColor: '	rgba(0,0,0,0.9)',
  toastBgColor: '#E9FFD9',
  lightGreen: '#f6fdf0',
  borderColor: '#6B6B6B',
  grey: '#6B6B6B',
  lightGray: '#CACACA',
  pickerHeader: 'rgb(225,224,224)',
  loader_blue: '#39ade5',
  btn_highlight: 'hsl(205, 100%, 41%)',
  input_selection_color_blue: '#39ade5',
  input_selection_color_white: '#ffffff',
  input_selection_color_black: '#000000',
  black: '#000000',
  error: '#d44447',
};

export const maxFontSize = 1.2;
export const allowFontScaling = true;

export const fonts = {
  regular:
    Platform.OS === 'ios' ? 'ProductSans-regular' : 'product_sans_regular',
  bold: Platform.OS === 'ios' ? 'ProductSans-bold' : 'product_sans_bold',
};

export const theme = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    accentColor: colors.accentColor,
    Gold: colors.Gold,
    btn_highlight: colors.btn_highlight,
    sceneBgColor: colors.sceneBgColor,
    searchIconColor: colors.searchIconColor,
    searchBgColor: colors.searchBgColor,
    white: colors.white,
    silver: colors.silver,
    borderColor: colors.borderColor,
    lightGreen: colors.lightGreen,
    loadingBgColor: colors.loadingBgColor,
    toastBgColor: colors.toastBgColor,
    grey: colors.grey,
    lightGray: colors.lightGray,
    pickerHeader: colors.pickerHeader,
    loader_blue: colors.loader_blue,
    blue_light: colors.blue_light,
    black: colors.black,
    error: colors.error,
    input_selection_color_blue: colors.input_selection_color_blue,
    input_selection_color_white: colors.input_selection_color_white,
    input_selection_color_black: colors.input_selection_color_black,
  },
  Header: {
    containerStyle: {
      borderBottomWidth: 0,
    },
    backgroundColor: 'transparent',
    centerComponent: {
      style: { fontFamily: fonts.regular, fontSize: 20, letterSpacing: 0 },
    },
  },
  View: {
    Container: {
      padding: 15,
    },
    Grabber: {
      width: 40,
      backgroundColor: colors.lightGray,
      borderRadius: 50,
      height: 4,
      marginTop: 3,
      alignSelf: 'center',
    },
  },
  Button: {
    loadingProps: { color: colors.white },
    gradientBtnLoadingProp: { color: colors.white },
    titleStyle: {
      color: colors.white,
      fontFamily: fonts.bold,
    },
    disabledStyle: {
      fontFamily: fonts.bold,
      backgroundColor: colors.silver,
      borderRadius: 14,
      paddingVertical: 16,
    },
    disabledTitleStyle: {
      fontFamily: fonts.bold,
      color: colors.white,
    },
    buttonStyle: {
      borderRadius: 14,
      paddingVertical: 16,
      backgroundColor: colors.primary,
    },
    type: 'outline',
    titleProps: {
      maxFontSizeMultiplier: maxFontSize,
      allowFontScaling: allowFontScaling,
    },
  },

  Text: {
    maxFontSizeMultiplier: maxFontSize,
    allowFontScaling: allowFontScaling,

    h1Normal: {
      fontSize: 28,
      fontFamily: fonts.regular,
      color: colors.black,
    },
    h1Bold: {
      fontSize: 28,
      fontFamily: fonts.bold,
      color: colors.black,
    },
    h2Normal: {
      fontSize: 22,
      fontFamily: fonts.regular,
      color: colors.black,
    },
    h2Bold: {
      fontSize: 22,
      fontFamily: fonts.bold,
    },
    h3Normal: {
      fontSize: 17,
      fontFamily: fonts.regular,
      color: colors.black,
    },
    h3Bold: {
      fontSize: 17,
      fontFamily: fonts.bold,
      color: colors.black,
    },
    h3Style: {
      fontSize: 20,
      padding: 5,
      fontFamily: fonts.regular,
    },
    h4Normal: {
      fontSize: 15,
      padding: 5,
      color: colors.black,
      fontFamily: fonts.regular,
    },

    hyperLink: {
      fontSize: 15,
      color: colors.primary,
      fontFamily: fonts.regular,
    },
    RnRegular: {
      fontFamily: fonts.regular,
    },
    RnMedium: {
      fontFamily: fonts.regular,
    },
    RnMediumColor: {
      fontFamily: fonts.regular,
      color: colors.primary,
      marginRight: 25,
    },
    Generics: {
      fontSize: 18,
    },
  },

  SocialIcon: {
    style: {
      borderRadius: 5,
      paddingLeft: 30,
      paddingRight: 30,
    },
  },

  SearchBar: {
    containerStyle: {
      borderRadius: 10,
      padding: 0,
      backgroundColor: colors.searchBgColor,
      borderColor: 'transparent',
      borderBottomWidth: 0,
      borderTopWidth: 0,
    },
    inputContainerStyle: {
      borderRadius: 5,
      backgroundColor: 'transparent',
    },
    inputStyle: {
      fontSize: 16,
      fontFamily: fonts.regular,
    },
  },

  Input: {
    inputContainerStyle: {
      borderBottomColor: 'rgba(0, 0, 0,0.3) ',
      paddingVertical: Platform.OS === 'android' ? 0 : 10,
    },
    inputErrorContainerStyle: {
      borderBottomColor: 'rgba(0, 0, 0,0.3) ',
      paddingVertical: Platform.OS === 'android' ? 0 : 10,
    },
    selectionColor: colors.primary,
    containerStyle: {
      marginVertical: 5,
    },
    inputStyle: {
      color: colors.black,
      fontFamily: fonts.regular,
    },
    placeholderTextColor: colors.lightGray,
    errorStyle: { color: colors.error, fontFamily: fonts.regular },
    errorRedStyle: { color: colors.error, fontFamily: fonts.regular },
    maxFontSizeMultiplier: maxFontSize,
    allowFontScaling: allowFontScaling,
    selectable: false,
  },

  Icon: {
    size: 25,
    underlayColor: 'transparent',
    padding: 5,
    color: colors.black,
  },
  Badge: {
    badgeStyle: {
      backgroundColor: colors.Gold,
      width: 10,
      height: 10,
      borderRadius: 10 / 2,
    },
    containerStyle: {
      position: 'absolute',
      top: 8,
      right: 9,
    },
  },
  CheckBox: {
    checkedColor: colors.white,
  },

  Picker: {
    itemStyle: { borderRadius: 1 },
  },
  Image: {
    placeholderStyle: { backgroundColor: 'transparent' },
    IconStyle: { width: 20, height: 20, resizeMode: 'contain', padding: 10 },
    AvatarStyle: { width: 70, height: 70, resizeMode: 'contain' },
    BiometricStyle: { width: 30, height: 30, resizeMode: 'contain' },
  },
  Avatar: {
    placeholderStyle: { backgroundColor: 'transparent' },
    overlayContainerStyle: { backgroundColor: 'transparent' },
  },
  Card: {
    containerStyle: { borderRadius: 10 },
  },
  Divider: {
    style: { height: 1.2 },
  },
  ListItem: {
    titleStyle: {
      fontFamily: fonts.regular,
      fontSize: 23,
    },
    subtitleStyle: {
      fontFamily: fonts.regular,
    },
  },

  BottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'silver',
    borderWidth: 1,
    borderTopWidth: 1,
  },
  Grabber: {
    width: 50,
    height: 10,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
  },
};
