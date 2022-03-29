import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  colors,
  WP,
  appIcons,
  size,
  family,
  appImages,
} from '../../../utilities';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

export const RatingCardModal = ({
  h1,
  show,
  onPressHide,
  rating,
  onSelectRating,
  onPressSubmit,
}) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={show} onBackdropPress={onPressHide}>
        <View style={styles.modalContainer}>
          <View
            style={{
              justifyContent: 'space-between',
              paddingVertical: 20,
              height: WP('40'),
              width: WP('50'),
            }}>
            <Text style={styles.h1}>{h1}</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              starSize={30}
              fullStar={appIcons.full_star}
              starStyle={{paddingHorizontal: 2}}
              emptyStar={appIcons.empty_star}
              selectedStar={onSelectRating}
            />
          </View>

          <TouchableOpacity style={styles.btnContainer} onPress={onPressSubmit}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    height: WP('55'),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 22,
    width: WP('75'),

    alignSelf: 'center',
  },
  h1: {
    fontSize: size.large,
    color: colors.light_black,
    fontFamily: family.product_sans_regular,
    textAlign: 'center',
    lineHeight: 30,
  },
  btnContainer: {
    backgroundColor: colors.green,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderBottomStartRadius: 22,
    borderBottomEndRadius: 22,
  },
  btnText: {
    color: colors.white,
    fontFamily: family.product_sans_regular,
    fontSize: size.small,
  },
});
