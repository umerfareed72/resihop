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
  Loader,
  PaymentButtons,
  RideHistoryCard,
  RiderInfo,
  SupportCard,
} from '../../../../components';
import {
  appIcons,
  appImages,
  baseURL,
  checkConnected,
  colors,
  family,
  header,
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
import {post, remove} from '../../../../services';
const index = ({navigation, route}) => {
  //Redux States
  const dispatch = useDispatch(null);
  const auth = useSelector(state => state.auth);
  const rides = useSelector(state => state.map);

  //useState here
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [block, setblock] = useState(false);
  const isFocus = useIsFocused(null);

  const createAgoraChannel = () => {
    const requestBody = {
      to: rides?.selected_ride_history?.drive?.user?._id,
    };
    dispatch(
      create_agoral_channel(requestBody, res => {
        navigation?.navigate('CallNow', {
          firstName: rides?.selected_ride_history?.drive?.user?.firstName,
          lastName: rides?.selected_ride_history?.drive?.user?.lastName,
        });
      }),
    );
  };

  useEffect(() => {
    if (isFocus) {
      getHelps();
      setblock(rides?.selected_ride_history?.drive?.user?.blocked);
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
  const onPressBlock = async () => {
    try {
      const check = await checkConnected();
      if (check) {
        setisLoading(true);
        setblock(!block);
        if (!block) {
          const requestBody = {
            user: rides?.selected_ride_history?.drive?.user?._id,
          };
          const res = await post(
            `${baseURL}blocked`,
            requestBody,
            await header(),
          );
          if (res?.data) {
            Alert.alert('Success', 'User successfully blocked!');
            setisLoading(false);
          }
        } else {
          const res = await remove(
            `${baseURL}blocked/${rides?.selected_ride_history?.drive?.user?._id}`,
            await header(),
          );
          if (res?.data) {
            Alert.alert('Success', 'User successfully unblocked!');
            setisLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
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
                  block={block}
                  onPressBlock={onPressBlock}
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
                  <Text style={styles.reportText}>{I18n.t('report')}</Text>
                  {data?.map(item => (
                    <ItemView item={item} />
                  ))}
                </View>
              ) : null}
            </>
          ) : null}
        </View>
      </ScrollView>
      {isLoading && <Loader />}
    </>
  );
};

export default index;
