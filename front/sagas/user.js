import {
  all, fork, put, takeLatest, call, delay
} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_MY_PROFILE_FAILURE,
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS
} from "../reducers/user";


function logInAPI(){
  return axios.get('user/login')
}

function* logIn(){
  try{
    const result = yield call(logInAPI);
    console.log(result.data)
    yield put({
      type:LOG_IN_SUCCESS,
      data:result.data
    })
  }catch (err){
    yield put({
      type:LOG_IN_FAILURE,
      data:err.response.data
    })
  }
}


function getMyProfileAPI(data){
  return axios.post('user/myprofile',{id:data})
}

function* getMyProfile(action){
  try{
    const result = yield call(getMyProfileAPI,action.data);
    console.log(result.data)
    yield put({
      type:GET_MY_PROFILE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:GET_MY_PROFILE_FAILURE,
      data:err.response.data
    })
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchGetMyProfile() {
  yield takeLatest(GET_MY_PROFILE_REQUEST, getMyProfile);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchGetMyProfile),
  ])
}
