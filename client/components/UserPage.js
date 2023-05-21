import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {fetchSingleUser} from '../store/singleUserStore'
import SessionsList from './SessionsList'



export default function UserDetail() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const { userId } = useParams();
  const [statusView, setStatusView] = useState();
  useEffect(() => {
    dispatch(fetchSingleUser(userId))

    // Safe to add dispatch to the dependencies array
  }, [])



  const user = useSelector((state) => state.singleUser)

  const handleClick = (event) => {
    event.preventDefault()
    setStatusView(1)
  }

  const handleClick2 = (event) => {
    event.preventDefault();
    setStatusView(0);
  };


  return (
    <div>
      <div>
      <div className="text-center">
      <div className="col"><h1 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{marginBottom: "10px", marginLeft: "auto", marginRight: "auto", width: "25rem"}}>{user.username}'s Page</h1></div>
    </div>
    <div className="text-center">
    {user.sessions ?<div># of Sessions: {user.sessions.length} </div> : <div>check</div>}
    </div>
    {/* <button onClick={handleCLick}>View Sessions</button>
    {statusView == 1 ? <div><div>Sessions</div>
    <SessionsList sessions={user.sessions}/>
    </div>
     : <div></div>} */}
       <div className="d-flex justify-content-center" style={{ marginBottom: "50px",marginTop: "50px" }}>
      {statusView == 0 ? <button onClick={handleClick}>View Sessions</button> : <button onClick={handleClick2}>Hide Sessions</button>}
      </div>
      {statusView == 1 && (
        <div className="text-center">
          {/* <div>Sessions</div> */}
          <SessionsList sessions={user.sessions} />
        </div>
      )}
    </div>

    </div>

)}
