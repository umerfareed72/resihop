import {createStore, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';
import RootReducer from '../reducers/rootReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

var store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
let persistor = persistStore(store);

export {store, persistor};
