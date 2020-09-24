import React from "react";
import { Link } from "react-router-dom";
import "../pages/Form.css";
import "../pages/Home.css";

const ListaDespesas = (props) => {
    let gastoTotal = 0;
    return (
        <>
            <ul className="despesas-list">
                {
                    props.despesas.map(despesa => {
                        gastoTotal += despesa.custo;
                        return (
                            <li key={despesa.id} className="despesa-item">
                                <Link to={`/detalhes-despesa/${despesa.id},${despesa.categoria}`}>
                                    <div className="despesa-text-container">
                                        <p className="despesa-text">{despesa.data} {despesa.hora}</p>
                                        <p className="despesa-text">{despesa.nome}</p>
                                        <p className="despesa-text">R$ {despesa.custo}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="total-gastos-container">
                <p>Total de Gastos: R$ {gastoTotal}</p>
            </div>
        </>
    );
};

export default ListaDespesas;