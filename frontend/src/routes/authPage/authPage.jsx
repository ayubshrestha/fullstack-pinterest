import { useState } from 'react'
import './authPage.css'
import Image from '../../components/image/image'

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState("")
    return (
        <div className="authPage">
             {/* just a try hai */}
            <div className="authContainer">
                <Image path="general/logo.png" alt="" w={36} h={36}/>
                <h1> { isRegister ? "Create an account" : "Login to your account" }</h1>
                { isRegister ? (
                    <form key="registerForm" >
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
                    <form key="loginForm" >
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