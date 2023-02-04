import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import '../Styles/Poster.css'
import { VideoLibrary, Image, Videocam, EmojiEmotions, Attachment } from '@material-ui/icons'
import {useToast} from '@chakra-ui/react';

const Poster = () => {
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [username, setUsername] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const toast=useToast()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        setProfilePic(user.profilePicture)
        setUsername(user.username)
    }, [])

    const imagingFunc=(image)=>{
        if(image === undefined){
            toast({
                title : 'input an image',
                status : 'warning',
                isClosable : true,
                position : 'top',
                duration : 5000
            })
            return
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png'){
            const data=new FormData();
            data.append("file", image);
            data.append("upload_preset", "V-media");
            data.append("cloud_name", " nifemioladapo")

            fetch("https://api.cloudinary.com/v1_1/nifemioladapo/image/upload", {
                method : 'POST',
                body : data
            })
            .then(res=> res.json())
            .then(data=> {
                console.log(data)
                setImage(data.url.toString())
            })
            .catch(err=> console.log(err))
        }else{
            toast({
                title : 'input an image',
                status : 'warning',
                isClosable : true,
                position : 'top',
                duration : 5000
            })
        }
    }

    const uploadPost = () => {
        if (content === '' && image === '') {
            alert('Do not upload an empty value')
        } else {
            const user = JSON.parse(localStorage.getItem('userInfo'))
            const id = user._id;
            fetch('http://localhost:5000/api/uploadpost', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    image,
                    id
                })
            })
                .then(res => res.json())
                .then(data => {
                    
                })
            setContent('')
        }
    }

    return (
        <div className='poster'>
            <div className="poster__top">
                <Avatar src={profilePic} className='avatar' />
                <input placeholder={`Hi ${username}. Why dont you say something.`} value={content} onChange={(e) => {
                    setContent(e.target.value)
                }} />
                <button onClick={() => uploadPost()}>upload</button>
            </div>
            <div className="poster__bottom">
            <input style={{display : 'none'}} onChange={e=> imagingFunc(e.target.files[0])} type='file' id='file'/>
            <label htmlFor="file">
                <div className="options">
                    <Image className='icon icon1' />
                    <p>Photos</p>
                </div>
            </label>
            <input style={{display : 'none'}} type='file' id='file'/>
            <label htmlFor="file">
                <div className="options">
                    <Videocam  className='icon icon2' />
                    <p>Videos</p>
                </div>
            </label>
                <div className="options">
                    <EmojiEmotions className='icon icon3' />
                    <p>Emojies</p>
                </div>
                <div className="options">
                    <Attachment />
                    Atachments
                </div>
            </div>
        </div>
    )
}

export default Poster