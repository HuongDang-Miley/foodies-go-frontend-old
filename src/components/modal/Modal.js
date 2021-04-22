import React, { useRef, useState } from 'react'
import './modal.css'

export default function Modal(props) {
    // console.log('props in modal',props.place.place_id)
    let noteRef = useRef()

    const handleAddNote = () => {
        props.addNote(
            props.favList,
            props.userId,
            props.place.place_id,
            noteRef.current.value)

        props.setOpenModal(false)
    }

    return (
        <div className='modal-background'>
            <div className='modal-wrapper'>
                <button className='close-btn' onClick={() => props.setOpenModal(false)}>x</button>
                <h3>Add note</h3>
                <p>Place: {props.place.name}</p>
                <input className='modal-input' placeholder="Type your note here" ref={noteRef} />
                <div className='btn-wrapper'>
                    <button onClick={() => props.setOpenModal(false)}>Cancel</button>
                    <button className='add-note-btn'
                        onClick={() => handleAddNote()}>{props.place.note.length === 0 ? "Add Note" : "Edit Note"}</button>
                </div>
            </div>
        </div>
    )
}

