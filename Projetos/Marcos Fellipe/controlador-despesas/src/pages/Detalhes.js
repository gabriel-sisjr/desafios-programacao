import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth";
import DatabaseLocal from "../data/DatabaseLocal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./Detalhes.css";
import "./Form.css";

import EditDespesa from "./EditDespesa";

const Detalhes = (props) => {
    const { authTokens } = useAuth();
    const { id, categoria } = props.match.params;
    const [isEditing, setIsEditing] = useState(false);
    const [despesa, setDespesa] = useState(DatabaseLocal.getDespesa(authTokens, id, categoria));

    const getDespesa = () => {
        return (
            <div className="despesa-container">
                <div className="despesa-descricao-container">
                    <h1 className="despesa-titulo">{despesa.nome}</h1>
                    <p className="despesa-descricao">{despesa.data} {despesa.hora}</p>
                    <p className="despesa-descricao">Custo: R$ {despesa.custo}</p>
                </div>
                <img className="despesa-img" alt="Comprovante de pagamento." src={despesa.imagem} />
                <div className="control-buttons">
                    <Link className="btn-default" to="/"><FontAwesomeIcon icon={faArrowLeft} /> Voltar</Link>
                    <button className="btn-default btn-editar" onClick={startEditing}>Editar <FontAwesomeIcon icon={faEdit} /></button>
                </div>
            </div>
        );
    }

    const startEditing = () => {
        setIsEditing(true);
    }

    const stopEditing = () => {
        setDespesa(prevState => {
            return {...prevState, ...DatabaseLocal.getDespesa(authTokens, id, categoria)}
        });
        setIsEditing(false);
    }

    return (
        isEditing ? (
            <EditDespesa id={despesa.id} nome={despesa.nome} custo={despesa.custo}
                data={despesa.data} hora={despesa.hora} imagem={despesa.imagem}
                categoriaId={despesa.categoria} stopEditing={stopEditing} />
        ) : (
                getDespesa()
            )
    );
}

export default Detalhes;