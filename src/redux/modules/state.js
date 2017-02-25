const SET_STATE = "SET_STATE";
const GET_WORKS = "GET_WORKS";

const appState = {
  loading: "loading",
  error: "error",
  info: "info",
  none: "none"
};

export const getWorks = () => ({
  type: GET_WORKS,
});

const initialState = { appState: appState["none"] };

export default function works(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return {...state, appState: action.state};

    case GET_WORKS:
        return {
        ...state,
        appState: appState['loading']
      };

    default:
      return state;
  }
}
