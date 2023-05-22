import Axios from "axios";

const SET_SESSIONS ="SET_SESSIONS"
const CREATE_SESSION = "CREATE_SESSION"
const DELETE_SESSION = "DELETE_SESSION"


export const setSessions = (sessions) =>{
  return{
    type: SET_SESSIONS,
    sessions
  }
};

const _createSession = (session) => {
  return {
    type: CREATE_SESSION,
    session,
  };
};

const _deleteSession = (session) => {
  return {
    type: DELETE_SESSION,
    session
  };
};

export const fetchSessions = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/sessions");
        dispatch(setSessions(data));
  };
};

export const createSession = (session, history) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/sessions", session);
    dispatch(_createSession(created));
    // history.push("/sessions");
  };
};

export const deleteSession = (id, history) => {
  return async (dispatch) => {
    const { data: session } = await Axios.delete(`/api/sessions/${id}`);
    dispatch(_deleteSession(session));
    // history.push("/sessions");
  };
};


const initialState = [];
export default function sessionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SESSIONS:
      return action.sessions;
      case CREATE_SESSION:
        return [...state, action.session];
        case DELETE_SESSION:
      return state.filter((session) => session.id !== action.session.id)
      ;
      default:
        return state;
    }
  }
