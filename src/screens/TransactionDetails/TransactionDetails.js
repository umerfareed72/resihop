import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {AddWalletModal, CustomHeader} from '../../components';
import {appIcons, appImages, colors, family, HP, size} from '../../utilities';
import LinearGradient from 'react-native-linear-gradient';

const TransactionDetails = ({navigation}) => {
  const modalRef = useRef(null);

  return (
    <>
      <CustomHeader
        title="Transaction Details"
        backButton={true}
        navigation={navigation}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.marginContainer}>
          <LinearGradient
            style={{borderRadius: 13}}
            colors={colors.transactionGradient}>
            <View style={styles.receiptText}>
              <Text style={styles.receipt}>Receipt</Text>
              <View
                style={{width: 120, borderBottomWidth: 1, marginTop: HP(1)}}
              />
            </View>
            <View style={{marginHorizontal: HP('2')}}>
              <View style={styles.priceContainer}>
                <Text style={styles.payRide}>Paid for Ride</Text>
                <Text style={styles.payPrice}>100 SEK</Text>
              </View>
              <Text style={styles.dateTime}>18:00, 12 June 2020</Text>
              <Text style={styles.dateTime}>Transaction ID : 1234567890</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: HP('4'),
                }}>
                <Text style={styles.dateTimeReplica}>•••• 1234</Text>
                <Image
                  style={{
                    width: HP('7'),
                    height: HP('7'),
                    resizeMode: 'contain',
                    marginHorizontal: HP('1'),
                  }}
                  source={appImages.visa}
                />
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderStyle: 'dotted',
                  borderColor: colors.g3,
                  marginTop: HP('4'),
                }}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  modalRef?.current.open();
                }}>
                <Text style={styles.buttonText}>Download</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </SafeAreaView>
      <AddWalletModal
        btnText={'OK'}
        onSuccess={true}
        onPress={() => {
          navigation?.navigate('PassengerHome');
        }}
        icon={appIcons.tickBg}
        h1={'Money Withdrawal Successful!'}
        show={modalRef}
        h2={
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        }
      />
    </>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_regular,
    color: colors.white,
    marginHorizontal: HP('2.5'),
    marginVertical: HP('2'),
  },
  button: {
    borderRadius: 50,
    marginTop: HP('1'),
    backgroundColor: colors.blue,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: HP('2'),
  },
  dateTime: {
    marginVertical: HP('2'),
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.g3,
  },
  dateTimeReplica: {
    marginVertical: HP('2'),
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  marginContainer: {
    marginTop: HP('3'),
    marginHorizontal: HP('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    // alignItems: 'center',

    borderRadius: 13,
  },
  receiptText: {
    alignItems: 'center',
    marginVertical: HP('3'),
  },
  receipt: {
    fontSize: size.h5,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
  priceContainer: {
    marginVertical: HP('2'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payRide: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  payPrice: {
    fontSize: size.xxlarge,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
});

export default TransactionDetails;
