import usuariosIniciais from "./usuarios.json";

const DatabaseLocal = {
    init() {
        if (!localStorage.getItem("usuarios")) {
            localStorage.setItem("usuarios", JSON.stringify(usuariosIniciais));
        }
    },
    listaUsuarios: [],
    getListaUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios"));
    },
    getUsuario(login, senha) {
        let listaUsuarios = this.getListaUsuarios();
        let usuario;

        for (let i = 0; i < listaUsuarios.length; i++) {
            usuario = listaUsuarios[i];
            if (usuario.login === login && usuario.senha === senha) {
                return usuario;
            }
        }

        throw new Error("Usuário ou senha inválida.");
    },
    getCategorias(usuarioAutenticado) {
        let usuarios = this.getListaUsuarios();
        let categorias = usuarios.filter(usuario => usuario.id === usuarioAutenticado.id)[0].categorias;
        return categorias;
    },
    cadastrarUsuario(nome, login, senha, repetirSenha, rendaTotal) {
        if (this.loginExiste(login)) throw new Error("Login já cadastrado!");
        if (senha !== repetirSenha) throw new Error("Senhas não são idênticas!");
        
        let usuarios = this.getListaUsuarios();
        let id = usuarios.length + 1;
        let novoUsuario = {
            id,
            nome,
            login,
            senha,
            rendaTotal
        };

        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    },
    loginExiste(login) {
        let loginExistente = this.getListaUsuarios().filter(usuario => usuario.login === login);
        if (loginExistente.length > 0) {
            return true;
        }
        return false;
    },
    cadastrarCategoria(usuarioAutenticado, categoria) {
        if (this.contemCategoria(usuarioAutenticado.categorias, categoria))
            throw new Error("Categoria já cadastrada.");

        let usuarios = this.getListaUsuarios();
        usuarios.forEach(usuario => {
            if (usuario.id === usuarioAutenticado.id) {
                let novaCategoria = {
                    id: usuario.categorias.length + 1,
                    descricao: categoria,
                    despesas: []
                }
                usuario.categorias.push(novaCategoria);
            }
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    },
    contemCategoria(categorias, categoria) {
        return categorias.filter(item => item.descricao === categoria).length;
    },
    cadastrarDespesa(usuarioAutenticado, nome, custo, categoriaId, imagem) {
        let categoria = this.getCategorias(usuarioAutenticado).filter(categoria => parseInt(categoria.id) === parseInt(categoriaId))[0];

        let id = categoria.despesas.length + 1;
        let date = new Date(Date.now());
        let dia = date.getDate();
        let mes = this.formatarMes(date.getMonth() + 1);
        let ano = date.getFullYear();
        let horas = date.getHours();
        let minutos = date.getMinutes();

        let novaDespesa = {
            id: id,
            nome,
            data: `${dia}/${mes}/${ano}`,
            hora: `${horas}:${minutos}`,
            custo: parseFloat(custo),
            imagem,
            categoria: parseInt(categoriaId)
        }

        let usuarios = this.getListaUsuarios();

        usuarios.forEach(usuario => {
            if (usuario.id === usuarioAutenticado.id) {
                usuario.categorias.forEach(categoria => {
                    if (parseInt(categoria.id) === parseInt(categoriaId)) {
                        console.log(categoria.despesas);
                        categoria.despesas.push(novaDespesa);
                    }
                });
            }
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    },
    formatarMes(mes) {
        let mesFormatado = mes.toString();
        if(mes < 10) {
            mesFormatado = `0${mes}`;
        }
        return mesFormatado;
    },
    editarDespesa(usuarioAutenticado, id, nome, custo, categoriaId) {
        let dadosEditados = {
            nome,
            custo: parseFloat(custo)
        }

        let usuarios = this.getListaUsuarios();

        usuarios.forEach(usuario => {
            if (usuario.id === usuarioAutenticado.id) {
                usuario.categorias.forEach(categoria => {
                    if (parseInt(categoria.id) === parseInt(categoriaId)) {
                        categoria.despesas.map((despesa, index, despesas) => {
                            if (despesa.id === id) {
                                despesas[index] = {...despesa, ...dadosEditados};
                            }
                            return despesa;
                        });
                    }
                });
            }
        });

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    },
    getDespesa(usuarioAutenticado, despesaId, categoriaId) {
        let usuarios = this.getListaUsuarios();
        let despesaRetorno = { };

        usuarios.forEach(usuario => {
            if (parseInt(usuario.id) === parseInt(usuarioAutenticado.id)) {
                usuario.categorias.forEach(categoria => {
                    if (parseInt(categoria.id) === parseInt(categoriaId)) {
                        categoria.despesas.forEach(despesa => {
                            if (parseInt(despesa.id) === parseInt(despesaId)) {
                                despesaRetorno = { ...despesa };
                            }
                        });
                    }
                });
            }
        });

        return despesaRetorno;
    }


}

export default DatabaseLocal;