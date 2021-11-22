import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {CustomHeader} from '../../../components';
import {colors, family, HP, size} from '../../../utilities';
import {Divider, Icon} from 'react-native-elements';

const Faq = ({navigation}) => {
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
            <Text style={styles.descriptionText}>{data?.descripion}</Text>
          </View>
        )}
        <Divider />
      </>
    );
  };

  return (
    <>
      <CustomHeader navigation={navigation} title="FAQs" backButton={true} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainContainer}>
            {data.map(item => (
              <ItemView data={item} />
            ))}
          </View>
        </ScrollView>
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
    // marginVertical: HP('1'),
    marginBottom: HP('3'),
    fontFamily: family.product_sans_regular,
    color: colors.gray_shade,
  },
});

export default Faq;
