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
    <table className="table table-bordered  table-dark text-center">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Date</th>
<th scope="col">Event</th>
<th scope="col">Time</th>
{/* <th scope="col">Handle</th> */}
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
      sorted.map((result) => {
        return (
          <tbody key={result.id}>
          <tr>
          <th scope="row">{result.id}</th>
          <th scope="row">{result.date}</th>
          <th scope="row"> <td>{result.event}</td></th>
            <td><Link to={`/clients/${result.userId}`}>{result.userId}</Link></td>
            <td>{(result.duration)}</td>
          </tr>
        </tbody>
        )

      }) }
                 </table>
</div>: <div>NO Results</div>}
</div>
  )
}

export default Results
