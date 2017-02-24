const SET_STATE = "SET_STATE";

const appState = {
  loading: "loading",
  error: "error",
  info: "info",
  none: "none"
};

export const setState = state => ({
  type: SET_STATE,
  state: appState[state]
});

const initialState = { appState: appState["none"] };

export default function works(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
    return {...state, appState: action.appState};

    default:
      return state;
  }
}
