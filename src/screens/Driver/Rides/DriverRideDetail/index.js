import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  CustomHeader,
  DRideHistoryCard,
  DRiderInfo,
  SmallButtons,
} from '../../../../components';
import {appIcons, colors, family, HP, size} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {Divider, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
const index = ({navigation}) => {
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
  const {selected_drive_history} = useSelector(state => state.map);
  console.log(selected_drive_history);
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
          />
        </View>
        <View style={[styles.contentContainer]}>
          <Text style={styles.reportText}>Report</Text>
          {data.map(item => (
            <ItemView data={item} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default index;
