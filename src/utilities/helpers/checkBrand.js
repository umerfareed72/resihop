import {Alert} from 'react-native';
import {appImages} from '../images';

export const checkBrand = name => {
  if (name == 'Visa') {
    return appImages.visa;
  }
};
