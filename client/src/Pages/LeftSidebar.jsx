import React from 'react'
import {HomeOutlined, MessageOutlined, People, Notifications, Store, VideocamSharp} from '@material-ui/icons';
import '../Styles/LeftSidebar.css'

const LeftSidebar = ({}) => {
  return (
    <div className='leftSidebar'>
        <div className="options">
            <HomeOutlined className='icons'/>
            <p>Homepage</p> 
        </div>
        <div className="options">
            <People  className='icons'/>
            <p>Connections</p> 
        </div>
        <div className="options">
            <MessageOutlined  className='icons'/>
            <p>Messages</p> 
        </div>
        <div className="options">
            <Notifications  className='icons'/>
            <p>Notifications</p> 
        </div>
        <div className="options">
            <Store className='icons'/>
            <p>Marketplace</p>
        </div>
        <div className="options">
            <VideocamSharp className='icons'/>
            <p>Videos</p>
        </div>
    </div>
  )
}

export default LeftSidebar