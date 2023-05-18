

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

  console.log('hey', user);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <h2>Ski Erg</h2>
          {user.results ? user.results.filter((result) => result.event === 'SkiErg').length ? (
            <div>
              {user.results
                .filter((result) => result.event === 'SkiErg')
                .map((result) => (
                  <div key={result.id}>{result.duration}</div>
                ))}
            </div>
          ) : (
            <div>No Results</div>
          ) : <div></div>}
        </div>
        <div>
          <h2>Row</h2>
          {user.results ? user.results.filter((result) => result.event === 'Row').length ? (
            <div>
              {user.results
                .filter((result) => result.event === 'Row')
                .map((result) => (
                  <div key={result.id}>{result.duration}</div>
                ))}
            </div>
          ) : (
            <div>No Results</div>
          ) : <div></div>}
        </div>
        <div>
          <h2>Assault Bike</h2>
          {user.results ? user.results.filter((result) => result.event === 'AssaultBike').length ? (
            <div>
              {user.results
                .filter((result) => result.event === 'AssaultBike')
                .map((result) => (
                  <div key={result.id}>{result.duration}</div>
                ))}
            </div>
          ) : (
            <div>No Results</div>
          ) : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default MyResults;
