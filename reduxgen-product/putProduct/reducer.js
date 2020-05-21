import _ from 'lodash';
import {
  PUT_PRODUCT_BEGIN,
  PUT_PRODUCT_SUCCESS,
  PUT_PRODUCT_FAILED,
  PUT_PRODUCT_DISMISS_RESPONSE,
  PUT_PRODUCT_DISMISS_ERROR,
} from './constants';
import axiosPlaceholder from 'axiosPlaceholder';
import { mockSuccessRequest, mockFailureRequest, enableMockApi } from 'utilsPlaceholder';

export const putProduct = (
  args = {
    
  },
) => dispatch => {
  dispatch({
    type: PUT_PRODUCT_BEGIN,
  });

  return new Promise((resolve, reject) => {
    let doRequest = axiosPlaceholder.put(`apiPathPlaceholder`);

    // test
    if (enableMockApi) {
      doRequest = mockSuccessRequest(
        {
          status: 200,
          data: {
            
          },
        },
        100,
      );

      // doRequest = mockFailureRequest(
      //   {
      //     status: 500,
      //     data: {
      //       code: 500,
      //       message: 'error message',
      //     },
      //   },
      //   100,
      // );
    }
    // end test

    doRequest.then(
      res => {
        dispatch({
          type: PUT_PRODUCT_SUCCESS,
          response: res,
        });
        resolve(res);
      },
      err => {
        dispatch({
          type: PUT_PRODUCT_FAILED,
          error: err,
        });
        reject(err);
      },
    );
  });
};

export const dismissPutProductResponse = () => dispatch =>
  dispatch({
    type: PUT_PRODUCT_DISMISS_RESPONSE,
  });

export const dismissPutProductError = () => dispatch =>
  dispatch({
    type: PUT_PRODUCT_DISMISS_ERROR,
  });

export const reducer = (state, action) => {
  switch (action.type) {
    case PUT_PRODUCT_BEGIN:
      return {
        ...state,
        putProductPending: true,
        putProductResponse: null,
        putProductError: null,
      };
    case PUT_PRODUCT_SUCCESS:
      return {
        ...state,
        putProductPending: false,
        putProductResponse: action.response,
        putProductError: null,
      };
    case PUT_PRODUCT_FAILED:
      return {
        ...state,
        putProductPending: false,
        putProductResponse: null,
        putProductError: action.error,
      };
    case PUT_PRODUCT_DISMISS_RESPONSE:
      return {
        ...state,
        putProductResponse: null,
      };
    case PUT_PRODUCT_DISMISS_ERROR:
      return {
        ...state,
        putProductError: null,
      };
    default:
      return state;
  }
};