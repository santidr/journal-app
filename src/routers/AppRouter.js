import React, { useState } from 'react'
import { 
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AuthRouter } from './AuthRouter'

import { JournalScreen } from '../components/journal/JournalScreen'

import { firebase } from '../firebase/firebase-config.js'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from '../actions/notes'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLoggedIn(false)
            }

            setChecking(false)
        })
    }, [dispatch, setChecking, setIsLoggedIn])

    if (checking) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <Router>
            <div>

                <Switch>
                    <PrivateRoute 
                        exact
                        path="/"
                        component={ JournalScreen }
                        isLoggedIn={ isLoggedIn }
                    />

                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isLoggedIn={ isLoggedIn }
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
