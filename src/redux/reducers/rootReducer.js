import {combineReducers} from 'redux';
import auth from './auth';
import map from './map';
import * as Types from '../types/auth.types';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth: auth,
  map: map,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  // if (action.type === Types.Logout_Success) {
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;
