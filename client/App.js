import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (
    <div style={{ backgroundColor: 'lightgray', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App



