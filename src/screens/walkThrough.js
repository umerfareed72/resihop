import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import PagerView, {PagerViewOnPageScrollEvent} from 'react-native-pager-view';
import {walkthrough_img_one, walkthrough_img_two} from '../assets';
import {Container} from '../components/Container';
import {theme} from '../theme';
import {Image, Button, Text, Icon} from 'react-native-elements';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {
  skip,
  walkthrough_msg_one,
  welcome_to_resihop_msg,
} from '../theme/strings';
import {appIcons} from '../utilities/images';

const introData = [
  {
    key: '1',
    img: appIcons.walkthrough_img_one,
  },
  {
    key: '2',
    img: appIcons.walkthrough_img_two,
  },
];

function walkThrough(props) {
  const width = Dimensions.get('window').width;

  const [page, setPage] = React.useState(0);
  const ref = React.useRef(PagerView);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, introData.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, introData.length * width],
  });

  const onPageScroll = React.useMemo(() => {
    Animated.event <
      PagerViewOnPageScrollEvent >
      [
        {
          nativeEvent: {
            offset: scrollOffsetAnimatedValue,
            position: positionAnimatedValue,
          },
        },
      ],
      {
        useNativeDriver: false,
      };
  });
  return (
    <Container padding={0} flexGrow={2} paddingBottom={100} bounce={false}>
      <View style={{height: '100%', width: '100%'}}>
        <View style={styles.pagerCon}>
          <PagerView
            style={styles.pager}
            ref={ref}
            initialPage={0}
            onPageScroll={onPageScroll}
            onPageSelected={e => {
              setPage(e.nativeEvent.position);
            }}>
            {introData.map(item => (
              <View key={item.key}>
                <Image source={item.img} style={styles.wtImg} />
              </View>
            ))}
          </PagerView>
        </View>
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <ExpandingDot
            data={introData}
            expandingDotWidth={30}
            //@ts-ignore
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
            {welcome_to_resihop_msg}
          </Text>
          <Text style={[theme.Text.h3Normal, styles.headingSaying]}>
            {walkthrough_msg_one}
          </Text>
          <View style={styles.bottomBtnCon}>
            <Text
              style={[theme.Text.h2Bold, styles.skipText]}
              onPress={() => {
                props.navigation.navigate('LandingUser');
              }}>
              {skip}
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
                if (page === 1) {
                  props.navigation.navigate('LandingUser');
                } else {
                  ref.current.setPage(1);
                }
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
        </View>
      </View>
    </Container>
  );
}

export default walkThrough;

const styles = StyleSheet.create({
  pagerCon: {height: '60%', width: '100%', marginBottom: 20},
  pager: {height: '100%', width: '100%'},
  wtImg: {
    height: '100%',
    width: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  skipText: {
    height: '30%',
    alignSelf: 'flex-end',
    color: theme.colors.grey,
    fontSize: 17,
  },
});
