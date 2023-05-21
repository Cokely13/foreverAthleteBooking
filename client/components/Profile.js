import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSingleUser } from '../store/singleUserStore';
import SessionsList from './SessionsList';
import MyResults from './MyResults';

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [statusView, setStatusView] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, []);

  const user = useSelector((state) => state.singleUser);

  const handleClick = (event) => {
    event.preventDefault();
    setStatusView(1);
  };

  const handleClick2 = (event) => {
    event.preventDefault();
    setStatusView(0);
  };

  return (
    <div className="border rounded border-5" style={{ backgroundColor: 'white', margin: '15px 50px 50px', textAlign: 'center', padding: '20px', border: '1px solid black', borderRadius: "10px" }}>
      <div className="text-center">
        <h1 className="profile border rounded border-5   text-white-50  text-center " style={{ marginBottom: "50px", marginTop: "50px", marginLeft: "auto", marginRight: "auto", width: "25rem" }}>My Profile</h1>
      </div>
      <MyResults />
      <div className="text-center" style={{ marginBottom: "50px",marginTop: "50px" }}>
        {user.sessions ? <h1># of Sessions: {user.sessions.length}</h1> : <div>check</div>}
      </div>
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
  );
}
