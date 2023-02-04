import { Avatar, Button, Input } from '@material-ui/core'
import {ThumbUp, Message, Share} from '@material-ui/icons'
import Pusher from 'pusher-js'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import '../Styles/Post.css'

const Feed = ({post}) => {

  const [comment, setComment]=useState('');
  const [likes, setLikes]=useState(0);
  const [amountLiked, setAmountLiked]=useState(0)
  const [totalComments, setTotalComments]=useState([])

  useEffect(()=>{
    setLikes(post.likes)
    setTotalComments(post.comments)
  }, [])

  useEffect(()=>{

    const pusher = new Pusher('fbf133c273ecc8d4f7e3', {
      cluster: 'eu'
    });

    const channel =pusher.subscribe(`content_${post._id}`)

    channel.bind('comment-added', (data)=>{
      totalComments.push(data)
      setTotalComments([...totalComments])
      
    })

    return ()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [totalComments])

  const sendCommentRequest =()=>{
  
    const user=JSON.parse(localStorage.getItem('userInfo'))
    fetch('http://localhost:5000/api/comment', {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({
      postId : post._id,
      commenterId : user._id,
      content : comment
    })})
    .then(res=> res.json())
    .then(console.log)
    setComment('')
  }

  const commentToPost=()=>{
      if(comment === ''){
        alert('Do not make an empty comment')
      }else{
        sendCommentRequest()
        
      } 
    }

  const likePost=()=>{
    if(amountLiked < 1){
      fetch('http://localhost:5000/api/like', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({id : post._id})
      })
      .then(res=> res.json())
      .then(data=> setLikes(data.likes))
      setAmountLiked(1)
    }

  }

  return (
    <div className='post'>
      <div className="post__header">
        <Avatar src={post.poster.profilePicture} className='avatar'/>
        <div className="posting__info">
          <p>{post.poster.username}</p> 
          <p>{post.createdOn}</p> 
        </div>

      </div>
      <div className="post__middle">
        <p>{post.content}</p>
        {
        post.image !== '' ? <img src={post.image} alt='this post image cant be found'/> : null
        }
      </div>
      <div className="post__bottom">
        <div onClick={()=> likePost()} className="options">
          <ThumbUp/>
          {likes} Likes
        </div>
        <div className="comment">
          <div className='top'>
          <input placeholder='Make a comment' value={comment} onChange={(e)=> setComment(e.target.value)}/>
          <Button onClick={()=>{commentToPost()}}>Upload</Button>  
          </div>
          {
            totalComments.map(comment=>{
              return (<p key={comment._id}>{`${comment.commenter.username} -- ${comment.content}`}</p>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Feed