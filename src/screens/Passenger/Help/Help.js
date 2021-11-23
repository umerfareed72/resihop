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

const Help = ({navigation}) => {
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
                  // fontFamily: family.product_sans_bold,
                  color: colors.white,
                }}>
                Submit
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
        navigation={navigation}
        title="Help & Support"
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <Text style={styles.reportText}>Report</Text>
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
    // fontFamily: family.product_sans_bold,
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
    // fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  descriptionText: {
    fontSize: size.xxsmall,
    // fontFamily: family.product_sans_regular,
    color: colors.gray_shade,
  },
});

export default Help;