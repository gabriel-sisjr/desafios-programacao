import React from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth";
import DatabaseLocal from "../data/DatabaseLocal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import "./Form.css";

import Categoria from "../components/Categoria";

const Home = () => {
    let { authTokens } = useAuth();
    let categorias = DatabaseLocal.getCategorias(authTokens);

    return (
        <div className="categorias-container">
            {
                categorias.map(categoria =>
                    <Categoria id={categoria.id} descricao={categoria.descricao} despesas={categoria.despesas} />
                )
            }
            <div className="categoria-card">
                <Link className="categoria-button" to="/cadastrar-categoria">Cadastrar Categoria <FontAwesomeIcon icon={faPlus} /></Link>
            </div>
        </div>
    );
};

export default Home;