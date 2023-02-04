import { FormControl, FormLabel, Input, VStack,  InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [show, setShow]=useState(false);
    const [password, setPassword] =useState('')
    const [email, setEmail] =useState('')

    const toast =useToast();
    const navigate= useNavigate()

    const handleClick=()=>{
        setShow(!show)
    }

    const submitHandeler=()=>{
        if(password === '' || email === ''){
            toast({
                title : 'Input all of the fields',
                duration : 5000,
                status : 'warning',
                isClosable : true,
                position : 'top'
            })
        }else{
            fetch('http://localhost:5000/api/signin', {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    email,
                    password
                })
            })
            .then(res=> res.json())
            .then(data=>{
                console.log(data)
                if(data === 'user does not exists'){
                    toast({
                        title : data,
                        duration : 5000,
                        position : 'top',
                        status : 'error',
                        isClosable : true
                    })
                }else{
                    toast({
                        title : 'You are successfully logedIn',
                        duration : 5000,
                        position : 'top',
                        status : 'success',
                        isClosable : true
                    })
                    localStorage.setItem('userInfo', JSON.stringify(data))
                    navigate('/homepage')
                }
            })
        }
    }

  return (
    <VStack spacing={'5px'} color='black'>
        <FormControl id='email' isRequired >
            <FormLabel>Email:</FormLabel>
            <Input value={email} placeholder="Enter your email..."  onChange={(e)=> setEmail(e.target.value)}/>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
                <Input type={show ? 'text' : 'password'} value={password} placeholder="Enter your password"  onChange={(e)=> setPassword(e.target.value)}/>
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button colorScheme={'blue'} width='100%' mt={'15px'} onClick={submitHandeler}>Login</Button>
        <Button colorScheme={'red'} width='100%' mt={'15px'} >Get users credentials</Button>

    </VStack>
  )
}

export default Login