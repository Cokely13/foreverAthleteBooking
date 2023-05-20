import React from 'react'
import Banner from './components/Banner'

import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (
    <div style={{ backgroundColor: 'lightgray', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <Banner />
      <Routes />
    </div>
  )
}

export default App



