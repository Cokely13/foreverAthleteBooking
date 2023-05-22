// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchSingleUser } from '../store/singleUserStore';

// function Records() {
//   const dispatch = useDispatch();
//   const { id } = useSelector((state) => state.auth);
//   const user = useSelector((state) => state.singleUser);

//   useEffect(() => {
//     dispatch(fetchSingleUser(id));
//   }, []);


//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h1 style={{ fontWeight: 'bold' }}>Records</h1>
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
//         <div>
//           <h2>Ski Erg</h2>
//           {user.results ? (
//             <div>
//               {user.results
//                 .filter((result) => result.event === 'SkiErg')
//                 .map((result) => (
//                   <div key={result.id}>{result.duration}</div>
//                 ))}
//             </div>
//           ) : (
//             <div>Hey</div>
//           )}
//         </div>
//         <div>
//           <h2>Row</h2>
//           {user.results ? (
//             <div>
//               {user.results
//                 .filter((result) => result.event === 'Row')
//                 .map((result) => (
//                   <div key={result.id}>{result.duration}</div>
//                 ))}
//             </div>
//           ) : (
//             <div>Hey</div>
//           )}
//         </div>
//         <div>
//           <h2>Assault Bike</h2>
//           {user.results ? (
//             <div>
//               {user.results
//                 .filter((result) => result.event === 'AssaultBike')
//                 .map((result) => (
//                   <div key={result.id}>{result.duration}</div>
//                 ))}
//             </div>
//           ) : (
//             <div>Hey</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Records;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';

function Records() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, []);

  const getLowestDurationResult = (results) => {
    if (!results || results.length === 0) {
      return null;
    }

    return results.reduce((lowest, current) => {
      if (!lowest || current.duration < lowest.duration) {
        return current;
      }
      return lowest;
    }, null);
  };

  const lowestSkiErgResult = getLowestDurationResult(
    user.results ? user.results.filter((result) => result.event === 'SkiErg') : []
  );
  const lowestRowResult = getLowestDurationResult(
    user.results ? user.results.filter((result) => result.event === 'Row') : []
  );
  const lowestAssaultBikeResult = getLowestDurationResult(
    user.results ? user.results.filter((result) => result.event === 'AssaultBike') : []
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="profile border rounded border-5   text-white-50  text-center " style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "40%", marginRight: "40%"  }} >Records</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <div>
          <h2 className="profile border rounded border-5   text-white-50  text-center " style={{marginLeft: "30%", marginRight: "30%"  }}>Ski Erg</h2>
          {lowestSkiErgResult ? <h1>{lowestSkiErgResult.duration}</h1> : <h1>No Result</h1>}
        </div>
        <div>
          <h2 className="profile border rounded border-5   text-white-50  text-center " style={{marginLeft: "30%", marginRight: "30%"  }}>Row</h2>
          {lowestRowResult ? <h1>{lowestRowResult.duration}</h1> : <h1>No Result </h1>}
        </div>
        <div>
          <h2 className="profile border rounded border-5   text-white-50  text-center " style={{marginLeft: "25%", marginRight: "25%"  }}>Assault Bike</h2>
          {lowestAssaultBikeResult ? <h1>{lowestAssaultBikeResult.duration}</h1> : <h1>No Result </h1>}
        </div>
      </div>
    </div>
  );
}

export default Records;

