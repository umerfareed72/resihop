import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {
  CustomHeader,
  FavDriverCard,
  PaymentButtons,
} from '../../../../components';
import {post, remove} from '../../../../services';
import {
  appIcons,
  appImages,
  colors,
  family,
  header,
  HP,
  size,
} from '../../../../utilities';
import I18n from '../../../../utilities/translations';
import styles from './styles';

const index = ({navigation}) => {
  const [addFavourite, setaddFavourite] = useState(false);
  const driveItem = useSelector(state => state.map);
  const auth = useSelector(state => state.auth);
  const [favId, setfavId] = useState('');

  const onPressAddFav = async item => {
    try {
      setaddFavourite(!addFavourite);
      if (!addFavourite) {
        const requestBody = {
          type: 'PASSENGER',
          user: auth?.profile_info?.id,
          driver_passenger: item?.user?._id,
        };
        const res = await post(`favorites`, requestBody, await header());
        if (res.data) {
          setfavId(res?.data?.id);
          console.log('Favourite');
        }
      } else {
        if (favId != '') {
          const res = await remove(`favorites/${favId}`, await header());
          console.log('UNFAVOURITE');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CustomHeader
        onPress={() => {
          navigation?.navigate('DriverHome');
        }}
        backButton={true}
        title={I18n.t('add_to_favourite')}
        navigation={navigation}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <FlatList
            data={driveItem?.idToUpdateDrive.rides}
            renderItem={({item, index}) => {
              return (
                <FavDriverCard
                  favourite={addFavourite}
                  name={item?.user?.firstName + ' ' + item?.user?.lastName}
                  pickupInfo={moment(item?.tripDate).format('hh:mm')}
                  addFavourite={() => onPressAddFav(item)}
                  selectedStar={item?.user?.rating_r}
                />
              );
            }}
          />

          <View style={{padding: 20}}>
            <PaymentButtons
              onPress={() => {
                navigation?.navigate('DriverHome');
              }}
              title={'Move to Driver Home'}
              bgColor={colors.green}
              txtColor={colors.white}
              fontFamily={family.product_sans_bold}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default index;
