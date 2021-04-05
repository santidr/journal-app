/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppbar } from './NotesAppbar'

export const NoteScreen = () => {
    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset ] = useForm(note)

    const { title, body, id } = formValues

    const activeId = useRef(note.id)

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id
        }
    }, [reset, note])

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }))

    }, [formValues, dispatch])

    const handleDeleteNote = () => {
        dispatch(startDeleting(id))
    }

    return (
        <div className="notes__main-content">
            <NotesAppbar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Type some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    (note.url) &&
                        (<div className="notes__image">
                                <img
                                    src={ note.url }
                                    alt="image"
                                />
                        </div>)
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDeleteNote }
            >
                Delete
            </button>
        </div>
    )
}
