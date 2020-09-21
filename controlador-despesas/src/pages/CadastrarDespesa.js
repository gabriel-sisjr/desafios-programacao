import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../auth/auth";
import DatabaseLocal from "../data/DatabaseLocal";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Form.css";


function CadastrarDespesa(props) {
  const { authTokens } = useAuth();
  const [state, setState] = useState({
    nome: "",
    custo: 0,
    imgFile: "",
    isNomeValid: true,
    isCustoValid: true,
    isError: false,
    errorMessage: ""
  });

  const history = useHistory();
  const { id } = props.match.params;
  const refForm = React.createRef();

  const handleChange = (e) => {
    let input = e.target;
    if (input.type === "file") {
      handleFile(input);
    } else {
      let id = input.id;
      let value = input.value;
      let valid = input.dataset.valid;

      setState(prevState => {
        return { ...prevState, [id]: value, [valid]: true, };
      });
    }
  }

  const handleFile = (input) => {
    if (input) {
      let file = input.files[0];

      let reader = new FileReader();

      reader.onload = (e) => {
        setState(prevState => {
          return { ...prevState, imgFile: reader.result };
        });
      }
      reader.readAsDataURL(file);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    let categoriaId = id;
    if (dataIsValid()) {
      try {
        DatabaseLocal.cadastrarDespesa(authTokens, state.nome, state.custo, categoriaId, state.imgFile);
        history.push("/");
        history.go();
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
          type="text" placeholder="Nome" onChange={handleChange} data-valid="isNomeValid" />

        <input id="custo" className={`form-input ${state.isCustoValid ? "" : "form-error"}`}
          type="number" placeholder="Custo" onChange={handleChange} data-valid="isCustoValid" />


        <input id="image" className={`form-input ${state.isCustoValid ? "" : "form-error"}`}
          type="file" accept="image/png, image/jpeg" onChange={handleChange} data-valid="isCustoValid" />
        <div className="control-buttons">
          <Link className="btn-default" to="/"><FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
          <button className="btn-default btn-cadastro" onClick={handleClick}>Cadastrar</button>
        </div>
        {state.isError ? <p className="error-message">{state.errorMessage}</p> : <></>}
      </form>
      
    </div>
  );
}

export default CadastrarDespesa;