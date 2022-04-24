import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
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
  profileIcon,
} from '../../../utilities';
import {ContributionCard} from '../../../components';
import {get, post} from '../../../services';
import {useSelector} from 'react-redux';
import {Image} from 'react-native-elements';
const Contribution = ({navigation}) => {
  const [getContribution, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector(state => state.auth);
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
  const sharedContribution = async () => {
    const res = await post(`my-contributions`);
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
            progressiveRenderingEnabled={true}
            resizeMode={'cover'}
            style={styles.imgStyle}
            source={{uri: auth?.profile_info?.picture?.url || profileIcon}}
          />
          <Text style={styles.userName}>
            {auth?.profile_info?.firstName}
            {auth?.profile_info?.lastName}
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>
            {getContribution?.saved || 0} KG(s) CO2 Reduced
          </Text>
        </TouchableOpacity>
        <View style={styles.aiRow}>
          <ContributionCard
            title={getContribution?.rideShared || 0}
            description={'Ride(s) Shared'}
          />
          <ContributionCard
            title={getContribution?.distance || 0}
            description={'Distance Shared'}
          />
        </View>
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
    marginBottom: 10,
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
  aiRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },
});
export default Contribution;
