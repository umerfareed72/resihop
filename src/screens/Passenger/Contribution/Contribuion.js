import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CustomHeader} from '../../../components';
import {
  appIcons,
  appImages,
  HP,
  size,
  colors,
  family,
  MY_CONTRIBUTION,
  responseValidator,
  header,
} from '../../../utilities';
import {ContributionCard} from '../../../components';
import {get} from '../../../services';

const Contribution = ({navigation}) => {
  const [getContribution, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContributions();
  }, []);
  const getContributions = async () => {
    try {
      const response = await get(`${MY_CONTRIBUTION}`, await header());
      setContributions(response?.data);
    } catch (error) {
      // console.log(error);
      setLoading(false);
      let status = JSON.stringify(error.message);
      let msg = error.response.data.message;
      responseValidator(status, msg);
    }
  };
  return (
    <ImageBackground style={{flex: 1}} source={appImages.tree}>
      <CustomHeader
        headerColor={'transparent'}
        barColor={'transparent'}
        backButton={true}
        navigation={navigation}
        title="My Contribution"
        btnImage1={appIcons.share_icon}
        bg3Color={'transparent'}
        tintColor3={colors?.light_black}
        height3={25}
        width3={25}
      />
      <View style={styles.viewContainer}>
        <View style={styles.imgContainer}>
          <Image
            resizeMode={'contain'}
            style={styles.imgStyle}
            source={appImages.app_logo}
          />
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>100 KG(s) CO2 Reduced</Text>
        </TouchableOpacity>
        <FlatList
          data={getContribution}
          contentContainerStyle={{marginVertical: HP('4')}}
          numColumns="2"
          renderItem={item => <ContributionCard data={item} />}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: HP('2'),
    backgroundColor: 'orange,',
    alignItems: 'center',
  },
  imgStyle: {
    width: HP('12'),
    height: HP('12'),
    borderRadius: 100,
  },
  imgContainer: {
    marginVertical: HP('2'),
    alignItems: 'center',
  },
  userName: {
    fontSize: size.xxlarge,
    color: colors.light_black,
    fontFamily: family.product_sans_bold,
  },
  buttonStyle: {
    backgroundColor: colors.green,
    height: HP('7'),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: size.h5,
    fontFamily: family.product_sans_bold,
    color: colors.white,
  },
});
export default Contribution;
