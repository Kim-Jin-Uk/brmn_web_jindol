import axios from 'axios';
import {
  all, call, fork, put, takeLatest, throttle,
} from 'redux-saga/effects';
import {LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS} from "../reducers/user";

function logInAPI(data){
  return axios.post('login',data)
}

function* logIn(action){

}


function* watchLogIn() {
  yield takeLatest("test", logIn);
}

export default function* projectSaga() {
  yield all([
    fork(watchLogIn),
  ])
}
