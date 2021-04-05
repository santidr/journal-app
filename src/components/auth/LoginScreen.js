import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startGoogleLogin, startLoginWithEmailPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'

export const LoginScreen = () => {

    const dispatch = useDispatch()
    const { msgError } = useSelector(state => state.ui)
    const { loading } = useSelector(state => state.ui)

    const [formValues, handleInputChange ] = useForm({
        email: 'example@email.com',
        password: 'hola123'
    })

    const { email, password } = formValues

    const handleLogin = (e) => {
        e.preventDefault()
        
        if (isFormValid()) {
            dispatch(startLoginWithEmailPassword(email, password))
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    const isFormValid = () => {
        if (email.trim().length === 0) {
            dispatch(setError('Email is required'))
            return false
        } else if (password.trim().length === 0) {
            dispatch(setError('Password is required'))
            return false
        }

        dispatch(removeError())
        return true
    }

    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>

            {
                msgError &&
                    (<div className="auth__alert-error">
                        { msgError }
                    </div>)
            }

            <form onSubmit={ handleLogin }>
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input mb-5"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mb-5"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>

                <hr />
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
