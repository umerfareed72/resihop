import React, {Component, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {CustomHeader, RatingCardModal} from '../../../components';
import {
  checkConnected,
  colors,
  family,
  header,
  HP,
  size,
  WP,
} from '../../../utilities';
import I18n from '../../..//utilities/translations';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import _delete from '../../../services/delete';
import {logout} from '../../../redux/actions/auth.action';

const Settings = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);
  const {userInfo} = useSelector(state => state?.auth);
  const dispatch = useDispatch(null);
  const ItemsView = ({data}) => {
    return (
      <TouchableOpacity onPress={data?.onPress}>
        <View style={styles.itemView}>
          <Text style={styles.titleText}>{data?.title}</Text>

          <Icon
            name={'right'}
            color={colors.light_black}
            size={22}
            type={'antdesign'}
          />
        </View>
      </TouchableOpacity>
    );
  };

  let data = [
    {
      title: I18n.t('set_lang'),
      onPress: () => navigation.navigate('MultiLanguage'),
    },
    {
      title: I18n.t('set_help'),
      onPress: () => navigation.navigate('Help'),
    },
    // {
    //   title: I18n.t('set_notif_set'),
    //   onPress: () => navigation.navigate('NotificationSettings'),
    // },
    {
      title: I18n.t('set_block'),
      onPress: () => navigation.navigate('BlockedList'),
    },
    {
      title: I18n.t('faq_title'),
      onPress: () => navigation.navigate('Faq'),
    },
    {
      title: I18n.t('set_about'),
      onPress: () => navigation.navigate('AboutUs'),
    },
    {
      title: I18n.t('set_terms'),
      onPress: () => navigation.navigate('Terms'),
    },
    {
      title: I18n.t('set_privacy'),
      onPress: () => navigation.navigate('Privacy'),
    },
    {
      title: I18n.t('delete_account'),

      onPress: () => {
        Alert.alert(I18n.t('confirmation'), I18n.t('ask'), [
          {
            text: I18n.t('yes'),
            onPress: () => {
              deleteAccount();
            },
          },
          {
            text: I18n.t('no'),
            onPress: () => console.log('Cancel Pressed'),
          },
        ]);
      },
    },
    {
      title: I18n.t('set_app_version'),
    },
  ];

  const deleteAccount = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        const responseData = await _delete(
          `users/${userInfo?.id}`,
          await header(),
        );
        if (responseData?.data) {
          dispatch(
            logout(() => {
              Alert.alert(I18n.t('success'), I18n.t('deleted_profile'), [
                {
                  text: I18n.t('ok'),
                  onPress: () => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'AuthStack'}],
                    });
                  },
                },
              ]);
            }),
          );
        }
      } catch (error) {
        navigation.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        });
      }
    } else {
      Alert.alert('Error', 'Check Internet Connection!');
    }
  };
  return (
    <>
      <CustomHeader
        title={I18n.t('setting')}
        backButton={true}
        navigation={navigation}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.settingsContentContainer}>
            {data.map(item => (
              <ItemsView data={item} />
            ))}
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </ScrollView>
      </View>
      {show && (
        <RatingCardModal
          h1={I18n.t('add_experience')}
          show={show}
          onPressHide={() => {
            setShow(false);
          }}
          onSelectRating={setRating}
          rating={rating}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  settingsContentContainer: {
    paddingHorizontal: WP('5'),
  },
  itemView: {
    marginVertical: HP('2'),
    flexDirection: 'row',
    // backgroundColor: 'orange',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  titleText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  versionText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.g1,
  },
});

export default Settings;
