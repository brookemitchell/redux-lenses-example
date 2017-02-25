import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
// import Api from './api'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const works = yield call(axios.get, 'http://localhost:9000/works');
    console.log(works);
    yield put({type: "WORKS_FETCH_SUCCEEDED", works: works.data});
  } catch (e) {
    yield put({type: "WORKS_FETCH_FAILED", message: e.message});
  }
}

function* mySaga() {
  yield takeLatest("GET_WORKS", fetchUser);
}

export default mySaga;
