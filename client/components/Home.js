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
    <div style={{ backgroundColor: 'lightgray', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <div style={{ textAlign: 'center', padding: '20px' }} >
        <h3 style={{ marginBottom: '20px', marginTop: '100px' }}>Welcome, {username}</h3>
        <div className="border rounded border-5" style={{ backgroundColor: 'white', border: '1px solid black', margin: '100px 120px', padding: '30px', borderRadius: "10px" }}>
          <UpcomingSession />
        </div>
      </div>
      <div className="border rounded border-5" style={{ backgroundColor: 'white', margin: '0 50px 50px', textAlign: 'center', padding: '20px', borderRadius: "10px"} }>
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
