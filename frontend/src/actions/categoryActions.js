import {
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
} from '../constants/categoryConstants';
import axios from 'axios';

const saveCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    const {
      userSignin: { userInfo },
    } = getState();
    
      const { data } = await axios.post(
        `${process.env.REACT_APP_LINK}/api/category/create-category`,
        category,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    
   
    
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};

const updateCategory = (category)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: CATEGORY_UPDATE_REQUEST, payload: category });
        const {
            userSignin: { userInfo },
          } = getState();
        const { data } = await axios.put(
        `${process.env.REACT_APP_LINK}/api/category/update-category/${category._id}`,
        category,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
    }catch(error){
        dispatch({type:CATEGORY_UPDATE_FAIL,payload:error.message})
    }
}

const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const  {data}  = await axios.get(
      `${process.env.REACT_APP_LINK}/api/category/category-list`
    );
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const deleteCategory = (categoryId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_LINK}/api/category/delete-category/${categoryId}`,
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      }
    );
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
  }
};

export { listCategories, deleteCategory, saveCategory ,updateCategory};
