import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {fonts} from '../../../theme';
import {colors} from '../../../utilities';

export const GoogleInput = ({
  ref,
  placeholder,
  onPress,
  query,
  filterReverseGeocodingByTypes,
  textInputProps,
}) => {
  return (
    <View>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={placeholder}
        onPress={onPress}
        query={query}
        debounce={400}
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        enablePoweredByContainer={false}
        returnKeyType={'search'}
        minLength={2}
        styles={{
          container: {
            flex: 0,
            width: 326,
          },
          textInput: {
            height: 44,
            borderWidth: 1,
            borderColor: colors.greyBorder,
            borderRadius: 10,
            paddingLeft: 45,
            fontSize: 13,
            color: colors.inputTxtGray,
            fontFamily: fonts.regular,
          },
        }}
        filterReverseGeocodingByTypes={filterReverseGeocodingByTypes} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3']
        textInputProps={textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
