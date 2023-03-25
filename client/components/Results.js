import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchResults } from '../store/allResultsStore'

function Results() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const results = useSelector((state) => state.allResults )
  const [selectedEvent, setSelectedEvent] = useState("All")
  // const sorted = results.sort((a, b) => (a.eventId -b.eventId || parseInt(a.time) - parseInt(b.time)))

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


  const renderResults = () => {
    return sorted.map(result => {
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
        </tr>
      );
    });
  };

  useEffect(() => {
    dispatch(fetchResults())
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleChange =(event) => {
    event.preventDefault()
    setSelectedEvent(event.target.value)

  }


  return (
    <div>
    <h1 className="text-center" style={{marginBottom: "15px",marginTop: "15px"}}><u>Results</u></h1>
    <div style={{marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Event</option>
              {results.map((({ event }) => event)).filter((item, i, ar) => ar.indexOf(item) === i).map((result) => <option key={result} value={result}>{result}</option>)}
          <option value="All">ALL</option>
              </select>
              </div>
    {results ?
    <div style={{paddingLeft: "15px",paddingRight: "15px"}}>
    {/* <table className="table table-bordered  table-dark text-center">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Date</th>
<th scope="col">Event</th>
<th scope="col">Time</th>
</tr>
</thead> */}
 <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Event</th>
          <th>Time</th>
          <th>UserId</th>
        </tr>
      </thead>
     {selectedEvent !== "All"  ? sorted.filter(result=>result.event == selectedEvent).map((result) => {
        return (
          <tbody key={result.id}>
          <tr>
            <th scope="row">{result.id}</th>
            <th scope="row">{result.date}</th>
            <td>{result.event}</td>
            <td><Link to={`/clients/${result.userId}`} >{result.userId}</Link></td>
            <td>{result.duration}</td>
          </tr>
        </tbody>
        )

      }) :

          <tbody>
          {/* <tr>
          <th scope="row">{result.id}</th>
          <th scope="row">{result.date}</th>
          <th scope="row"> <td>{result.event}</td></th>
            <td><Link to={`/clients/${result.userId}`}>{result.userId}</Link></td>
            <td>{(result.duration)}</td>
          </tr> */}
          {renderResults()}
        </tbody>


    }
                 </table>
</div>: <div>NO Results</div>}
</div>
  )
}

export default Results
