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

  console.log('nextSession', nextSession);
  console.log('countdown', countdown);

  return (
    <div>
      <div>
        <div className="text-center">
          <h1>Next Session:</h1>
          {user.sessions ? (
            <div>
              {nextSession ? (
                <>
                  <div>{new Date(nextSession).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</div>
                  {countdown && <div>Countdown: {countdown}</div>}
                </>
              ) : (
                ''
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
