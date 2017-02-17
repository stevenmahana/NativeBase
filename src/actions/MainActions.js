import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import base64 from 'base-64';
import _ from 'lodash';

import {
  SEARCH_CHANGED
} from './types';

import { config } from '../secure/config';

const baseUrl = config.development.api;

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  };
};

