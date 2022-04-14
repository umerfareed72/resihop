import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {CustomHeader, Loader, SupportCard} from '../../../components';
import {checkConnected, colors, family, HP, size} from '../../../utilities';
import {Divider, Icon} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {create_ticket, get_help} from '../../../redux/actions/map.actions';
import {Alert} from 'react-native';
import I18n from '../../../utilities/translations';
const Help = ({navigation}) => {
  const isFocus = useIsFocused(null);
  const dispatch = useDispatch(null);
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const auth = useSelector(state => state.auth);

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
                navigation?.navigate('PassengerHome');
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
        navigation={navigation}
        title="Help & Support"
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <Text style={styles.reportText}>{I18n.t('report')}</Text>
            {data?.map(item => (
              <ItemView item={item} />
            ))}
          </View>
        </ScrollView>
        {isLoading && <Loader />}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    marginHorizontal: HP('2.5'),
  },
  reportText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
    color: colors.blue,
    marginVertical: HP('1'),
  },
  itemView: {
    marginVertical: HP('2'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  descriptionText: {
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.gray_shade,
  },
});

export default Help;
