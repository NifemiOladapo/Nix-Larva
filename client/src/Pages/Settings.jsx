import { Button } from '@material-ui/core'
import { useState } from 'react'
import { Input, useToast } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

const Settings = () => {
    const toast = useToast();
    const navigate =useNavigate();
    
    const [name, setName]=useState('')
    const [pic, setPic]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const updateAccount=()=>{
        const user=JSON.parse(localStorage.getItem('userInfo'))
        if(name === '' && pic === ''){
            toast({
                title: 'Input all the fields',
                duration: 5000,
                position: 'top',
                status: 'warning',
                isClosable: true
                })
                return
        }
        fetch('http://localhost:5000/api/updateprofile', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                newUsername : name,
                newPicture : pic,
                id : user._id
            })
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            if(data === 'this user you are trying to update does not exist'){
                toast({
                    title: 'this user you are trying to update does not exists',
                    duration: 5000,
                    position: 'top',
                    status: 'error',
                    isClosable: true
                })
                return
            }
            localStorage.setItem('userInfo', JSON.stringify(data))
            setPic('')
            setName('')
            toast({
                title: 'Your account have been successfully updated',
                duration: 5000,
                position: 'top',
                status: 'success',
                isClosable: true
            })
        })
    }

    const deleteAccount =()=>{
        if(email === '' || password === ''){
            toast({
                title: 'Input all the fields',
                duration: 5000,
                position: 'top',
                status: 'warning',
                isClosable: true
            })
            return
        }
        fetch('http://localhost:5000/api/deleteaccount', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email,
                password
            })
        })
        .then(res=> res.json())
        .then(data=>{
            if(data === 'this user you are trying to delete does not exists'){
                toast({
                    title: 'this user you are trying to delete does not exists',
                    duration: 5000,
                    position: 'top',
                    status: 'error',
                    isClosable: true
                })
                return
            }
            setPassword('')
            setEmail('')
            toast({
                title: 'Account deleted',
                duration: 5000,
                position: 'top',
                status: 'success',
                isClosable: true
            })
            navigate('/')
        })
    }

  return (
    <div style={{textAlign : 'center', backgroundColor : 'white', height : '100vh'}}>
        <div style={{padding : '50px', marginBottom : '50px'}}>
            <h1 style={{fontSize : '50px'}}>Update Your Profile</h1>
            <input style={{padding : '12px', border : '1px solid whitesmoke', borderRadius : '5px'}} onChange={(e)=>setName(e.target.value)} value={name} placeholder='Input your new username'/>
            <input style={{padding : '12px', border : '1px solid whitesmoke', borderRadius : '5px'}} onChange={(e)=> setPic(e.target.files[0])} type='file'/>
            <Button onClick={()=> updateAccount()}>Update</Button>
        </div>
        <div>
            <h1 style={{fontSize : '50px'}}>Delete Account</h1>
            <input value={email} style={{padding : '12px', border : '1px solid whitesmoke', borderRadius : '5px'}} onChange={(e)=> setEmail(e.target.value)} placeholder='Input your Email'/>
            <input value={password} style={{padding : '12px', border : '1px solid whitesmoke', borderRadius : '5px'}} onChange={(e)=> setPassword(e.target.value)}  placeholder='Input your Password'/>
            <Button onClick={()=> deleteAccount() }>Delete</Button>
        </div>
    </div>
  )
}

export default Settings