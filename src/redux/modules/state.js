import R from "ramda";
import createSelector from "ramda-reselect";
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

// Selectors
const works$ = state => state.works.works;
const editing = state => state.works.editing;
const editing$ = R.compose(R.propOr([], 0), R.toPairs, editing);
const editingFn = R.compose(R.propOr([], 0), R.toPairs);

export const errorLens = R.lensProp('error')
export const editingLens = R.lensProp('editing')
export const worksLens = R.lensProp("works");

export const stateToProps$ = createSelector(works$, editing$, (
  works,
  editing
) => ({ works, editing }));


const initialState = {
  appState: appState["none"],
  error: "",
  works: {},
  editing: []
};

export default function works(state = initialState, action) {
  switch (action.type) {
    case GET_WORKS:
      return {
        ...state,
        appState: appState["loading"]
      };

    case WORKS_FETCH_FAILED: {
      return {
        ...state,
        appState: appState["error"],
        error: action.message
      };
    }

    case WORKS_FETCH_SUCCEEDED: {
      return {
        ...state,
        appState: appState["info"],
        error: "",
        works: action.works
      };
    }

    case SET_EDITING: {
      return {
        ...state,
        editing: action.editing
      };
    }
    case SET_TEXT: {
      const { id, key, value } = action
      const worksItemLens = R.compose(worksLens, R.lensPath([id, key]));
      return R.set(worksItemLens, value, state);
    }
    default:
      return state;
  }
}
