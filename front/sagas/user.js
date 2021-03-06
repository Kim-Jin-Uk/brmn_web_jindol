import {
  all, fork, put, takeLatest, call, delay
} from 'redux-saga/effects';
import axios from 'axios';
import {
  CHECK_AGREEMENT_FAILURE,
  CHECK_AGREEMENT_REQUEST,
  CHECK_AGREEMENT_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS, FREQUENCY_FAILURE, FREQUENCY_REQUEST, FREQUENCY_SUCCESS,
  GET_MY_PROFILE_DETAIL_FAILURE,
  GET_MY_PROFILE_DETAIL_REQUEST,
  GET_MY_PROFILE_DETAIL_SUCCESS,
  GET_MY_PROFILE_FAILURE,
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_OTHER_PROFILE_DETAIL_FAILURE,
  GET_OTHER_PROFILE_DETAIL_REQUEST,
  GET_OTHER_PROFILE_DETAIL_SUCCESS,
  GET_OTHER_PROFILE_FAILURE,
  GET_OTHER_PROFILE_REQUEST,
  GET_OTHER_PROFILE_SUCCESS,
  GET_OTHER_USER_FAILURE,
  GET_OTHER_USER_REQUEST,
  GET_OTHER_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS, NOTICE_FAILURE, NOTICE_REQUEST, NOTICE_SUCCESS, QUESTION_FAILURE,
  QUESTION_REQUEST, QUESTION_SUCCESS, REPORT_FAILURE,
  REPORT_REQUEST,
  REPORT_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UPDATE_AGREEMENT_FAILURE,
  UPDATE_AGREEMENT_REQUEST,
  UPDATE_AGREEMENT_SUCCESS,
  UPDATE_MY_PROFILE_FAILURE,
  UPDATE_MY_PROFILE_REQUEST,
  UPDATE_MY_PROFILE_SUCCESS,
  UPDATE_PROFILE_IMAGE_DEFAULT_FAILURE,
  UPDATE_PROFILE_IMAGE_DEFAULT_REQUEST,
  UPDATE_PROFILE_IMAGE_DEFAULT_SUCCESS,
  UPDATE_PROFILE_IMAGE_FAILURE,
  UPDATE_PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS
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

function checkAgreementAPI(){
  return axios.get('user/agreement')
}

function* checkAgreement(){
  try{
    const result = yield call(checkAgreementAPI);
    yield put({
      type:CHECK_AGREEMENT_SUCCESS,
      data:result.data
    })
  }catch (err){
    yield put({
      type:CHECK_AGREEMENT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function updateAgreementAPI(data){
  return axios.post('user/agreement',data)
}

function* updateAgreement(action){
  try{
    const result = yield call(updateAgreementAPI,action.data);
    yield put({
      type:UPDATE_AGREEMENT_SUCCESS,
      data:result.data
    })
  }catch (err){
    yield put({
      type:UPDATE_AGREEMENT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function logOutAPI(){
  return axios.post('user/logout')
}

function* logOut(){
  try{
    const result = yield call(logOutAPI);
    yield put({
      type:LOG_OUT_SUCCESS,
      data:result.data
    })
  }catch (err){
    yield put({
      type:LOG_OUT_FAILURE,
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

function getOtherUserAPI(data){
  return axios.post('user/',{id:data})
}

function* getOtherUser(action){
  try{
    const result = yield call(getOtherUserAPI,action.data);
    yield put({
      type:GET_OTHER_USER_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:GET_OTHER_USER_FAILURE,
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

function updateProfileImageDefaultAPI(data){
  return axios.post('user/update/profile/default',data)
}

function* updateProfileImageDefault(action){
  try{
    const result = yield call(updateProfileImageDefaultAPI,action.data);
    yield put({
      type:UPDATE_PROFILE_IMAGE_DEFAULT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPDATE_PROFILE_IMAGE_DEFAULT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function uploadProfileImageAPI(data){
  return axios.post('user/upload/profile/image',data)
}

function* uploadProfileImage(action){
  try{
    const result = yield call(uploadProfileImageAPI,action.data);
    yield put({
      type:UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPLOAD_PROFILE_IMAGE_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function updateProfileImageAPI(data){
  return axios.post('user/update/profile/image',data)
}

function* updateProfileImage(action){
  try{
    const result = yield call(updateProfileImageAPI,action.data);
    yield put({
      type:UPDATE_PROFILE_IMAGE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPDATE_PROFILE_IMAGE_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function followingAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* following(action) {
  try {
    const result = yield call(followingAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FOLLOW_FAILURE,
      error: e.response.data,
    });
  }
}

function unfollowingAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollowing(action) {
  try {
    const result = yield call(unfollowingAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: e.response.data,
    });
  }
}

function reportAPI(data) {
  return axios.post("/user/report",data);
}

function* report(action) {
  try {
    const result = yield call(reportAPI, action.data);
    yield put({
      type: REPORT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REPORT_FAILURE,
      error: e.response.data,
    });
  }
}

function questionAPI(data) {
  return axios.post("/user/question",data);
}

function* question(action) {
  try {
    const result = yield call(questionAPI, action.data);
    yield put({
      type: QUESTION_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: QUESTION_FAILURE,
      error: e.response.data,
    });
  }
}

function noticeAPI() {
  return axios.post("/user/notice");
}

function* notice() {
  try {
    const result = yield call(noticeAPI);
    yield put({
      type: NOTICE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: NOTICE_FAILURE,
      error: e.response.data,
    });
  }
}

function frequencyAPI() {
  return axios.post("/user/frequency");
}

function* frequency() {
  try {
    const result = yield call(frequencyAPI);
    yield put({
      type: FREQUENCY_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FREQUENCY_FAILURE,
      error: e.response.data,
    });
  }
}



function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchCheckAgreement() {
  yield takeLatest(CHECK_AGREEMENT_REQUEST, checkAgreement);
}

function* watchUpdateAgreement() {
  yield takeLatest(UPDATE_AGREEMENT_REQUEST, updateAgreement);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchGetMyProfile() {
  yield takeLatest(GET_MY_PROFILE_REQUEST, getMyProfile);
}

function* watchGetMyProfileDetail() {
  yield takeLatest(GET_MY_PROFILE_DETAIL_REQUEST, getMyProfileDetail);
}

function* watchGetOtherUser() {
  yield takeLatest(GET_OTHER_USER_REQUEST, getOtherUser);
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

function* watchUpdateProfileImageDefault() {
  yield takeLatest(UPDATE_PROFILE_IMAGE_DEFAULT_REQUEST, updateProfileImageDefault);
}

function* watchUploadProfileImage() {
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage);
}

function* watchUpdateProfileImage() {
  yield takeLatest(UPDATE_PROFILE_IMAGE_REQUEST, updateProfileImage);
}

function* watchFollowing() {
  yield takeLatest(FOLLOW_REQUEST, following);
}

function* watchUnfollowing() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollowing);
}

function* watchReport() {
  yield takeLatest(REPORT_REQUEST, report);
}

function* watchQuestion() {
  yield takeLatest(QUESTION_REQUEST, question);
}

function* watchNotice() {
  yield takeLatest(NOTICE_REQUEST, notice);
}

function* watchFrequency() {
  yield takeLatest(FREQUENCY_REQUEST, frequency);
}


export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchCheckAgreement),
    fork(watchUpdateAgreement),
    fork(watchLogOut),
    fork(watchGetMyProfile),
    fork(watchGetMyProfileDetail),
    fork(watchGetOtherUser),
    fork(watchGetOtherProfile),
    fork(watchGetOtherProfileDetail),
    fork(watchUpdateMyProfile),
    fork(watchUpdateProfileImageDefault),
    fork(watchUploadProfileImage),
    fork(watchUpdateProfileImage),
    fork(watchFollowing),
    fork(watchUnfollowing),
    fork(watchReport),
    fork(watchQuestion),
    fork(watchNotice),
    fork(watchFrequency),
  ])
}
