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
} from 'react-native';
import {
  CustomHeader,
  PaymentButtons,
  RideHistoryCard,
  RiderInfo,
} from '../../../../components';
import {
  appIcons,
  appImages,
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
const index = ({navigation, route}) => {
  //Redux States
  const dispatch = useDispatch(null);
  const auth = useSelector(state => state.auth);
  const rides = useSelector(state => state.map);

  //useState here
  const [data, setData] = useState([]);

  //methods here
  const updateData = ({id}) => {
    setData(
      data.map(item => {
        if (item?.id === id) {
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
  //component here
  const ItemView = ({data}) => {
    return (
      <>
        <View style={styles.itemView}>
          <Text style={styles.titleText}>{data?.title}</Text>
          <TouchableOpacity onPress={() => updateData(data)}>
            <Icon
              name={data?.expanded ? 'up' : 'right'}
              color={colors.light_black}
              size={22}
              type={'antdesign'}
            />
          </TouchableOpacity>
        </View>
        {data?.expanded && (
          <View>
            <Text style={styles.descriptionText}>{data?.descripion}</Text>
            <TextInput
              style={{
                height: HP('12'),
                marginVertical: HP('2'),
                borderRadius: 14,
                borderColor: colors.gray_shade,
                borderWidth: 1,
                paddingHorizontal: 10,
              }}
              placeholder="Please tell us your issue."
              placeholderTextColor={colors.gray_shade}
              color={colors.lightGray}
            />

            <TouchableOpacity
              style={{
                borderRadius: 15,
                height: HP('7'),
                backgroundColor: colors.green,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: HP('2'),
              }}>
              <Text
                style={{
                  fontSize: size.normal,
                  fontFamily: family.product_sans_bold,
                  color: colors.white,
                }}>
                Generate Ticket
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Divider />
      </>
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
            </>
          ) : null}
          {data != '' ? (
            <View style={[styles.contentContainer]}>
              <Text style={styles.reportText}>Report</Text>
              {data.map(item => (
                <ItemView data={item} />
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default index;
