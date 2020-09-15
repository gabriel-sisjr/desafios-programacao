# Desafio ReactJs - Front End

## Opa, primeiramente, parabéns por estar dando esse passo na sua jornada! É algo realmente muito agregador e espero que esteja tão empolgado quanto eu! Bom, vamos ao projeto! 😀 😀

### Ele consistirá na criação de controle de despesas, isso mesmo, um controlador de despesas, simples assim!! Porém, como nem tudo são flores, preciso que o projeto obedeça e contenha alguns requisitos, tais como: 

- Ser feito em **ReactJS**.
- Código organizado em pastas.
- Possuir navegação entre as paginas.
- Conter, no mínimo, as páginas de **Login, Cadastro de usuário, Home, Cadastro de despesa** e **Detalhes/Edição**
    - Em **Login** o sistema deverá acessar utilizando login/senha, informar sobre possíveis erros *(usuário/senha invalida)*. 
    - Já no **Cadastro de usuário**, cadastrar o utilizando informações básicas. 
    - Na **Home**, deverá possuir um **gráfico**, **descrição de categoria** e **total de gastos**, assim como uma **“Timeline”** destas (despesas). *(Não esqueça das informações sobre o usuário hein?!)* 😛
    - **Cadastro de despesa**, deverá cadastrar as informações base da despesa e anexar uma imagem *(Em tese, seria um comprovante)* 😛
    - **Detalhes/Edição**, ao clicar em um **determinada despesa** *(na Timeline da home)*, abrir a **respectiva despesa** com suas **informações**. *Reutilizar a tela para edição.*
- Utilizar **JSON** como **“banco de dados”**. 
- Utilizar componentes em **formato funcional e Hooks**.
- Utilizar JavaScript. (TypeScript seria um diferencial **MUITO** interessante!! *#FicaADica*)


------
## Modelo de dados para base.
<br />

### Usuario:
```json
{
    "id": 1,
    "nome": "Gabriel Santana",
    "login": "login",
    "senha": "senha",
    "rendaTotal": 1000.00
}
```
### Despesa:
```json
{
    "id": 1,
    "nome": "Espetinho tio joão",
    "data": "15/09/2020",
    "hora": "18:55",
    "custo": 10.5,
    "imagem": "BLOB ou PATH",
    "categoria": 1
}
```
*Dica: Date.now() para obter Data/Hora* 😀
### Categoria:
```json
{
    "id": 1,
    "descricao": "Alimentar",
}
```

### P.S. Caso necessário, incremente os modelos.

-----

## Envio do projeto

### Crie sua branch utilizando o padrão **feature/seuNome**, realize um pull request e nós analisaremos 😀