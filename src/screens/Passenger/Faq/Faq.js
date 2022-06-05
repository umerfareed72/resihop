import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {CustomHeader, Loader} from '../../../components';
import {
  colors,
  family,
  HP,
  size,
  GET_FAQS,
  responseValidator,
} from '../../../utilities';
import {get} from '../../../services';
import {Divider, Icon} from 'react-native-elements';
import I18n from 'i18n-js';

const Faq = ({navigation}) => {
  const [getFaqs, setFaqs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getFaqsHanlder();
  }, []);
  const getFaqsHanlder = async () => {
    try {
      const response = await get(`${GET_FAQS}`);
      if (response.data) {
        let faqData = response?.data.map(data => {
          return {
            ...data,
            expanded: false,
          };
        });
        setFaqs(faqData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      let status = JSON.stringify(error.message);
      let msg = error.response.data.message;
      responseValidator(status, msg);
    }
  };

  //methods here
  const updateData = ({id}) => {
    setFaqs(
      getFaqs.map(item => {
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
              color={colors.g1}
              size={22}
              type={'antdesign'}
            />
          </TouchableOpacity>
        </View>
        {data?.expanded && (
          <View>
            <Text style={styles.descriptionText}>{data?.description}</Text>
          </View>
        )}
        <Divider />
      </>
    );
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={I18n.t('faq_title')}
        backButton={true}
      />
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.mainContainer}>
              {getFaqs.map(item => (
                <ItemView data={item} />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
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
    // marginVertical: HP('1'),
    marginBottom: HP('3'),
    fontFamily: family.product_sans_regular,
    color: colors.gray_shade,
  },
});

export default Faq;
