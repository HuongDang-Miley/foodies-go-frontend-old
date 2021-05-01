import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Oh no! This url does not exist</h1>
            <Link to='/'>Go Home</Link>
        </div>
    )
}
