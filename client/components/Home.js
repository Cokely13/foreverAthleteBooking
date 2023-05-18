// // import React from 'react'
// // import {connect} from 'react-redux'
// // import UpcomingSession from './UpcomingSession'
// // import Records from './Records'

// // /**
// //  * COMPONENT
// //  */
// // export const Home = props => {
// //   const {username} = props

// //   return (
// //     <div>
// //       <h3>Welcome, {username}</h3>
// //       <UpcomingSession/>
// //       <Records/>
// //     </div>
// //   )
// // }

// // /**
// //  * CONTAINER
// //  */
// // const mapState = state => {
// //   return {
// //     username: state.auth.username
// //   }
// // }

// // export default connect(mapState)(Home)


// import React from 'react';
// import { connect } from 'react-redux';
// import UpcomingSession from './UpcomingSession';
// import Records from './Records';

// /**
//  * COMPONENT
//  */
// export const Home = (props) => {
//   const { username } = props;

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h3 style={{ marginBottom: '20px' }}>Welcome, {username}</h3>

//       <div style={{ marginTop: '60px', marginBottom: '100px' }}>
//         <UpcomingSession />
//       </div>

//       <div style={{ borderTop: '1px solid black', paddingTop: '20px' }}>
//         {/* <h2 style={{ fontWeight: 'bold' }}>Records</h2> */}
//         <Records />
//       </div>
//     </div>
//   );
// };

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(Home);

import React from 'react';
import { connect } from 'react-redux';
import UpcomingSession from './UpcomingSession';
import Records from './Records';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div style={{ textAlign: 'center', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ marginBottom: '20px' }}>Welcome, {username}</h3>
        <div style={{ marginTop: '30px',  border: '1px solid black', padding: '150px' }}>
          <UpcomingSession />
        </div>
      </div>

      <div style={{ marginBottom: '120px' }}>
        {/* <h2 style={{ fontWeight: 'bold' }}>Records</h2> */}
        <Records />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
