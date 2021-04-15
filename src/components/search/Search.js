import React, { useRef, useEffect } from 'react'
import { test, nearbySearch } from '../../stores/actions/searchActionCreator'

export default function Search(props) {
    let searchRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        props.nearbySearch(searchRef.current.value)
        searchRef.current.value = ''
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    ref={searchRef}
                    placeholder='Search Place'></input>
                <button onClick={() => console.log(searchRef.current.value)}>Search</button>
            </form>
            <span>{props.state.places.length} Result</span>
        </div>
    )
}

