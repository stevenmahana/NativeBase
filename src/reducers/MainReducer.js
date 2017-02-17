import {
  SEARCH_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  search: '',
  message: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return { ...state, search: action.payload };
    default:
      return { ...state };
  }
};
