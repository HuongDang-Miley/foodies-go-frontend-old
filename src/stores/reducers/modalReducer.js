

// const modalReducer = (modalState, action) => {
//     switch (action.type) {
//         case "TEST":
//             console.log(action)
//             return (
//                 <>
//                     <button onClick={action.setOpenModal}>X</button>
//                     <p>This is test modal box</p>
//                 </>
//             )
//         // case 'SHOW_ADD_NOTE':
//         //     return (
//         //         <div className='modal-wrapper'>
//         //             <button className='close-btn' onClick={() => props.setOpenModal(false)}>x</button>
//         //             <h3>Add note</h3>
//         //             <p>Place: {props.place.name}</p>
//         //             <input className='modal-input' placeholder="Type your note here" ref={noteRef} />
//         //             <div className='btn-wrapper'>
//         //                 <button onClick={() => props.setOpenModal(false)}>Cancel</button>
//         //                 <button className='add-note-btn'
//         //                     onClick={() => handleAddNote()}>{props.place.note.length === 0 ? "Add Note" : "Edit Note"}</button>
//         //             </div>
//         //         </div>
//         //     )


//         default: console.log("shoudn't get here")
//     }
// }

// export default modalReducer