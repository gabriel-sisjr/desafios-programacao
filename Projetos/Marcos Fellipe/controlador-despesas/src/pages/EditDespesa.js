import React, { useState } from "react";
import { useAuth } from "../auth/auth";
import DatabaseLocal from "../data/DatabaseLocal";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Form.css";


function EditDespesa(props) {
    const { authTokens } = useAuth();
    const [state, setState] = useState({
        id: props.id,
        nome: props.nome,
        custo: props.custo,
        isNomeValid: true,
        isCustoValid: true,
        isError: false,
        errorMessage: ""
    });

    const refForm = React.createRef();

    const handleChange = (e) => {
        let input = e.target;
        let id = input.id;
        let value = input.value;
        let valid = input.dataset.valid;

        setState(prevState => {
            return { ...prevState, [id]: value, [valid]: true, };
        });

    }


    const handleClick = (e) => {
        e.preventDefault();
        const categoriaId = props.categoriaId;
        if (dataIsValid()) {
            try {
                DatabaseLocal.editarDespesa(authTokens, state.id, state.nome, state.custo, categoriaId);
                props.stopEditing();
            } catch (error) {
                setState(prevState => {
                    return { ...prevState, isError: true, errorMessage: error.message };
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
                <input id="nome" className={`form-input ${state.isNomeValid ? "" : "form-error"}`}
                    type="text" placeholder="Nome" onChange={handleChange} data-valid="isNomeValid" value={state.nome} />

                <input id="custo" className={`form-input ${state.isCustoValid ? "" : "form-error"}`}
                    type="number" placeholder="Custo" onChange={handleChange} data-valid="isCustoValid" value={state.custo} />

                <div className="control-buttons">
                    <button className="btn-default btn-voltar" onClick={props.stopEditing}><FontAwesomeIcon icon={faArrowLeft} /> Voltar</button>
                    <button className="btn-default btn-cadastro" onClick={handleClick}>Salvar</button>
                </div>
            </form>
            {state.isError ? <p className="error-message">{state.errorMessage}</p> : <></>}
        </div>
    );
}

export default EditDespesa;