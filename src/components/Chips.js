import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-elements';
import {fonts, theme} from '../theme';

const user = {
    Passenger: 'Passenger',
    Driver: 'Driver',
    Both: 'Driver/Passenger both',
  };
  

const littleChips = [
  {
    key: 0,
    text: user.Driver,
    isSelected: true,
  },
  {
    key: 1,
    text: user.Passenger,
    isSelected: false,
  },
  {
    key: 2,
    text: user.Both,
    isSelected: false,
  },
];

const Chips = ({onChipPress, horizontal = true}) => {
  const [data, setData] = useState(littleChips);

  return (
    <View style={styles.Con}>
      <FlatList
        data={data}
        // @ts-ignore
        keyExtractor={item => item.key}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        numColumns={horizontal ? 0 : 2}
        renderItem={({item, index}) => (
          <Chip
            containerStyle={[styles.chipCon, index !== 2 && {width: 150}]}
            title={item.text}
            type={'outline'}
            buttonStyle={
              item.isSelected ? styles.chipColoredButton : styles.chipButton
            }
            titleStyle={styles.chipTitle}
            onPress={() => {
              const newData = data.map((chip, i) => {
                chip.isSelected = index === i;
                return chip;
              });
              setData(newData);
              const chips = newData.filter(
                dataChip => dataChip.isSelected === true,
              );
              onChipPress(chips);
            }}
          />
        )}
      />
    </View>
  );
};

export default Chips;

const styles = StyleSheet.create({
  Con: {
    marginVertical: 10,
  },
  chipCon: {
    margin: 10,
  },
  chipButton: {
    backgroundColor: theme.colors.lightGray,
    borderColor: theme.colors.lightGray,
    padding: 20,
    paddingVertical: 10,
  },
  chipColoredButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    padding: 20,
    paddingVertical: 10,
  },
  chipTitle: {
    color: theme.colors.white,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
});
