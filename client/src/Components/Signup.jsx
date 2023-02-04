import { FormControl, FormLabel, Input, VStack, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [profilePicture, setProfilePicture] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => {
        setShow(!show)
    }

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
                setProfilePicture(data.url.toString())
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

    const submitHandeler = () => {
        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
            })
        } else {
            fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    profilePicture,
                    password
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data === 'user alredy exists' || data === 'input the neccessary fields') {
                        toast({
                            title: data,
                            isClosable: true,
                            status: 'error',
                            duration: 5000,
                            position: 'top'
                        })
                    } else {
                        toast({
                            title: 'You have being successfully registerd',
                            duration: 5000,
                            position: 'top',
                            status: 'success',
                            isClosable: true
                        })
                        localStorage.setItem('userInfo', JSON.stringify(data))
                        navigate('/homepage')
                    }
                })
        }


    }

    return (
        <VStack spacing={'5px'} color='black'>
            <FormControl id='first-name' isRequired >
                <FormLabel>Name:</FormLabel>
                <Input value={username} placeholder="Enter your first name..." onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired >
                <FormLabel>Email:</FormLabel>
                <Input value={email} placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password:</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Confirm Password:</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} value={confirmPassword} placeholder="confirm your password..." onChange={(e) => setConfirmPassword(e.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='pic'>
                <FormLabel>Upload your picture</FormLabel>
                <Input type={'file'} onChange={e=> imagingFunc(e.target.files[0])} accept='image/*' p='1.5px' />
            </FormControl>
            <Button colorScheme={'blue'} width='100%' mt={'15px'} onClick={submitHandeler}>SignUp</Button>
        </VStack>
    )
}

export default Signup;