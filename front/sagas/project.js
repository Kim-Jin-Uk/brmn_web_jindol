import axios from 'axios';
import {
  all, call, fork, put, takeLatest,throttle
} from 'redux-saga/effects';
import {
  ADD_VIEW_COUNT_FAILURE,
  ADD_VIEW_COUNT_REQUEST,
  ADD_VIEW_COUNT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  LOAD_ALL_PROJECT_FAILURE,
  LOAD_ALL_PROJECT_REQUEST,
  LOAD_ALL_PROJECT_SUCCESS, LOAD_DESIGN_PROJECT_FAILURE,
  LOAD_DESIGN_PROJECT_REQUEST, LOAD_DESIGN_PROJECT_SUCCESS, LOAD_EDIT_PROJECT_FAILURE,
  LOAD_EDIT_PROJECT_REQUEST, LOAD_EDIT_PROJECT_SUCCESS, LOAD_ETC_PROJECT_FAILURE,
  LOAD_ETC_PROJECT_REQUEST, LOAD_ETC_PROJECT_SUCCESS, LOAD_PLAN_PROJECT_FAILURE,
  LOAD_PLAN_PROJECT_REQUEST, LOAD_PLAN_PROJECT_SUCCESS,
  LOAD_PROJECT_DETAIL_FAILURE,
  LOAD_PROJECT_DETAIL_REQUEST,
  LOAD_PROJECT_DETAIL_SUCCESS,
  LOAD_PROJECT_FAILURE,
  LOAD_PROJECT_REQUEST,
  LOAD_PROJECT_SUCCESS, LOAD_SOUND_PROJECT_FAILURE,
  LOAD_SOUND_PROJECT_REQUEST, LOAD_SOUND_PROJECT_SUCCESS,
  LOAD_VOCAL_PROJECT_FAILURE,
  LOAD_VOCAL_PROJECT_REQUEST,
  LOAD_VOCAL_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
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
  return axios.post('project/upload/image/thumb',data)
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

function loadAllProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadAllProject(action){
  try{
    const result = yield call(loadAllProjectAPI,action.data);
    yield put({
      type:LOAD_ALL_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_ALL_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function loadVocalProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadVocalProject(action){
  try{
    const result = yield call(loadVocalProjectAPI,action.data);
    yield put({
      type:LOAD_VOCAL_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_VOCAL_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function loadEditProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadEditProject(action){
  try{
    const result = yield call(loadEditProjectAPI,action.data);
    yield put({
      type:LOAD_EDIT_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_EDIT_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function loadSoundProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadSoundProject(action){
  try{
    const result = yield call(loadSoundProjectAPI,action.data);
    yield put({
      type:LOAD_SOUND_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_SOUND_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function loadPlanProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadPlanProject(action){
  try{
    const result = yield call(loadPlanProjectAPI,action.data);
    yield put({
      type:LOAD_PLAN_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_PLAN_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function loadDesignProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadDesignProject(action){
  try{
    const result = yield call(loadDesignProjectAPI,action.data);
    yield put({
      type:LOAD_DESIGN_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_DESIGN_PROJECT_FAILURE,
      data:err.response.data
    })
    console.error(err)
  }
}

function loadEtcProjectAPI(data){
  return axios.post('project/load',data)
}

function* loadEtcProject(action){
  try{
    const result = yield call(loadEtcProjectAPI,action.data);
    yield put({
      type:LOAD_ETC_PROJECT_SUCCESS,
      data: result.data
    })
  }catch (err){
    yield put({
      type:LOAD_ETC_PROJECT_FAILURE,
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
  yield throttle(2000,LOAD_PROJECT_REQUEST, loadProject);
}

function* watchLoadAllProject() {
  yield throttle(2000,LOAD_ALL_PROJECT_REQUEST, loadAllProject);
}

function* watchLoadVocalProject() {
  yield throttle(2000,LOAD_VOCAL_PROJECT_REQUEST, loadVocalProject);
}

function* watchLoadEditProject() {
  yield throttle(2000,LOAD_EDIT_PROJECT_REQUEST, loadEditProject);
}

function* watchLoadSoundProject() {
  yield throttle(2000,LOAD_SOUND_PROJECT_REQUEST, loadSoundProject);
}

function* watchLoadPlanProject() {
  yield throttle(2000,LOAD_PLAN_PROJECT_REQUEST, loadPlanProject);
}

function* watchLoadDesignProject() {
  yield throttle(2000,LOAD_DESIGN_PROJECT_REQUEST, loadDesignProject);
}

function* watchLoadEtcProject() {
  yield throttle(2000,LOAD_ETC_PROJECT_REQUEST, loadEtcProject);
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
    fork(watchLoadAllProject),
    fork(watchLoadVocalProject),
    fork(watchLoadEditProject),
    fork(watchLoadSoundProject),
    fork(watchLoadPlanProject),
    fork(watchLoadDesignProject),
    fork(watchLoadEtcProject),
    fork(watchLoadProjectDetail),
    fork(watchAddViewCount),
    fork(watchDeleteProject),
    fork(watchUpdateProject),
  ])
}
