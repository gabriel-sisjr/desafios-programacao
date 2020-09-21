import React from "react";
import { useAuth } from "../auth/auth";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const { authTokens, setAuthTokens } = useAuth();
    const history = useHistory();

    function logOut() {
        setAuthTokens();
        history.push("/login");
        history.go();
    }

    return (
        authTokens && (
            <div className="header-container">
                <p className="header-text">Olá, {authTokens.nome}</p>
                <p className="header-text">Renda Total: R$ {authTokens.rendaTotal}</p>
                <button className="logout" onClick={logOut}>Log-out</button>
            </div>
        )
    );
};

export default Header;