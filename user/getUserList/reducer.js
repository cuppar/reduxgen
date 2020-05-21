import _ from 'lodash';
import {
  GET_USER_LIST_BEGIN,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILED,
  GET_USER_LIST_DISMISS_RESPONSE,
  GET_USER_LIST_DISMISS_ERROR,
} from './constants';
import axiosPlaceholder from 'axiosPlaceholder';
import { mockRequest, enableMockApi } from 'utilsPlaceholder';
import mockGetUserList from 'mockGetUserList';

export const <file_name_placeholder> = (
  args = {
    
  },
) => dispatch => {
  dispatch({
    type: GET_USER_LIST_BEGIN,
  });

  return new Promise((resolve, reject) => {
    let doRequest = axiosPlaceholder.<method_placeholder>(`pathPlaceholder`);

    // test
    if (enableMockApi) {
      doRequest = mockRequest(200, mockGetUserList, 100);
    }
    // end test

    doRequest.then(
      res => {
        dispatch({
          type: GET_USER_LIST_SUCCESS,
          response: res,
        });
        resolve(res);
      },
      err => {
        dispatch({
          type: GET_USER_LIST_FAILED,
          error: err,
        });
        reject(err);
      },
    );
  });
};

export const dismissGetFeatureResponse = () => dispatch =>
  dispatch({
    type: GET_USER_LIST_DISMISS_RESPONSE,
  });

export const dismissGetFeatureError = () => dispatch =>
  dispatch({
    type: GET_USER_LIST_DISMISS_ERROR,
  });

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_USER_LIST_BEGIN:
      return {
        ...state,
        <entity_placeholder>: null,
        <file_name_placeholder>Pending: true,
        <file_name_placeholder>Response: null,
        <file_name_placeholder>Error: null,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        <entity_placeholder>: _.get(action, `response.data`, null),
        <file_name_placeholder>Pending: false,
        <file_name_placeholder>Response: action.response,
        <file_name_placeholder>Error: null,
      };
    case GET_USER_LIST_FAILED:
      return {
        ...state,
        <entity_placeholder>: null,
        <file_name_placeholder>Pending: false,
        <file_name_placeholder>Response: null,
        <file_name_placeholder>Error: action.error,
      };
    case GET_USER_LIST_DISMISS_RESPONSE:
      return {
        ...state,
        <file_name_placeholder>Response: null,
      };
    case GET_USER_LIST_DISMISS_ERROR:
      return {
        ...state,
        <file_name_placeholder>Error: null,
      };
    default:
      return state;
  }
};