import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../auth/auth";
import DatabaseLocal from "../data/DatabaseLocal";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Form.css";

function CadastrarCategoria() {
    const { authTokens } = useAuth();
    const [state, setState] = useState({
        categoria: "",
        isDescricaoValid: true,
        errorMessage: ""
    });

    const history = useHistory();
    const refForm = React.createRef();

    const handleChange = (e) => {
        let input = e.target;
        let value = input.value;

        setState(prevState => {
            return { ...prevState, categoria: value, isDescricaoValid: true, };
        });
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (dataIsValid()) {
            try {
                DatabaseLocal.cadastrarCategoria(authTokens, state.categoria);
                history.push("/");
            } catch (error) {
                setState(prevState => {
                    return { ...prevState, errorMessage: error.message };
                });
            }
        }
    };

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

    return (
        <div className="content-wrapper">
            <form className="form-container" ref={refForm}>
                <input id="descricao" className={`form-input ${state.isDescricaoValid ? "" : "form-error"}`}
                    type="text" placeholder="Descrição" onChange={handleChange} data-valid="isDescricaoValid" />
                <div className="control-buttons">
                    <Link className="btn-default" to="/"><FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    <button className="btn-default btn-cadastro" onClick={handleClick}>Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarCategoria;