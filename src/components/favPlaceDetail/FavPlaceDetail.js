import React, { useState } from 'react'
import './favPlaceDetail.css'
import AddNoteModal from '../modal/AddNoteModal'
import DeleteModal from '../modal/DeleteModal'

export default function FavPlaceDetail(props) {
    let [openAddNoteModal, setOpenAddNoteModal] = useState(false)
    let [openDeleteModal, setOpenDeleteModal] = useState(false)
    

    return (
        <div className='fav-place-detail-wrapper'>

            {props.disableDeleteModal
                ? <button className='delete-btn' onClick={() => props.deletePlace(props.favList, props.userId, props.place.place_id)}>Delete From Favorites outside ternary</button>
                : <button className='delete-btn' onClick={() => setOpenDeleteModal(true)}>Delete From Favorites</button>
            }

            <p>{props.place.name}</p>
            <p>{props.place.rating}</p>
            <p>{props.place.price_level}</p>
            <p>{props.place.website}</p>
            <p>{props.place.vicinity}</p>
            <p>{props.place.formatted_phone_number}</p>
            <p>{props.place.note}</p>
            <button onClick={() => setOpenAddNoteModal(true)}>{props.place.note === null ? "Add Note" : "Edit Note"}</button>
            {props.place.note === null
                ? null
                : <button onClick={() => props.deleteNote(props.favList, props.userId, props.place.place_id)}>Delete Note</button>}

            {openAddNoteModal ?
                <AddNoteModal
                    setOpenAddNoteModal={setOpenAddNoteModal}
                    addNote={props.addNote}
                    userId={props.userId}
                    place={props.place}
                    favList={props.favList}
                /> : null}

            {openDeleteModal ?
                <DeleteModal
                    disableDeleteModal={props.disableDeleteModal}
                    setDisableDeleteModal={props.setDisableDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    deletePlace={props.deletePlace}
                    userId={props.userId}
                    placeId={props.place.place_id}
                    favList={props.favList}
                /> : null}
        </div>
    )
}


