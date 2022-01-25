import axios from 'axios';
import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  UPLOAD_PROJECT_FAILURE,
  UPLOAD_PROJECT_IMAGE_FAILURE,
  UPLOAD_PROJECT_IMAGE_REQUEST,
  UPLOAD_PROJECT_IMAGE_SUCCESS, UPLOAD_PROJECT_REQUEST, UPLOAD_PROJECT_SUCCESS,
  UPLOAD_PROJECT_THUMB_IMAGE_FAILURE,
  UPLOAD_PROJECT_THUMB_IMAGE_REQUEST,
  UPLOAD_PROJECT_THUMB_IMAGE_SUCCESS
} from "../reducers/project";

function uploadProjectImageAPI(data){
  return axios.post('project/upload/image',data)
}

function* uploadProjectImage(action){
  try{
    const result = yield call(uploadProjectImageAPI,action.data);
    yield put({
      type:UPLOAD_PROJECT_IMAGE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPLOAD_PROJECT_IMAGE_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function uploadProjectThumbImageAPI(data){
  return axios.post('project/upload/image',data)
}

function* uploadProjectThumbImage(action){
  try{
    const result = yield call(uploadProjectThumbImageAPI,action.data);
    yield put({
      type:UPLOAD_PROJECT_THUMB_IMAGE_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPLOAD_PROJECT_THUMB_IMAGE_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function uploadProjectAPI(data){
  return axios.post('project/upload',data)
}

function* uploadProject(action){
  try{
    const result = yield call(uploadProjectAPI,action.data);
    yield put({
      type:UPLOAD_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPLOAD_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}


function* watchUploadProjectImage() {
  yield takeLatest(UPLOAD_PROJECT_IMAGE_REQUEST, uploadProjectImage);
}

function* watchUploadProjectThumbImage() {
  yield takeLatest(UPLOAD_PROJECT_THUMB_IMAGE_REQUEST, uploadProjectThumbImage);
}

function* watchUploadProject() {
  yield takeLatest(UPLOAD_PROJECT_REQUEST, uploadProject);
}


export default function* projectSaga() {
  yield all([
    fork(watchUploadProjectImage),
    fork(watchUploadProjectThumbImage),
    fork(watchUploadProject),
  ])
}
