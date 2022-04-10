import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import {colors, family, HP, size} from '../../../utilities';

export const SupportCard = ({
  item,
  onPressCard,
  onCreateTicket,
  onChangeText,
}) => {
  return (
    <>
      <View style={styles.itemView}>
        <Text style={styles.titleText}>{item?.title}</Text>
        <TouchableOpacity onPress={onPressCard}>
          <Icon
            name={item?.expanded ? 'up' : 'right'}
            color={colors.light_black}
            size={22}
            type={'antdesign'}
          />
        </TouchableOpacity>
      </View>
      {item?.expanded && (
        <View>
          <Text style={styles.descriptionText}>{item?.descripion}</Text>
          <TextInput
            onChangeText={onChangeText}
            style={{
              height: HP('12'),
              marginVertical: HP('2'),
              borderRadius: 14,
              borderColor: colors.gray_shade,
              borderWidth: 1,
              paddingHorizontal: 10,
              color: colors.black,
            }}
            placeholder="Please tell us your issue."
            placeholderTextColor={colors.gray_shade}
          />

          <TouchableOpacity
            onPress={onCreateTicket}
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
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
