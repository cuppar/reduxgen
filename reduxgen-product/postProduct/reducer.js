import _ from 'lodash';
import {
  POST_PRODUCT_BEGIN,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAILED,
  POST_PRODUCT_DISMISS_RESPONSE,
  POST_PRODUCT_DISMISS_ERROR,
} from './constants';
import axiosPlaceholder from 'axiosPlaceholder';
import { mockSuccessRequest, mockFailureRequest, enableMockApi } from 'utilsPlaceholder';

export const postProduct = (
  args = {
    
  },
) => dispatch => {
  dispatch({
    type: POST_PRODUCT_BEGIN,
  });

  return new Promise((resolve, reject) => {
    let doRequest = axiosPlaceholder.post(`apiPathPlaceholder`);

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
          type: POST_PRODUCT_SUCCESS,
          response: res,
        });
        resolve(res);
      },
      err => {
        dispatch({
          type: POST_PRODUCT_FAILED,
          error: err,
        });
        reject(err);
      },
    );
  });
};

export const dismissPostProductResponse = () => dispatch =>
  dispatch({
    type: POST_PRODUCT_DISMISS_RESPONSE,
  });

export const dismissPostProductError = () => dispatch =>
  dispatch({
    type: POST_PRODUCT_DISMISS_ERROR,
  });

export const reducer = (state, action) => {
  switch (action.type) {
    case POST_PRODUCT_BEGIN:
      return {
        ...state,
        postProductPending: true,
        postProductResponse: null,
        postProductError: null,
      };
    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        postProductPending: false,
        postProductResponse: action.response,
        postProductError: null,
      };
    case POST_PRODUCT_FAILED:
      return {
        ...state,
        postProductPending: false,
        postProductResponse: null,
        postProductError: action.error,
      };
    case POST_PRODUCT_DISMISS_RESPONSE:
      return {
        ...state,
        postProductResponse: null,
      };
    case POST_PRODUCT_DISMISS_ERROR:
      return {
        ...state,
        postProductError: null,
      };
    default:
      return state;
  }
};