import React, { useRef } from 'react'

export default function Search(props) {
    // console.log('prop in search ',props.togglePlaceDetail)
    let searchRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        props.togglePlaceDetail(false)
        props.getNearbySearch(searchRef.current.value)
        searchRef.current.value = ''
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    ref={searchRef}
                    placeholder='Search Place'></input>
                <button>Search</button>
            </form>
        </div>
    )
}

