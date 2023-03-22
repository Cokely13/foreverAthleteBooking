import axios from "axios";

// Action Types
const SET_SINGLE_SESSION = "SET_SINGLE_SESSION";
const UPDATE_SINGLE_SESSION = "UPDATE_SINGLE_SESSION";
const TOKEN = "token";

// Action creators
export const _setSingleSession= (sessiondata) => {
  return {
    type: SET_SINGLE_SESSION,
    sessiondata,
  };
};

const _updateSingleSession = (sessiondata) => {
  return {
    type: UPDATE_SINGLE_SESSION,
    sessiondata,
  };
};

//Thunks
export const fetchSession = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/sessions/${id}`);
    dispatch(_setSingleSession(data));
  };
};

export const updateSingleSession = (session, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/sessions/${session.id}`, session);
        const { data: sessionData } = await axios.get(`/api/sessions/${session.id}`);
        dispatch(_updateSingleSession(sessionData));
        history.push(`/sessions/${session.id}`)
      }
     catch (error) {
      console.log("SESSION", session)
    }
  };
};

// reducer
const initialState = [];
const singleSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_SESSION:
      return action.sessiondata;
    case UPDATE_SINGLE_SESSION:
      return action.sessiondata;
    default:
      return state;
  }
};

export default singleSessionReducer;
