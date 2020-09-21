import React, { useState } from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import { AuthContext } from './auth/auth';

import Home from "./pages/Home";
import Login from "./pages/Login";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import CadastrarDespesa from "./pages/CadastrarDespesa";
import CadastrarCategoria from "./pages/CadastrarCategoria";
import Detalhes from "./pages/Detalhes";
import PrivateRoute from "./PrivateRoute";
import Header from "./common/Header";
import DatabaseLocal from './data/DatabaseLocal';

function App() {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(tokens);

    const setTokens = (data) => {
        if (data) {
            localStorage.setItem("tokens", JSON.stringify(data));
        } else {
            localStorage.clear();
        }
        setAuthTokens(data);
    }

    DatabaseLocal.init();

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Header />
            <Switch>
                <PrivateRoute path="/cadastrar-despesa/:id" component={CadastrarDespesa} />
                <PrivateRoute path="/cadastrar-categoria" component={CadastrarCategoria} />
                <PrivateRoute path="/detalhes-despesa/:id,:categoria" component={Detalhes} />
                <Route path="/login" component={Login} />
                <Route path="/cadastrar-usuario" component={CadastrarUsuario} />
                <PrivateRoute path="/" component={Home} />
            </Switch>
        </AuthContext.Provider>
    );
};



export default App;