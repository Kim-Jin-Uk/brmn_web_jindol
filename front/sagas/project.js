import axios from 'axios';
import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import {
  ADD_VIEW_COUNT_FAILURE,
  ADD_VIEW_COUNT_REQUEST,
  ADD_VIEW_COUNT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  LOAD_PROJECT_DETAIL_FAILURE,
  LOAD_PROJECT_DETAIL_REQUEST,
  LOAD_PROJECT_DETAIL_SUCCESS,
  LOAD_PROJECT_FAILURE,
  LOAD_PROJECT_REQUEST,
  LOAD_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS,
  UPLOAD_PROJECT_FAILURE,
  UPLOAD_PROJECT_IMAGE_FAILURE,
  UPLOAD_PROJECT_IMAGE_REQUEST,
  UPLOAD_PROJECT_IMAGE_SUCCESS,
  UPLOAD_PROJECT_REQUEST,
  UPLOAD_PROJECT_SUCCESS,
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

function loadProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadProject(action){
  try{
    const result = yield call(loadProjectAPI,action.data);
    yield put({
      type:LOAD_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function loadProjectDetailAPI(data){
  return axios.post('project/load/detail',data)
}

function* loadProjectDetail(action){
  try{
    const result = yield call(loadProjectDetailAPI,action.data);
    yield put({
      type:LOAD_PROJECT_DETAIL_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_PROJECT_DETAIL_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function addViewCountAPI(data){
  return axios.post('project/add/viewcount',data)
}

function* addViewCount(action){
  try{
    const result = yield call(addViewCountAPI,action.data);
    yield put({
      type:ADD_VIEW_COUNT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:ADD_VIEW_COUNT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function deleteProjectAPI(data){
  return axios.post('project/delete',data)
}

function* deleteProject(action){
  try{
    const result = yield call(deleteProjectAPI,action.data);
    yield put({
      type:DELETE_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:DELETE_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function updateProjectAPI(data){
  return axios.post('project/update',data)
}

function* updateProject(action){
  try{
    const result = yield call(updateProjectAPI,action.data);
    yield put({
      type:UPDATE_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:UPDATE_PROJECT_FAILURE,
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

function* watchLoadProject() {
  yield takeLatest(LOAD_PROJECT_REQUEST, loadProject);
}

function* watchLoadProjectDetail() {
  yield takeLatest(LOAD_PROJECT_DETAIL_REQUEST, loadProjectDetail);
}

function* watchAddViewCount() {
  yield takeLatest(ADD_VIEW_COUNT_REQUEST, addViewCount);
}

function* watchDeleteProject() {
  yield takeLatest(DELETE_PROJECT_REQUEST, deleteProject);
}

function* watchUpdateProject() {
  yield takeLatest(UPDATE_PROJECT_REQUEST, updateProject);
}


export default function* projectSaga() {
  yield all([
    fork(watchUploadProjectImage),
    fork(watchUploadProjectThumbImage),
    fork(watchUploadProject),
    fork(watchLoadProject),
    fork(watchLoadProjectDetail),
    fork(watchAddViewCount),
    fork(watchDeleteProject),
    fork(watchUpdateProject),
  ])
}
