import {
  all, fork, put, takeLatest, call, delay
} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_MY_PROFILE_DETAIL_FAILURE,
  GET_MY_PROFILE_DETAIL_REQUEST,
  GET_MY_PROFILE_DETAIL_SUCCESS,
  GET_MY_PROFILE_FAILURE,
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_OTHER_PROFILE_DETAIL_FAILURE,
  GET_OTHER_PROFILE_DETAIL_REQUEST,
  GET_OTHER_PROFILE_DETAIL_SUCCESS, GET_OTHER_PROFILE_FAILURE,
  GET_OTHER_PROFILE_REQUEST, GET_OTHER_PROFILE_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  UPDATE_MY_PROFILE_FAILURE,
  UPDATE_MY_PROFILE_REQUEST,
  UPDATE_MY_PROFILE_SUCCESS
} from "../reducers/user";


function logInAPI(){
  return axios.get('user/login')
}

function* logIn(){
  try{
    const result = yield call(logInAPI);
    yield put({
      type:LOG_IN_SUCCESS,
      data:result.data
    })
  }catch (err){
    yield put({
      type:LOG_IN_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}


function getMyProfileAPI(data){
  return axios.post('user/profile',{id:data})
}

function* getMyProfile(action){
  try{
    const result = yield call(getMyProfileAPI,action.data);
    yield put({
      type:GET_MY_PROFILE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:GET_MY_PROFILE_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function getMyProfileDetailAPI(data){
  return axios.post('user/profile/detail',{id:data})
}

function* getMyProfileDetail(action){
  try{
    const result = yield call(getMyProfileDetailAPI,action.data);
    yield put({
      type:GET_MY_PROFILE_DETAIL_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:GET_MY_PROFILE_DETAIL_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function getOtherProfileAPI(data){
  return axios.post('user/profile',{id:data})
}

function* getOtherProfile(action){
  try{
    const result = yield call(getOtherProfileAPI,action.data);
    yield put({
      type:GET_OTHER_PROFILE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:GET_OTHER_PROFILE_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function getOtherProfileDetailAPI(data){
  return axios.post('user/profile/detail',{id:data})
}

function* getOtherProfileDetail(action){
  try{
    const result = yield call(getOtherProfileDetailAPI,action.data);
    yield put({
      type:GET_OTHER_PROFILE_DETAIL_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:GET_OTHER_PROFILE_DETAIL_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function updateMyProfileAPI(data){
  return axios.post('user/update/myprofile',data)
}

function* updateMyProfile(action){
  try{
    const result = yield call(updateMyProfileAPI,action.data);
    yield put({
      type:UPDATE_MY_PROFILE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPDATE_MY_PROFILE_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchGetMyProfile() {
  yield takeLatest(GET_MY_PROFILE_REQUEST, getMyProfile);
}

function* watchGetMyProfileDetail() {
  yield takeLatest(GET_MY_PROFILE_DETAIL_REQUEST, getMyProfileDetail);
}

function* watchGetOtherProfile() {
  yield takeLatest(GET_OTHER_PROFILE_REQUEST, getOtherProfile);
}

function* watchGetOtherProfileDetail() {
  yield takeLatest(GET_OTHER_PROFILE_DETAIL_REQUEST, getOtherProfileDetail);
}

function* watchUpdateMyProfile() {
  yield takeLatest(UPDATE_MY_PROFILE_REQUEST, updateMyProfile);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchGetMyProfile),
    fork(watchGetMyProfileDetail),
    fork(watchGetOtherProfile),
    fork(watchGetOtherProfileDetail),
    fork(watchUpdateMyProfile),
  ])
}
