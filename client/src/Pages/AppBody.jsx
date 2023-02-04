import React from 'react'
import LeftSidebar from './LeftSidebar'
import '../Styles/AppBody.css'
import MainPage from './MainPage'
import RightSidebar from './RightSidebar'

const AppBody = ({ })  => {
  return (
    <div className='app__body'>
        <LeftSidebar />
        <MainPage />
        <RightSidebar />
    </div>
  )
}

export default AppBody