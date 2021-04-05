import { useDispatch, useSelector } from 'react-redux'

import { JournalEntries } from './JournalEntries'

import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'

export const Sidebar = () => {

    const dispatch = useDispatch()

    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    const handleAddNew = () => {
        dispatch(startNewNote())
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-nav mb-5">
                <h3 className="mt-5">
                    <i className="far fa-moon mr-1"></i>
                    <span>{ name }</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry">
                <button 
                    className="btn btn-primary btn-block"
                    onClick={ handleAddNew }
                >
                    <i className="far fa-calendar-plus fa-2x mr-1"></i>
                    <p className="">New entry</p>
                </button>
            </div>

            <JournalEntries />
        </aside>
    )
}
