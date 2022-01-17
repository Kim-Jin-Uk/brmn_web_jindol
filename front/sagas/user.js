import {
  all, fork, put, takeLatest, call, delay
} from 'redux-saga/effects';
import axios from 'axios';
import {LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS} from "../reducers/user";


function logInAPI(data){
  return axios.post('login',data)
}

function* logIn(action){
  try{
    yield delay(1000)
    yield put({
      type:LOG_IN_SUCCESS,
      data:action.data
    })
  }catch (err){
    yield put({
      type:LOG_IN_FAILURE,
      data:err.response.data
    })
  }
}


function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
  ])
}
