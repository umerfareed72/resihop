import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {
  CustomHeader,
  DRideHistoryCard,
  DRiderInfo,
  Loader,
  SmallButtons,
  SupportCard,
} from '../../../../components';
import {
  appIcons,
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
import {FlatList} from 'react-native';
const index = ({navigation}) => {
  //useState here
  const {selected_drive_history} = useSelector(state => state.map);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch(null);
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
                navigation?.navigate('DriverHome');
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

  const onPressBlock = async (item, index) => {
    try {
      const check = await checkConnected();
      if (check) {
        setisLoading(true);
        selected_drive_history.rides[index].user.blocked =
          !selected_drive_history.rides[index].user.blocked;
        if (item?.user.blocked) {
          const requestBody = {
            user: item?.user?._id,
          };
          console.log(requestBody);
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
            `${baseURL}blocked/${item?.user?._id}`,
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
        title={I18n.t('driver_ride_detail')}
        navigation={navigation}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <DRideHistoryCard
            drive_item={selected_drive_history}
            onPressCard={() => {}}
          />
        </View>
        <View style={styles.separator} />
        {selected_drive_history?.status == 'COMPLETED' ? (
          <>
            <FlatList
              data={selected_drive_history?.rides}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.contentContainer}>
                    <DRiderInfo
                      cost_per_seat={selected_drive_history?.costPerSeat}
                      passenger_info={item}
                      onPressBlock={() => onPressBlock(item, index)}
                      block={item?.user?.blocked}
                    />
                  </View>
                );
              }}
            />

            <View style={styles.separator} />
            <View
              style={[
                styles.contentContainer,
                {
                  padding: 20,
                },
              ]}>
              <SmallButtons
                bgColor={colors.green}
                title={'Call Now'}
                txtColor={colors.white}
                fontFamily={family.product_sans_bold}
                height={40}
                width={'60%'}
                image={appIcons.call}
                onPress={() => {
                  createAgoraChannel();
                }}
              />
            </View>
            {data != '' ? (
              <View style={[styles.contentContainer]}>
                <Text style={styles.reportText}>{I18n.t('report')}</Text>
                {data.map(item => (
                  <ItemView item={item} />
                ))}
              </View>
            ) : null}
          </>
        ) : null}
        {isLoading && <Loader />}
      </ScrollView>
    </>
  );
};

export default index;
