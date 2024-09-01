import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';
import {toast} from 'react-toastify'

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { userSignin: { userInfo } } = getState();
    if (!product._id) {
      const { data } = await axios.post(`${process.env.REACT_APP_LINK}/api/products`, product, {
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      if(data.success){
      toast.success(data.message);}
       else
       toast.error(data.message);
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(`${process.env.REACT_APP_LINK}/api/products/${product._id}`, product, {
        headers: {
          'Authorization': 'Bearer ' + userInfo.token
        }
      });
      if(data.success)
        toast.success(data.message);
         else
         toast.error(data.message)
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }

  } catch (error) {
    
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
}

const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${process.env.REACT_APP_LINK}/api/products?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${ sortOrder}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(
      `${process.env.REACT_APP_LINK}/api/products/${productId}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete(`${process.env.REACT_APP_LINK}/api/products/${productId}` , {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    if(data.success)
      toast.success(data.message);
       else
       toast.error(data.message)
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });

  }
}


const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `${process.env.REACT_APP_LINK}/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    if(data.success)
    toast.success(data.message);
     else
     toast.error(data.message);
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
}

export { listProducts, detailsProduct, saveProduct, deleteProduct ,  saveProductReview,}
