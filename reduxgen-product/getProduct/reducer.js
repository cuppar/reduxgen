import _ from 'lodash';
import {
  GET_PRODUCT_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_DISMISS_RESPONSE,
  GET_PRODUCT_DISMISS_ERROR,
} from './constants';
import axiosPlaceholder from 'axiosPlaceholder';
import { mockRequest, enableMockApi } from 'utilsPlaceholder';
import mockGetProduct from 'mockGetProduct';

export const getProduct = (
  args = {
    
  },
) => dispatch => {
  dispatch({
    type: GET_PRODUCT_BEGIN,
  });

  return new Promise((resolve, reject) => {
    let doRequest = axiosPlaceholder.get(`apiPathPlaceholder`);

    // test
    if (enableMockApi) {
      doRequest = mockRequest(200, mockGetProduct, 100);
    }
    // end test

    doRequest.then(
      res => {
        dispatch({
          type: GET_PRODUCT_SUCCESS,
          response: res,
        });
        resolve(res);
      },
      err => {
        dispatch({
          type: GET_PRODUCT_FAILED,
          error: err,
        });
        reject(err);
      },
    );
  });
};

export const dismissGetProductResponse = () => dispatch =>
  dispatch({
    type: GET_PRODUCT_DISMISS_RESPONSE,
  });

export const dismissGetProductError = () => dispatch =>
  dispatch({
    type: GET_PRODUCT_DISMISS_ERROR,
  });

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCT_BEGIN:
      return {
        ...state,
        product: null,
        getProductPending: true,
        getProductResponse: null,
        getProductError: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: _.get(action, `response.data`, null),
        getProductPending: false,
        getProductResponse: action.response,
        getProductError: null,
      };
    case GET_PRODUCT_FAILED:
      return {
        ...state,
        product: null,
        getProductPending: false,
        getProductResponse: null,
        getProductError: action.error,
      };
    case GET_PRODUCT_DISMISS_RESPONSE:
      return {
        ...state,
        getProductResponse: null,
      };
    case GET_PRODUCT_DISMISS_ERROR:
      return {
        ...state,
        getProductError: null,
      };
    default:
      return state;
  }
};