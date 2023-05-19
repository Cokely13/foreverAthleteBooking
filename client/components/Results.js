


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchResults, deleteResult, setResults } from '../store/allResultsStore'
import { fetchSingleUser } from '../store/singleUserStore'
import {fetchUsers} from '../store/allUsersStore'
import { updateSingleResult } from '../store/singleResultStore'
import Modal from 'react-modal';

function Results() {
  const dispatch = useDispatch()
  const { id, admin } = useSelector((state) => state.auth)
  const results = useSelector((state) => state.allResults)
  const user = useSelector((state) => state.singleUser)
  const users = useSelector((state) => state.allUsers)
  const [selectedEvent, setSelectedEvent] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [editResult, setEditResult] = useState(null)
  const [formData, setFormData] = useState({
    date: '',
    event: '',
    duration: '',
    userId: '',
  })
  const [selectedUser, setSelectedUser] = useState("All");



  const sorted = results
    .map((result) => {
      // Split duration into minutes and seconds components
      const [minutes, seconds] = result.duration.split(":");
      // Calculate total duration in seconds
      const durationSeconds = parseInt(minutes) * 60 + parseInt(seconds);
      // Add the durationSeconds property to the result object
      return { ...result, durationSeconds };
    })
    .sort((a, b) => a.durationSeconds - b.durationSeconds);

  const renderResultButtons = (result) => {
    if (admin) {
      return (
        <td>
          <button
            onClick={() => {
              setEditResult(result);
              setShowModal(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              dispatch(deleteResult(result.id));
            }}
          >
            Delete
          </button>
        </td>
      );
    }
  };



  const renderResults = () => {
    const filteredResults =
      selectedUser === "All"
        ? sorted
        : sorted.filter((result) => result.userId == selectedUser);

        console.log("filterer", filteredResults)

    return filteredResults.map((result) => {
      // Convert the start property to a date object
      const startDate = new Date(result.date);

      // Format the date and time strings
      const date = startDate.toLocaleDateString();

      return (
        <tr key={result.id}>
          <td>{date}</td>
          <td>{result.event}</td>
          <td>{result.duration}</td>
          <td>{result.userId}</td>
          {renderResultButtons(result)}
        </tr>
      );
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateSingleResult(editResult));
    setShowModal(false);
    window.location.reload();
  };

  const handleChange = (event) => {
    setEditResult({ ...editResult, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    dispatch(fetchResults());
  }, []);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);



  return (
    <div style={{ backgroundColor: 'white', margin: '100px 50px 50px', textAlign: 'center', padding: '20px', border: '1px solid black', borderRadius: "10px" }}>
      <h1 className="text-center" style={{ marginBottom: "15px", marginTop: "15px" }}><u>Results</u></h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '35px' }}>
        <div style={{ marginRight: '30px' }}>
          <select
            onChange={(event) => setSelectedUser(event.target.value)}
            name="filterUsers"
            className="custom-select"
          >
            <option value="All">Filter by User</option>
            {users.map(({ id, username }) => (
              <option key={id} value={id}>
                {username}
              </option>
            ))}
            <option value="All">ALL</option>
          </select>
        </div>
        <div>
          <select onChange={(event) => setSelectedEvent(event.target.value)} name="filterEvents" className='custom-select'>
            <option value="All">Filter by Event</option>
            {results.map((({ event }) => event)).filter((item, i, ar) => ar.indexOf(item) === i).map((result) => <option key={result} value={result}>{result}</option>)}
            <option value="All">ALL</option>
          </select>
        </div>
      </div>
      {results ?
        <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
          <table style={{ margin: "0 auto", borderCollapse: "separate", borderSpacing: "30px" }}>
            <thead>
              <tr style= {{fontSize: "25px"}}>
                <th>Date</th>
                <th>Event</th>
                <th>Time</th>
                <th>UserId</th>
                {admin && <th>Actions</th>}
              </tr>
            </thead>
            {selectedEvent !== "All" || selectedUser !== "All" ? (
              <tbody>
                {sorted
                  .filter(
                    (result) =>
                      (selectedEvent === "All" || result.event == selectedEvent) &&
                      (selectedUser === "All" || result.userId == selectedUser)
                  )
                  .map((result) => {
                    // Convert the start property to a date object
                    const startDate = new Date(result.date);
                    // Format the date and time strings
                    const date = startDate.toLocaleDateString();

                    return (
                      <tr key={result.id}>
                        <td>{date}</td>
                        <td>{result.event}</td>
                        <td>{result.duration}</td>
                        <td>
                          <Link to={`/clients/${result.userId}`}>{result.userId}</Link>
                        </td>
                        {renderResultButtons(result)}
                      </tr>
                    );
                  })}
              </tbody>
            ) : (
              <tbody>
                {renderResults()}
              </tbody>
            )}
          </table>
          {showModal && (
            <Modal
              isOpen={showModal}
              onRequestClose={() => setShowModal(false)}
              contentLabel="Change session status"
              className="custom-modal"
            >
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <h2>Edit Result</h2>
                  <div className="form-group">
                    <label>Date:</label>
                    <input
                      type="date"
                      name="date"
                      value={editResult.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Event:</label>
                    <select
                      name="event"
                      value={editResult.event}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Event</option>
                      {results
                        .map(({ event }) => event)
                        .filter(
                          (value, index, self) => self.indexOf(value) === index
                        )
                        .map((event) => (
                          <option key={event} value={event}>
                            {event}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Duration:</label>
                    <input
                      type="text"
                      name="duration"
                      value={editResult.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>User ID:</label>
                    <select
                      name="userId"
                      value={editResult.userId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select User ID</option>
                      {users.map(({ id, username }) => (
                        <option key={id} value={id}>
                          {username}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-buttons">
                    <button type="submit">Save Changes</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </Modal>
          )}
        </div>
       : (
        <div>NO Results</div>
      )}
    </div>
  );




}

export default Results

