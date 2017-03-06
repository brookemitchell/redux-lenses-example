import R from "ramda";
export const GET_WORKS = "GET_WORKS";
export const WORKS_FETCH_SUCCEEDED = "WORKS_FETCH_SUCCEEDED";
export const WORKS_FETCH_FAILED = "WORKS_FETCH_FAILED";
const SET_EDITING = "SET_EDITING";
const SET_TEXT = "SET_TEXT";

const appState = {
  loading: "loading",
  error: "error",
  info: "info",
  none: "none"
};

export const getWorks = () => ({
  type: GET_WORKS
});

export const setEditing = editing => ({
  type: SET_EDITING,
  editing
});

export const setText = changedEntry => ({
  type: SET_TEXT,
  ...changedEntry,
});

// Lenses
export const errorLens = R.lensProp('error')
export const editingLens = R.lensProp('editing')
export const worksLens = R.lensProp("works");

const initialState = {
  appState: appState["none"],
  error: "",
  works: {},
  editing: []
};

export default function works(state = initialState, action) {

  const isType = R.compose(R.always, R.equals(action.type))

  const getWorks = R.when(
    isType(GET_WORKS),
    R.merge(R.__, {
      appState: "loading"
    }))

  const worksFetchFailed = R.when(
    isType(WORKS_FETCH_FAILED),
    R.merge(R.__, {
      appState: "error",
      error: action.message
    }))

  const worksFetchSucceeded = R.when(
    isType(WORKS_FETCH_SUCCEEDED),
    R.merge(R.__, {
      appState: "info",
      works: action.works
    }))

  const setEditing = R.when(
    isType(SET_EDITING),
    R.merge(R.__, {
      editing: action.editing
    }))

  const setText = R.when(
    isType(SET_TEXT),
    state => {
      const { id, key, value } = action
      const worksItemLens = R.compose(worksLens, R.lensPath([id, key]));
      return R.set(worksItemLens, value, state);
    }
  )

  const stateChanges = R.compose(
    getWorks,
    worksFetchFailed,
    worksFetchSucceeded,
    setEditing,
    setText,
  )

  return stateChanges(state)

}
