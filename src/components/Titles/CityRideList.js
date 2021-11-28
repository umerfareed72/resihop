import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {colors, WP, appIcons, size, family} from '../../utilities';
export const CityRideList = ({title, image, onPress}) => {
  const [addition, setAddition] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text style={{marginLeft: 21}}>How many bags?</Text>
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        data={[1, 2]}
        renderItem={({item}) => {
          return (
            <View style={styles.listContainer}>
              <Text>Hand Carry</Text>
              <TouchableOpacity
                onPress={() => {
                  setAddition(true);
                }}
                disabled={addition ? true : false}
                style={styles.btnContainer}>
                {addition ? (
                  <View style={styles.aiCenterRow}>
                    <TouchableOpacity
                      onPress={() => {
                        setCount(count - 1);
                      }}
                      style={styles.smallBtnConatinerLeft}>
                      <Text style={{color: colors.white}}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.aiCenter}>
                      <Text>{count}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setCount(count + 1);
                      }}
                      style={styles.smallBtnConatinerRight}>
                      <Text style={{color: colors.white}}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.btnText}>Add</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 21,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    borderColor: colors.green,
    borderWidth: 1,
    height: 24,
    width: 56,
    borderRadius: 12,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
    fontSize: size.xsmall,
    textAlign: 'center',
  },
  aiCenterRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  aiCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    height: 15,
    width: 20,
    marginRight: 19,
  },
  smallBtnConatinerRight: {
    width: '32%',
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  smallBtnConatinerLeft: {
    width: '32%',
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
  },
});
