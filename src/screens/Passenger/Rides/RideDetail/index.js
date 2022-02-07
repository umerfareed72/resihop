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
const index = ({navigation, route}) => {
  //useState here
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consetetur',
      expanded: false,
      descripion:
        'Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur',
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consetetur',
      expanded: false,
      descripion:
        'Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet, consetetur',
      expanded: false,
      descripion:
        'Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet, consetetur',
      expanded: false,
      descripion:
        'Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur',
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit amet, consetetur',
      expanded: false,
      descripion:
        'Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur',
    },
    {
      id: 6,
      title: 'Lorem ipsum dolor sit amet, consetetur',
      expanded: false,
      descripion:
        'Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur',
    },
    {
      id: 7,
      title: 'Lorem ipsum dolor sit amet, consetetur',
      expanded: false,
      descripion:
        'Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur. Lorem ipsum dolor sit amet, consetetur',
    },
  ]);

  //methods here
  const updateData = ({id}) => {
    setData(
      data.map(item => {
        console.log('id in update DAta is  ', id);
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

  //component here
  const ItemView = ({data}) => {
    console.log('data value in item view is   ', data);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <RideHistoryCard
              dateTime={route?.params?.ride_detail?.createdAt}
              profilePic={true}
              cost={'30'}
              onPressCard={() => {
                console.log(route?.params?.ride_detail);
              }}
              no_of_seats={route?.params?.ride_detail?.requiredSeats}
              startLocation={route?.params?.ride_detail?.startDes}
              destination={route?.params?.ride_detail?.destDes}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.contentContainer}>
            <RiderInfo />
          </View>
          <View style={styles.separator} />
          <View style={[styles.contentContainer, {margin: 20}]}>
            <PaymentButtons
              bgColor={colors.green}
              title={'Call Now'}
              txtColor={colors.white}
              fontFamily={family.product_sans_bold}
              image={appIcons.call}
            />
          </View>
          <View style={[styles.contentContainer]}>
            <Text style={styles.reportText}>Report</Text>
            {data.map(item => (
              <ItemView data={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default index;
