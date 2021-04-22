import React, { useState } from 'react'
import './favPlaceDetail.css'
import Modal from '../modal/Modal'


export default function FavPlaceDetail(props) {
    let [openModal, setOpenModal] = useState(false)

    return (
        <div className='fav-place-detail-wrapper'>
            <p>{props.place.name}</p>
            <p>{props.place.rating}</p>
            <p>{props.place.price_level}</p>
            <p>{props.place.website}</p>
            <p>{props.place.vicinity}</p>
            <p>{props.place.formatted_phone_number}</p>
            <p>{props.place.note}</p>
            <button onClick={() => setOpenModal(true)}>{props.place.note.length === 0 ? "Add Note" : "Edit Note"}</button>
            {props.place.note.length === 0
                ? null
                : <button onClick={() => props.deleteNote(props.favList, props.userId, props.place.place_id)}>Delete Note</button>}
            {openModal ?
                <Modal
                    setOpenModal={setOpenModal}
                    userId={props.userId}
                    place={props.place}
                    addNote={props.addNote}
                    favList={props.favList}
                />
                : null}
        </div>
    )
}


