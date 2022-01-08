import AsyncStorage from '@react-native-async-storage/async-storage';
import {post} from '../../services';
import {USER_DETAIL} from '../../utilities/routes';
import {responseValidator} from '../../utilities/helpers';
import * as Types from '../types/userdetail.types';

export const userPersonalDetail =
  (body, setIsLoading, callBack) => async dispatch => {
    console.log('BODY', body);
    try {
      const response = await post(USER_DETAIL, body);
      if (response?.data) {
        AsyncStorage.setItem('usertoken', response.data.jwt);
      }
      dispatch({
        type: Types.User_Detail_Success,
        payload: response?.data,
      });
      console.log('User details Api', response.data);
      callBack(response.data);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
      let status = error.name;
      let msg = error.message;
      responseValidator(status, msg);
      dispatch({
        type: Types.User_Detail_Failure,
        payload: error,
      });
      callBack(error);
    }
  };
