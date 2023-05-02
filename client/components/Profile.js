import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {fetchSingleUser} from '../store/singleUserStore'
import SessionsList from './SessionsList'



export default function Profile() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const { userId } = useParams();
  const [statusView, setStatusView] = useState();
  useEffect(() => {
    dispatch(fetchSingleUser(id))

    // Safe to add dispatch to the dependencies array
  }, [])



  const user = useSelector((state) => state.singleUser)


  const handleCLick = (event) => {
    event.preventDefault()
    setStatusView(1)
  }


  return (
    <div>
      <div>
      <div className="text-center">
      <div className="col"><h1 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{marginBottom: "10px", marginLeft: "auto", marginRight: "auto", width: "25rem"}}>My Profile</h1></div>
    </div>
    <div className="text-center">
    {user.sessions ?<div># of Sessions: {user.sessions.length} </div> : <div>check</div>}
    </div>
    <button onClick={handleCLick}>View Sessions</button>
    {statusView == 1 ? <div><div>Sessions</div>
    <SessionsList sessions={user.sessions}/>
    </div>
     : <div></div>}
    </div>

    </div>

)}
