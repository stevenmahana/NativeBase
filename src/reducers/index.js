import { combineReducers } from 'redux';
import AuthenticateReducer from './AuthenticateReducer';
import MainReducer from './MainReducer';

export default combineReducers({
  authenticate: AuthenticateReducer,
  main: MainReducer
});
