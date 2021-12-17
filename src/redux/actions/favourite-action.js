import * as Types from '../types/auth.types';
import {header} from '../../utilities/constants';
import {post} from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responseValidator} from '../../utilities/helpers';
import {AUTH_CONST, AUTH_PW_CONST} from '../../utilities/routes';

/////////////////////////////////////////  Login   ////////////////////////////

export const getFavouriteData = () => async dispatch => {
  try {
    dispatch({type: Types.Set_loader, payload: true});
    const response = await post(`auth/local`);

    dispatch({
      type: Types.Login_Success,
      payload: response?.data,
    });
    console.log('Login Successfully', response.data);
    callBack(response.data);
  } catch (error) {
    let status = error.name;
    let msg = error.message;
    responseValidator(status, msg);
    dispatch({
      type: Types.Login_Failure,
      payload: null,
    });
  }
};
