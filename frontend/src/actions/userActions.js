import axios from 'axios';
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../constants/userConstants';
import { toast } from 'react-toastify';
import { message } from 'antd';

const update =
  ({ userId, name, email, password }) =>
  async (dispatch, getState) => {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({
      type: USER_UPDATE_REQUEST,
      payload: { userId, name, email, password },
    });
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_LINK}/api/users/${userId}`,
        { name, email, password },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      if (data.success) toast.success(data.message);
      else toast.error(data.message);
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
  };

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_LINK}/api/users/signin`,
      { email, password }
    );
    if (data.success) {toast.success(data.message);}
   
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message });
  }
};

const register = (name, email, password, rePassword) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { name, email, password, rePassword },
  });
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_LINK}/api/users/register`,
      { name, email, password, rePassword }
    );
    if (data.success) toast.success(data.message);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    toast.error(error.response.data.message)
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message});
  }
};

const logout = () => (dispatch) => {
  Cookie.remove('userInfo');
  dispatch({ type: USER_LOGOUT });
};
export { signin, register, logout, update };
