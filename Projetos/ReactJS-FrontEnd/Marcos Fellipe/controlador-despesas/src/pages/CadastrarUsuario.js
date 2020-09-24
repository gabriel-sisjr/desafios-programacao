import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import DatabaseLocal from "../data/DatabaseLocal";
import { useAuth } from "../auth/auth";

import "./Form.css";

function CadastrarUsuario() {
  let { authTokens } = useAuth();
  const history = useHistory();

  const [state, setState] = useState({
    nome: "",
    login: "",
    senha: "",
    repetirSenha: "",
    renda: 0,
    isNomeValid: true,
    isLoginValid: true,
    isRendaValid: true,
    isSenhaValid: true,
    isRepetirSenhaValid: true,
    isError: false,
    errorMessage: ""
  });

  const refForm = React.useRef();

  const cadastrar = (e) => {
    e.preventDefault();

    if (dataIsValid()) {
      try {
        DatabaseLocal.cadastrarUsuario(state.nome, state.login, state.senha, state.repetirSenha, state.renda);
        history.push("/login");
        history.go();
      } catch (error) {
        setState(prevState => {
          clearInputs();
          return { ...prevState, ...{ isError: true, errorMessage: error.message } }
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
          return { ...prevState, [input.dataset.valid]: false };
        });

        valid = false;
      }
    });

    return valid;
  }

  const clearInputs = () => {
    let formInputs = [...refForm.current.children].filter(element => element.nodeName === "INPUT");

    formInputs.forEach(input => {
      setState(prevState => {
        if (input.id !== "nome" && input.id !== "renda") {
          input.value = "";
        }
        return { ...prevState, ...{ [input.dataset.valid]: true } };
      });
    });
  }

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
        ...newState
      };
    });
  };

  return (
    authTokens ? (
      <Redirect to="/" />
    ) : (
        <div className="content-wrapper">
          <form className="form-container" ref={refForm}>
            <input id="nome" className={`form-input ${state.isNomeValid ? "" : "form-error"}`}
              type="text" placeholder="Nome" onChange={handleInputChange} data-valid="isNomeValid" />

            <input id="login" className={`form-input ${state.isLoginValid ? "" : "form-error"}`}
              type="text" placeholder="Login" onChange={handleInputChange} data-valid="isLoginValid" />

            <input id="renda" className={`form-input ${state.isRendaValid ? "" : "form-error"}`}
              type="number" placeholder="Renda" onChange={handleInputChange} data-valid="isRendaValid" />

            <input id="senha" className={`form-input ${state.isSenhaValid ? "" : "form-error"}`}
              type="password" placeholder="Senha" onChange={handleInputChange} data-valid="isSenhaValid" />

            <input id="repetirSenha" className={`form-input ${state.isRepetirSenhaValid ? "" : "form-error"}`}
              type="password" placeholder="Repetir senha" onChange={handleInputChange} data-valid="isRepetirSenhaValid" />

            <button className="form-button" onClick={cadastrar}>Cadastrar</button>
            <Link className="form-link" to="/login"><em>Já possuo uma conta!</em></Link>
            {state.isError ? <p className="error-message">{state.errorMessage}</p> : <></>}
          </form>
        </div>
      )


  );
}

export default CadastrarUsuario;