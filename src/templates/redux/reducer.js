import _ from 'lodash';
import {
  <constants_placeholder>_BEGIN,
  <constants_placeholder>_SUCCESS,
  <constants_placeholder>_FAILED,
  <constants_placeholder>_DISMISS_RESPONSE,
  <constants_placeholder>_DISMISS_ERROR,
} from './constants';
import axiosPlaceholder from 'axiosPlaceholder';
import { mockRequest, enableMockApi } from 'utilsPlaceholder';
import <mock_entity_placeholder> from '<mock_entity_placeholder>';

export const <file_name_placeholder> = (
  args = {
    
  },
) => dispatch => {
  dispatch({
    type: <constants_placeholder>_BEGIN,
  });

  return new Promise((resolve, reject) => {
    let doRequest = axiosPlaceholder.<method_placeholder>(`pathPlaceholder`);

    // test
    if (enableMockApi) {
      doRequest = mockRequest(200, <mock_entity_placeholder>, 100);
    }
    // end test

    doRequest.then(
      res => {
        dispatch({
          type: <constants_placeholder>_SUCCESS,
          response: res,
        });
        resolve(res);
      },
      err => {
        dispatch({
          type: <constants_placeholder>_FAILED,
          error: err,
        });
        reject(err);
      },
    );
  });
};

export const dismissGetFeatureResponse = () => dispatch =>
  dispatch({
    type: <constants_placeholder>_DISMISS_RESPONSE,
  });

export const dismissGetFeatureError = () => dispatch =>
  dispatch({
    type: <constants_placeholder>_DISMISS_ERROR,
  });

export const reducer = (state, action) => {
  switch (action.type) {
    case <constants_placeholder>_BEGIN:
      return {
        ...state,
        <entity_placeholder>: null,
        <file_name_placeholder>Pending: true,
        <file_name_placeholder>Response: null,
        <file_name_placeholder>Error: null,
      };
    case <constants_placeholder>_SUCCESS:
      return {
        ...state,
        <entity_placeholder>: _.get(action, `response.data`, null),
        <file_name_placeholder>Pending: false,
        <file_name_placeholder>Response: action.response,
        <file_name_placeholder>Error: null,
      };
    case <constants_placeholder>_FAILED:
      return {
        ...state,
        <entity_placeholder>: null,
        <file_name_placeholder>Pending: false,
        <file_name_placeholder>Response: null,
        <file_name_placeholder>Error: action.error,
      };
    case <constants_placeholder>_DISMISS_RESPONSE:
      return {
        ...state,
        <file_name_placeholder>Response: null,
      };
    case <constants_placeholder>_DISMISS_ERROR:
      return {
        ...state,
        <file_name_placeholder>Error: null,
      };
    default:
      return state;
  }
};