import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';
import Modal from 'react-modal';

// CSS styles for the modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
};

export default function UpcomingSession() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const [nextSession, setNextSession] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sessionStatus, setSessionStatus] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const user = useSelector((state) => state.singleUser);

  useEffect(() => {
    if (user.sessions && user.sessions.length > 0) {
      const currentDate = new Date();
      const sessionsAfterCurrentDate = user.sessions.filter(
        (session) => new Date(session.start) > currentDate
      );
      const sortedSessions = sessionsAfterCurrentDate.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );

      if (sortedSessions.length > 0) {
        setNextSession(sortedSessions[0].start);
        setSessionStatus(sortedSessions[0].confirmed);
      }
    }
  }, [user.sessions]);

  useEffect(() => {
    if (nextSession) {
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        const targetTime = new Date(nextSession);
        const timeDifference = targetTime.getTime() - currentTime.getTime();

        if (timeDifference > 0) {
          const seconds = Math.floor((timeDifference / 1000) % 60);
          const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
          const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

          setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown(null);
          setShowModal(true);
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [nextSession]);

  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page
  };

  console.log('status', sessionStatus);

  const getBackgroundColor = () => {
    if (sessionStatus === 'pending') {
      return 'yellow';
    } else if (sessionStatus === 'confirmed') {
      return 'green';
    } else if (sessionStatus === 'denied') {
      return 'red';
    }
    // Return default background color if sessionStatus is null or not recognized
    return 'white';
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <div className="text-center">
          <h1 className="profile border rounded border-5   text-white-50  text-center " style={{ marginBottom: "15px", marginTop: "15px", marginLeft: "40%", marginRight: "40%"  }}>Next Session:</h1>
          {user.sessions ? (
            <div className="border rounded border-5 " style={{ backgroundColor: getBackgroundColor(),  marginLeft: "20%", marginRight: "20%" }}>
              {nextSession ? (
                <>
                  <h1>{new Date(nextSession).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</h1>
                  <h2>{sessionStatus}</h2>
                  {countdown && <h1>Countdown: {countdown}</h1>}
                </>
              ) : (
                <div>No Session Scheduled</div>
              )}
            </div>
          ) : (
            <div>check</div>
          )}
        </div>
      </div>

      <Modal isOpen={showModal} style={modalStyles} ariaHideApp={false}>
        <h2>SESSION NOW!</h2>
        <button onClick={handleModalClose}>Okay</button>
      </Modal>
    </div>
  );
  }
