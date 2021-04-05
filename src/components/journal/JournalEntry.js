import React from 'react'
import moment from 'moment'
import { activeNote } from '../../actions/notes'
import { useDispatch } from 'react-redux'

export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date)
    const dispatch = useDispatch()

    const handleEntryClick = () => {
        dispatch(activeNote(id, { date, title, body }))
    }

    return (
        <div
            className="journal__entry pointer"
            onClick={handleEntryClick}
        >
            {
                url &&
                (
                    <div
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${url})`,
                            height: '90px',
                            width: '110px'
                        }}
                    ></div>
                )
            }

            <div className="journal__entry-body">
                <h4 className="journal__entry-title">
                    {title.substring(0, 22) + '...'}
                </h4>

                <p className="journal__entry-content">
                    {body.substring(0, 42) + '...'}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h3>{noteDate.format('Do')}</h3>
            </div>
        </div>
    )
}
