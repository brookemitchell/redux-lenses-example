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
  changedEntry
});

const initialState = {
  appState: appState["none"],
  error: "",
  works: {},
  editing: {}
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
      const oldItem = state.works[action.changedEntry.id];
      const newItem = action.changedEntry[action.changedEntry.id];

      const mergedEntry = {
        works: {
          ...state.works,
          [action.changedEntry.id]: {
            ...oldItem,
            ...newItem
          }
        }
      };

      return {
        ...state,
        ...mergedEntry
      };
    }
    default:
      return state;
  }
}
