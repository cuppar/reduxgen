import _ from 'lodash';
import {
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  DELETE_PRODUCT_DISMISS_RESPONSE,
  DELETE_PRODUCT_DISMISS_ERROR,
} from './constants';
import axiosPlaceholder from 'axiosPlaceholder';
import { mockSuccessRequest, mockFailureRequest, enableMockApi } from 'utilsPlaceholder';

export const deleteProduct = (
  args = {
    
  },
) => dispatch => {
  dispatch({
    type: DELETE_PRODUCT_BEGIN,
  });

  return new Promise((resolve, reject) => {
    let doRequest = axiosPlaceholder.delete(`apiPathPlaceholder`);

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
          type: DELETE_PRODUCT_SUCCESS,
          response: res,
        });
        resolve(res);
      },
      err => {
        dispatch({
          type: DELETE_PRODUCT_FAILED,
          error: err,
        });
        reject(err);
      },
    );
  });
};

export const dismissDeleteProductResponse = () => dispatch =>
  dispatch({
    type: DELETE_PRODUCT_DISMISS_RESPONSE,
  });

export const dismissDeleteProductError = () => dispatch =>
  dispatch({
    type: DELETE_PRODUCT_DISMISS_ERROR,
  });

export const reducer = (state, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_BEGIN:
      return {
        ...state,
        deleteProductPending: true,
        deleteProductResponse: null,
        deleteProductError: null,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteProductPending: false,
        deleteProductResponse: action.response,
        deleteProductError: null,
      };
    case DELETE_PRODUCT_FAILED:
      return {
        ...state,
        deleteProductPending: false,
        deleteProductResponse: null,
        deleteProductError: action.error,
      };
    case DELETE_PRODUCT_DISMISS_RESPONSE:
      return {
        ...state,
        deleteProductResponse: null,
      };
    case DELETE_PRODUCT_DISMISS_ERROR:
      return {
        ...state,
        deleteProductError: null,
      };
    default:
      return state;
  }
};