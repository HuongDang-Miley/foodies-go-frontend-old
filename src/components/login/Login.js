import React, { useRef, useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { login } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";

const Login = (props) => {
    // console.log('props in login func', props)
    let emailRef = useRef()
    let passwordRef = useRef()

    //=========================== Check if there is a token ===========================
    let history = useHistory();
    let [isAuth, setIsAuth] = useState(false)
    
    useEffect(() => {
        let userToken = localStorage.getItem('userToken')
        if (userToken) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        if (emailRef.current.value === '' || passwordRef.current.value === '') {
            alert("must fill in both email and password")
        }
        await props.login(emailRef.current.value, passwordRef.current.value)
        emailRef.current.value = ''
        passwordRef.current.value = ''
        history.push('/home')
    }

    return (
        <>
            {isAuth ? <Redirect to='/home' />
                : <div>
                    <div>This is LOGIN page</div>
                    < form onSubmit={handleLogin} >
                        <input ref={emailRef} placeholder='email' type='email'></input>
                        <input ref={passwordRef} placeholder='password' type='password'></input>
                        <button>LOGIN</button>
                        <Link to='/register'>Don't Have An Account? Register Here</Link>
                    </form >

                </div>}
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        state: state.authReducer
    }
}
export default connect(mapStateToProps, { login })(Login);