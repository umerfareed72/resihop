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
  SmallButtons,
  SupportCard,
} from '../../../../components';
import {
  appIcons,
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
            <View style={styles.contentContainer}>
              <DRiderInfo
                cost_per_seat={selected_drive_history?.costPerSeat}
                passenger_info={selected_drive_history}
              />
            </View>
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
                <Text style={styles.reportText}>Report</Text>
                {data.map(item => (
                  <ItemView item={item} />
                ))}
              </View>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </>
  );
};

export default index;
