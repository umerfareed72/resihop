import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageStore,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {
  CustomHeader,
  PaymentButtons,
  RideHistoryCard,
  RiderInfo,
  SupportCard,
} from '../../../../components';
import {
  appIcons,
  appImages,
  checkConnected,
  colors,
  family,
  HP,
  size,
} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {Divider, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {create_agoral_channel} from '../../../../redux/actions/app.action';
import {useIsFocused} from '@react-navigation/core';
import {create_ticket, get_help} from '../../../../redux/actions/map.actions';
const index = ({navigation, route}) => {
  //Redux States
  const dispatch = useDispatch(null);
  const auth = useSelector(state => state.auth);
  const rides = useSelector(state => state.map);

  //useState here
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const isFocus = useIsFocused(null);

  const createAgoraChannel = () => {
    const requestBody = {
      to: auth?.profile_info?._id,
    };
    dispatch(
      create_agoral_channel(requestBody, res => {
        navigation?.navigate('CallNow');
      }),
    );
  };

  useEffect(() => {
    if (isFocus) {
      getHelps();
    }
  }, [isFocus]);

  const getHelps = async () => {
    const check = await checkConnected();
    if (check) {
      setisLoading(true);
      dispatch(
        get_help(res => {
          setData(res);
          setisLoading(false);
        }),
      );
    } else {
      Alert.alert('Error', 'Check Internet Connection!');
    }
  };
  //methods here
  const updateData = myItem => {
    setData(
      data.map(item => {
        if (item?.id === myItem?.id) {
          return {
            ...item,
            expanded: !item.expanded,
          };
        } else {
          return {
            ...item,
            expanded: false,
          };
        }
      }),
    );
  };
  const createTicket = async item => {
    const check = await checkConnected();
    if (check) {
      setisLoading(true);
      const requestBody = {
        user: auth?.userInfo?.id,
        customerQuery: item?.description,
        question: item?.id,
      };
      dispatch(
        create_ticket(requestBody, res => {
          setisLoading(false);
          Alert.alert('Success', 'Query submitted successfully', [
            {
              text: 'Ok',
              onPress: () => {
                navigation?.navigate('PassengerHome');
              },
            },
          ]);
        }),
      );
    } else {
      Alert.alert('Error', 'Check Internet Connection!');
    }
  };
  //component here
  const ItemView = ({item, index}) => {
    return (
      <SupportCard
        item={item}
        onChangeText={text => {
          item.description = text;
        }}
        onCreateTicket={() => {
          createTicket(item);
        }}
        onPressCard={() => updateData(item)}
      />
    );
  };

  return (
    <>
      <CustomHeader
        backButton={true}
        title={I18n.t('ride_detail')}
        navigation={navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <RideHistoryCard
              dateTime={rides?.selected_ride_history?.createdAt}
              profilePic={true}
              cost={'30'}
              onPressCard={() => {
                // console.log(route?.params?.ride_detail);
              }}
              no_of_seats={rides?.selected_ride_history?.requiredSeats}
              startLocation={rides?.selected_ride_history?.startDes}
              destination={rides?.selected_ride_history?.destDes}
              vehicleInfo={rides?.selected_ride_history?.drive?.user?.vehicle}
            />
          </View>
          <View style={styles.separator} />
          {rides?.selected_ride_history?.status == 'COMPLETED' ? (
            <>
              <View style={styles.contentContainer}>
                <RiderInfo
                  driverInfo={rides?.selected_ride_history?.drive?.user}
                />
              </View>
              <View style={styles.separator} />
              <View style={[styles.contentContainer, {margin: 20}]}>
                <PaymentButtons
                  bgColor={colors.green}
                  title={'Call Now'}
                  txtColor={colors.white}
                  fontFamily={family.product_sans_bold}
                  image={appIcons.call}
                  onPress={() => {
                    createAgoraChannel();
                  }}
                />
              </View>
              {data != '' ? (
                <View style={[styles.contentContainer]}>
                  <Text style={styles.reportText}>Report</Text>
                  {data?.map(item => (
                    <ItemView item={item} />
                  ))}
                </View>
              ) : null}
            </>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default index;
