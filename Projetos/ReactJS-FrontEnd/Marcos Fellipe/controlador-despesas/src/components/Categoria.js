import React from "react";
import { Link } from "react-router-dom";
import ListaDespesas from "../components/ListaDespesas";
import "../pages/Form.css";
import "../pages/Home.css";

const Categoria = (props) => {
    return (
        <div key={props.descricao} className="categoria-card">
            <h1 className="categoria-titulo">{props.descricao}</h1>
            <ListaDespesas despesas={props.despesas} />
            <Link className="btn-default btn-cadastro" to={`/cadastrar-despesa/${props.id}`}>Cadastrar Despesa</Link>
        </div>
    );
};

export default Categoria;