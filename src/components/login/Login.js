import React, { useRef } from 'react'
import { BrowserRouter as Router, Route, Redirect, Link, useHistory } from 'react-router-dom'
// import { register } from '../../stores/actions/authActionCreator'
import { connect } from "react-redux";
import Register from '../register/Register.js'

const Login = (props) => {
    // console.log('props in register func', props)
    let nameRef = useRef()
    let emailRef = useRef()
    let passwordRef = useRef()
    const history = useHistory()

    const handleRegister = (event) => {
        event.preventDefault()
        // props.register(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
        nameRef.current.value = ''
        emailRef.current.value = ''
        passwordRef.current.value = ''
        alert('login')
    }
    // console.log('isauth in register', props.state.isAuth)
    return (
        < div >
            <div>This is LOGIN page</div>
            {/* { props.state.registerMessage === '' ? null : <p>{props.state.registerMessage}. Click Login</p>} */}
            < form onSubmit={handleRegister} >
                <input ref={nameRef} placeholder='username' type='text'></input>
                <input ref={emailRef} placeholder='email' type='email'></input>
                <input ref={passwordRef} placeholder='password' type='password'></input>
                <button>Register</button>
                {/* <p onClick={() => history.push("/register")}>Don't Have An Account? Click Register</p> */}
                <Link to='/register'>Don't Have An Account? Register Here</Link>
                {/* <Link>
                    <Redirect to="/register">Register</Redirect>
                </Link> */}
                {/* <button onClick={() => props.register(nameRef.current.value, emailRef.current.value, passwordRef.current.value)}>Register</button> */}

            </form >
        </div >
    )
}


const mapStateToProps = (state) => {
    return {
        state: state.authReducer
    }
}
export default connect(mapStateToProps)(Login);