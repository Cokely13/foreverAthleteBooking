import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../store/allUsersStore'
import { fetchSingleUser} from '../store/singleUserStore'


export default function Users() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const [stateReload, setStateReload] = useState(1);
  useEffect(() => {
    dispatch(fetchUsers())

    // Safe to add dispatch to the dependencies array
  }, [])

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])



  const things = useSelector((state) => state.singleUser )
  const users = useSelector((state) => state.allUsers)




  return (
    <div>
    <h1 className="border rounded border-5  border-dark text-white-50 bg-dark text-center" style={{width: "8rem", marginLeft: "auto", marginRight: "auto"}}>Users </h1>
    {users? users.filter((user) =>user.id !== id).map((user)=> {
      return(
        <div className="col" key={user.id}>
        <div className="container text-center mt-2" key={user.id} >
    <div   className="card border border-primary border-5 text-white-50 bg-dark" style={{width: "18rem", marginLeft: "auto", marginRight: "auto"}}>
    {/* <img className="card-img-top rounded-circle border border-5  border-dark"  style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: "10px", marginBottom: "10px"}} src={user.imageUrl} alt="Card image"/> */}
      <h3><Link to={`/clients/${user.id}`} >{user.username}</Link></h3>
      </div></div></div>
      )}) : <div>Hey</div>}
      </div>
  )
}
