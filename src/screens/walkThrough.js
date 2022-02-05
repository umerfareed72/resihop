import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {theme} from '../theme';
import {Image, Button, Text, Icon} from 'react-native-elements';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import I18n from '../utilities/translations';

import {appIcons} from '../utilities/images';

const introData = [
  {
    key: '0',
    img: appIcons.walkthrough_img_one,
  },
  {
    key: '1',
    img: appIcons.walkthrough_img_two,
  },
];

function walkThrough(props) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height / 2;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  let flatListRef = React.useRef(null);
  const gotoNextPage = () => {
    if (activeIndex + 1 < introData.length) {
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      props.navigation.navigate('LandingUser');
    }
  };
  const onViewRef = React.useRef(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={styles.pagerCon}>
            <FlatList
              ref={flatListRef}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              data={introData}
              keyExtractor={i => i.key}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {
                  useNativeDriver: false,
                },
              )}
              pagingEnabled
              horizontal
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              renderItem={item => {
                return (
                  <View style={{flex: 1}} key={item.item.key}>
                    <Image
                      source={item.item.img}
                      style={{
                        width: width,
                        height: height,
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-evenly',
              marginTop: '5%',
            }}>
            <ExpandingDot
              data={introData}
              expandingDotWidth={30}
              scrollX={scrollX}
              inActiveDotOpacity={0.6}
              activeDotColor={theme.colors.primary}
              inActiveDotColor={theme.colors.primary}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 5,
              }}
              containerStyle={{
                top: 1,
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.headerContainer}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image source={appIcons.backArrow} style={styles.imageStyle} />
          </TouchableOpacity>
          {activeIndex == 0 ? (
            <View style={styles.bottomCon}>
              <Text style={[theme.Text.h1Bold, styles.heading]}>
                {I18n.t('welcome_to_resihop_msg')}
              </Text>
              <Text style={[theme.Text.h3Normal, styles.headingSaying]}>
                {I18n.t('walkthrough_msg_one')}
              </Text>
            </View>
          ) : (
            <View style={styles.bottomCon}>
              <Text style={[theme.Text.h1Bold, styles.heading]}>
                {'Välkommen Till Res ihop'}
              </Text>
              <Text style={[theme.Text.h3Normal, styles.headingSaying]}>
                {
                  'Erbjud tomma platser i bilen på väg till jobbet och få ersättning av de som reser. Oroa dig inte, vi tar hand om alla anslutningar, du anger bara din rutt du anger bara din rutt.'
                }
              </Text>
            </View>
          )}
        </View>
        <View style={styles.bottomBtnCon}>
          <Text
            style={[theme.Text.h2Bold, styles.skipText]}
            onPress={() => {
              props.navigation.navigate('LandingUser');
            }}>
            {I18n.t('skip')}
          </Text>
          <Button
            icon={
              <Icon
                name={'arrowright'}
                type={'antdesign'}
                color={theme.colors.white}
              />
            }
            onPress={() => {
              gotoNextPage();
            }}
            buttonStyle={[theme.Button.buttonStyle, {paddingVertical: 10}]}
            disabledStyle={theme.Button.disabledStyle}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '30%',
              alignSelf: 'center',
              marginTop: 60,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default walkThrough;

const styles = StyleSheet.create({
  pagerCon: {
    height: '60%',
    width: '100%',
  },
  pager: {height: '100%', width: '100%'},
  wtImg: {
    resizeMode: 'cover',
  },
  bottomCon: {
    height: '50%',
    marginTop: 30,
  },
  heading: {
    padding: 10,
  },
  headingSaying: {
    paddingHorizontal: 10,
    lineHeight: 28,
  },
  bottomBtnCon: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  skipText: {
    height: '30%',
    alignSelf: 'flex-end',
    color: theme.colors.grey,
    fontSize: 17,
  },
  imageStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  headerContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 20 : 40,
    left: 20,
  },
});
