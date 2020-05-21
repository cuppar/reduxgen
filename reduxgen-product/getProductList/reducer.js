import _ from 'lodash';
import {
  GET_PRODUCT_LIST_BEGIN,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILED,
  GET_PRODUCT_LIST_DISMISS_RESPONSE,
  GET_PRODUCT_LIST_DISMISS_ERROR,
} from './constants';
import axiosPlaceholder from 'axiosPlaceholder';
import { mockRequest, enableMockApi } from 'utilsPlaceholder';
import mockGetProductList from 'mockGetProductList';

export const getProductList = (
  args = {
    
  },
) => dispatch => {
  dispatch({
    type: GET_PRODUCT_LIST_BEGIN,
  });

  return new Promise((resolve, reject) => {
    let doRequest = axiosPlaceholder.get(`apiPathPlaceholder`);

    // test
    if (enableMockApi) {
      doRequest = mockRequest(200, mockGetProductList, 100);
    }
    // end test

    doRequest.then(
      res => {
        dispatch({
          type: GET_PRODUCT_LIST_SUCCESS,
          response: res,
        });
        resolve(res);
      },
      err => {
        dispatch({
          type: GET_PRODUCT_LIST_FAILED,
          error: err,
        });
        reject(err);
      },
    );
  });
};

export const dismissGetProductListResponse = () => dispatch =>
  dispatch({
    type: GET_PRODUCT_LIST_DISMISS_RESPONSE,
  });

export const dismissGetProductListError = () => dispatch =>
  dispatch({
    type: GET_PRODUCT_LIST_DISMISS_ERROR,
  });

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_BEGIN:
      return {
        ...state,
        productList: null,
        getProductListPending: true,
        getProductListResponse: null,
        getProductListError: null,
      };
    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: _.get(action, `response.data`, null),
        getProductListPending: false,
        getProductListResponse: action.response,
        getProductListError: null,
      };
    case GET_PRODUCT_LIST_FAILED:
      return {
        ...state,
        productList: null,
        getProductListPending: false,
        getProductListResponse: null,
        getProductListError: action.error,
      };
    case GET_PRODUCT_LIST_DISMISS_RESPONSE:
      return {
        ...state,
        getProductListResponse: null,
      };
    case GET_PRODUCT_LIST_DISMISS_ERROR:
      return {
        ...state,
        getProductListError: null,
      };
    default:
      return state;
  }
};