import { useState } from 'react'
import './authPage.css'
import Image from '../../components/image/image'
import apiRequest from '../../utils/apiRequest'
import {useNavigate} from 'react-router'
import useAuthStore from '../../utils/authStore'

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const { setCurrentUser } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)


        try {
            const res = await apiRequest.post(`users/auth/${isRegister ? 'register' : 'login' }`,data)
            setCurrentUser(res.data)
            navigate('/')
        }
        catch(err){
            setError(err.response.data.message) 
        }
    }
    return (
        <div className="authPage">
             {/* just a try hai */}
            <div className="authContainer">
                <Image path="general/logo.png" alt="" w={36} h={36}/>
                <h1> { isRegister ? "Create an account" : "Login to your account" }</h1>
                { isRegister ? (
                    <form key="registerForm" type='submit' onSubmit={handleSubmit}>
                        <div className='formGroup'>
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder='Username' required name='username' id='username' />
                        </div> 
                        <div className='formGroup'>
                            <label htmlFor="displayName">Name</label>
                            <input type="text" placeholder='Name' required name='displayName' id='displayName' />
                        </div>
                        <div className='formGroup'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Email' required name='email' id='email' />
                        </div>
                        <div className='formGroup'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Password' required name='password' id='password' />
                        </div>
                        <button type='submit'>Register</button>
                        <p onClick={() => setIsRegister(false)}>Already have an account? <b>Login</b> </p>
                        {error && <p className='error'>{error}</p>}
                    </form>
                ) : (
                    <form key="loginForm" type='submit' onSubmit={handleSubmit} >
                        <div className='formGroup'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Email' required name='email' id='email' />
                        </div>
                        <div className='formGroup'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Password' required name='password' id='password' />
                        </div>
                        <button type='submit'>Login</button>
                        <p onClick={() => setIsRegister(true)}>Don&apos;t have an account? <b>Register</b> </p>
                        {error && <p className='error'>{error}</p>}
                    </form>
                )}
                
            </div>
        </div>
    )
}

export default AuthPage