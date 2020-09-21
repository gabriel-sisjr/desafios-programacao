import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import DatabaseLocal from '../data/DatabaseLocal';
import './Form.css';

function Login() {

    const [state, setState] = useState({
        login: "",
        senha: "",
        isLoginValid: true,
        isSenhaValid: true,
        isLoggedIn: false,
        isError: false,
        errorMessage: ""
    });

    const refForm = React.createRef();

    const { setAuthTokens } = useAuth();

    const handleLogIn = (e) => {
        e.preventDefault();

        if (dataIsValid()) {
            try {
                let usuario = DatabaseLocal.getUsuario(state.login, state.senha);
                setAuthTokens(usuario);
                setState({ isLoggedIn: true });
            } catch (error) {
                setState(prevState => {
                    return { ...prevState, isError: true, errorMessage: error.message }
                });
            }
        }
    }

    const dataIsValid = () => {
        let valid = true;

        let formInputs = [...refForm.current.children].filter(element => element.nodeName === "INPUT");

        formInputs.forEach(input => {
            if (inputIsEmpty(input)) {
                setState(prevState => {
                    return { ...prevState, [input.dataset.valid]: false }
                });

                valid = false;
            }
        });

        return valid;
    };

    const inputIsEmpty = (input) => {
        let value = input.value;
        return !value;
    }

    const handleInputChange = (e) => {
        let input = e.target;
        let id = input.id;
        let value = input.value;
        let valid = input.dataset.valid;

        let newState = {
            [id]: value,
            [valid]: true,
        }

        setState(prevState => {
            return {
                ...prevState,
                ...newState,
                isError: false,
                errorMessage: ""
            }
        });
    };

    if (state.isLoggedIn || localStorage.getItem("tokens")) {
        return <Redirect to="/" />
    }

    return (
        <div className="content-wrapper">
            <form className="form-container" ref={refForm} noValidate>
                <h1 className="form-title"><FontAwesomeIcon icon={faUser} /> Login</h1>

                <input id="login" className={`form-input ${state.isLoginValid ? "" : "form-error"}`}
                    type="text" placeholder="Login" onChange={handleInputChange} data-valid="isLoginValid" />

                <input id="senha" className={`form-input ${state.isSenhaValid ? "" : "form-error"}`}
                    type="password" placeholder="Senha" onChange={handleInputChange} data-valid="isSenhaValid" />

                <button className="form-button" onClick={handleLogIn}>Log In</button>
                <Link className="form-link" to="/cadastrar-usuario"><em>Não possui uma conta? Cadastre-se!</em></Link>
                {state.isError ? <p className="error-message">{state.errorMessage}</p> : <></>}
            </form>
        </div>
    );
};

export default Login;