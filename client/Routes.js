import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { useSelector} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import Calendar from './components/Calendar';
import BookingCalendar from './components/BookingCalendar';
import MyCalendar from './components/MyCalendar';
import Users from './components/Users';
import AddResult from './components/AddResult';
import Results from './components/Results';
import UserDetail from './components/UserPage';
import Profile from './components/Profile';
import ConfirmSessions from './components/ConfirmSessions';
import Records from './components/Records';
import MySessions from './components/MySessions';
import PendingSessions from './components/PendingSessions';
import {me} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props

    return (
      <div>
        {isLoggedIn ?
        isLoggedIn & isAdmin  ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addresult" component={AddResult} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/clients" component={Users} />
            <Route exact path="/confirm" component={ConfirmSessions} />
            <Route exact path="/clients/:userId" component={UserDetail}/>
            <Route exact path="/booking" component={BookingForm} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/mycalendar" component={MyCalendar} />
            <Route exact path="/test" component={BookingCalendar} />
            <Route exact path="/sessions" component={MySessions} />
            <Route exact path="/pending" component={PendingSessions} />
            <Redirect to="/home" />
          </Switch>
        ) : <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/addresult" component={AddResult} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/records" component={Records} />
        <Route exact path="/booking" component={BookingForm} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/mycalendar" component={MyCalendar} />
        <Route exact path="/test" component={BookingCalendar} />
        <Route exact path="/sessions" component={MySessions} />
        <Redirect to="/home" />
      </Switch>  : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
