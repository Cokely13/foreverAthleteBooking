import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';

function MyResults() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, []);

  const sortedResults = user.results
    ? user.results.slice().sort((a, b) => {
        // Split duration into minutes and seconds components
        const [minutesA, secondsA] = a.duration.split(':');
        const [minutesB, secondsB] = b.duration.split(':');
        // Calculate total duration in seconds
        const durationSecondsA = parseInt(minutesA) * 60 + parseInt(secondsA);
        const durationSecondsB = parseInt(minutesB) * 60 + parseInt(secondsB);
        // Compare the duration values
        return durationSecondsA - durationSecondsB;
      })
    : [];

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <h2 className="profile border rounded border-5   text-white-50  text-center " style={{marginLeft: "30%", marginRight: "30%"  }}>Ski Erg</h2>
          {sortedResults.filter((result) => result.event === 'SkiErg').length ? (
            <div>
              {sortedResults
                .filter((result) => result.event === 'SkiErg')
                .map((result) => (
                  <h1 key={result.id}>{result.duration}</h1>
                ))}
            </div>
          ) : (
            <h1>No Result</h1>
          )}
        </div>
        <div>
          <h2 className="profile border rounded border-5   text-white-50  text-center " style={{marginLeft: "30%", marginRight: "30%"  }}>Row</h2>
          {sortedResults.filter((result) => result.event === 'Row').length ? (
            <div>
              {sortedResults
                .filter((result) => result.event === 'Row')
                .map((result) => (
                  <h1 key={result.id}>{result.duration}</h1>
                ))}
            </div>
          ) : (
            <h1>No Result</h1>
          )}
        </div>
        <div>
          <h2 className="profile border rounded border-5   text-white-50  text-center " style={{marginLeft: "30%", marginRight: "30%"  }}>Assault Bike</h2>
          {sortedResults.filter((result) => result.event === 'AssaultBike').length ? (
            <div>
              {sortedResults
                .filter((result) => result.event === 'AssaultBike')
                .map((result) => (
                  <div key={result.id}>{result.duration}</div>
                ))}
            </div>
          ) : (
            <h1>No Result</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyResults;
