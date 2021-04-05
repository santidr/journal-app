import moment from 'moment'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startFileUploading, startSaveNote } from '../../actions/notes'

export const NotesAppbar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const { date } = useSelector(state => state.notes.active )
    const noteDate = moment(date)

    const handleSave = () => {
        dispatch(startSaveNote(active))
    }

    const fileSelector = useRef(null)

    const handlePictureUpload = () => {
        fileSelector.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            dispatch(startFileUploading(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('MMM Do YY') }</span>

            <input 
                ref={ fileSelector }
                type="file"
                name="file"
                style={ { display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureUpload }
                >
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
