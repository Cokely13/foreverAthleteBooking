import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import sessionsReducer  from './allSessionsStore'
import singleSessionReducer from './singleSessionStore'
import usersReducer from './allUsersStore'
import singleUserReducer from './singleUserStore'
import singleResultReducer from './singleResultStore'
import resultsReducer from './allResultsStore'
import auth from './auth'

const reducer = combineReducers({ auth,
allSessions: sessionsReducer,
singleSession: singleSessionReducer,
allUsers: usersReducer,
singleUser: singleUserReducer,
singleResult: singleResultReducer,
allResults: resultsReducer})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
