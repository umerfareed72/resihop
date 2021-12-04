import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';
import en from './en';
import sw from './sw';

I18n.fallbacks = false;

I18n.translations = {
  en,
  sw,
};

/*
    Only allow RTL if we have translations for RTL languages (ie. not fallbacks)
*/
I18nManager.allowRTL(I18n.locale in I18n.translations);

export default I18n;
