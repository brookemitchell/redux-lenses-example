export const GET_WORKS = "GET_WORKS";
export const WORKS_FETCH_SUCCEEDED = "WORKS_FETCH_SUCCEEDED"
export const WORKS_FETCH_FAILED = "WORKS_FETCH_FAILED"

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

    case GET_WORKS:
        return {
        ...state,
        appState: appState['loading']
      };

    default:
      return state;
  }
}
