import React, {useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {
  CustomHeader,
  FavDriverCard,
  PaymentButtons,
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
import styles from './styles';
let data = [
  {
    id: 0,
    image: appImages.user,
    name: 'John Deo',
    price: 'NOK 20',
    rating: '4.5',
    description: 'Ford, Focus, White, XT32TTU8',
  },
  {
    id: 2,
    image: appImages.user,
    name: 'John Deo',
    price: 'NOK 20',
    rating: '4.5',
    description: 'Ford, Focus, White, XT32TTU8',
  },
  {
    id: 3,
    image: appImages.user,
    name: 'John Deo',
    price: 'NOK 20',
    rating: '4.5',
    description: 'Ford, Focus, White, XT32TTU8',
  },
];

const index = ({navigation}) => {
  const [addFavourite, setaddFavourite] = useState(false);
  const [selectStar, setSelectedStar] = useState(0);

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
            data={data}
            renderItem={({item, index}) => {
              return (
                <FavDriverCard
                  onselectStar={star => {
                    setSelectedStar(star);
                  }}
                  favourite={addFavourite}
                  addFavourite={() => setaddFavourite(!addFavourite)}
                  selectedStar={selectStar}
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
