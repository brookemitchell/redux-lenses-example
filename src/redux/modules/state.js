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

const initialState = {

  appState: appState["none"],
  error: '',
  works: {}

                     };

export default function works(state = initialState, action) {
  switch (action.type) {

    case GET_WORKS:
        return {
        ...state,
        appState: appState['loading']
      };

  case WORKS_FETCH_FAILED : {
    return {
      ...state,
      appState: appState['error'],
      error: action.message

    };
  }

  case WORKS_FETCH_SUCCEEDED : {
    return {
      ...state,
      appState: appState['info'],
      error: '',
      works: action.works,
    };
  }
    default:
      return state;
  }
}
