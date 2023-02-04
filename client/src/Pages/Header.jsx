import React from 'react'
import logo from './download.png'
import '../Styles/Header.css'
import { useState, useEffect } from 'react'
import {Message, NotificationsActiveOutlined, People, SearchRounded} from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const Header = ({}) => {

  const [username, setUsername]=useState('')
  const [profilePic, setProfilePic]=useState('')

  const navigate=useNavigate()

  useEffect(()=>{
      const user= JSON.parse(localStorage.getItem('userInfo'))
      setProfilePic(user.profilePicture)
      setUsername(user.username)
  }, [])

  return (
    <div className='header'>
        <div className="header__left">
            <h1>V-Media</h1>
            <input className='search' type='text' placeholder='search friends'/>
        </div>
        <div className="header__center">
          <div className="options">
            <People className='icon'/>
            connections
          </div>
          <div className="options">
            <NotificationsActiveOutlined className='icon'/>
            Notifications
          </div>
          <div className="options">
            <Message className='icon'/>
            Messages
          </div>
        </div>
        <div className="header__right">
          <h3>{username}</h3>
          <Avatar src={profilePic} onClick={()=> navigate('/settings')}/>
        </div>
    </div>
  )
}

export default Header