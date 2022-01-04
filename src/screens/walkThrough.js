import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import PagerView, {PagerViewOnPageScrollEvent} from 'react-native-pager-view';
import {Container} from '../components/Container';
import {theme} from '../theme';
import {Image, Button, Text, Icon} from 'react-native-elements';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import I18n from '../utilities/translations';
import {CustomHeader} from '../components';

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
  const onViewRef = React.useRef(({viewableItems}: any) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <>
      <CustomHeader navigation={props.navigation} backButton={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container padding={0} flexGrow={2} paddingBottom={100} bounce={false}>
          <View style={{height: '100%', width: '100%'}}>
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
                    <View key={item.item.key}>
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
            <View style={{flex: 1, justifyContent: 'space-evenly'}}>
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
            <View style={styles.bottomCon}>
              <Text style={[theme.Text.h1Bold, styles.heading]}>
                {I18n.t('welcome_to_resihop_msg')}
              </Text>
              <Text style={[theme.Text.h3Normal, styles.headingSaying]}>
                {I18n.t('walkthrough_msg_one')}
              </Text>
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
                  buttonStyle={[
                    theme.Button.buttonStyle,
                    {paddingVertical: 10},
                  ]}
                  disabledStyle={theme.Button.disabledStyle}
                  disabledTitleStyle={theme.Button.disabledTitleStyle}
                  containerStyle={{
                    width: '30%',
                    alignSelf: 'center',
                    marginTop: 60,
                  }}
                />
              </View>
            </View>
          </View>
        </Container>
      </ScrollView>
    </>
  );
}

export default walkThrough;

const styles = StyleSheet.create({
  pagerCon: {
    height: '60%',
    width: '100%',
    marginBottom: 20,
  },
  pager: {height: '100%', width: '100%'},
  wtImg: {
    resizeMode: 'cover',
  },
  bottomCon: {
    height: '50%',
    marginTop: 10,
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
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5
  },
  skipText: {
    height: '30%',
    alignSelf: 'flex-end',
    color: theme.colors.grey,
    fontSize: 17,
  },
});
