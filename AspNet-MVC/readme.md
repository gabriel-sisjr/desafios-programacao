# Desafio MVC

## Fala programador! Parabéns por estar trilhando esse caminho! É algo muito bom e espero que esteja ansioso para realizar esse desafio! Bom, vamos ao projeto! 😀 😀

### Ele consistirá na criação de um projeto MVC, onde fará o cadastro e leitura de pessoas e seus respectivos "mini-curriculos", simples assim!! Porém, não achou que seria tão facil, achou?! Preciso que obedeça alguns itens que falarei abaixo: 

- Ser feito em **ASP.NET** ou **ASP.NET Core**.
- Deverá ser implementada uma camada DDD contendo os repositórios a serem utilizados na estrutura.
- Os repositórios devem conter recursos que contemplem as informações no *banco de dados*.
- Utilizar **In-memory** para manusear os dados. *("shhh, Vou te dar uma dica pra gerar as classes, mas não conta pra ninguem" Usa: http://json2csharp.com)*
- **DI** e **IoC**. *(Tem que ter né? hehe)* 😛
- Deverá ser criada uma VIEW contendo as informações contidas no *banco de dados*. *(Controller MVC deve consultar do repositório).*
- Implementar todos os metodos do CRUD. *(Inclui o GetById, pra selecionar alguem especial!)* :heart
- Persistir um **JSON**, onde o resultado seja similar ao informado abaixo. *(Pode incrementar, tá?! Haha)* 😛
- Testes unitários (TDD seria um diferencial **MUITO** interessante!! *#FicaADica*)

------
## Modelo de dados para base.
<br />

```json
{
  "Nome": "Seu Nome",
  "DataNascimento": "01-01-2018",
  "Formacao": [
    {
      "Curso": "Curso 1",
      "Status": "Concluido/Em Andamento/Trancado",
      // Data prevista caso em andamento
      "DataConclusao": "12-12-2019 / 01-01-2014"
    },
    {
      "Curso": "Curso 2",
      "Status": "Concluido/Em Andamento/Trancado",
      "DataConclusao": "12-12-2019 / 01-01-2014"
    }
  ],
  "ExperienciaTotal": 10,
  "Experiencia": [
    {
      "Tecnologia": "c#",
      // Em Anos
      "TempoExperiencia": 1,
      "DetalheExperiencia": "Trabalhei em projeto XYZ, atuando como/responsavel por..."
    },
    {
      "Tecnologia": "WebAPI",
      "TempoExperiencia": 1, 
      "DetalheExperiencia": "Trabalhei em projeto XYZ, atuando como/responsavel por..."
    }
  ],
    "ExperienciaEmpresas": [
    {
      "Empresa": "EmpresaX",
      "Cargo": "Dev Junior",
      "DataInicio":"01-01-2010",
      // Data atual caso continue na empresa
      "DataFim":"01-01-2012",
      "DetalheExperiencia": "Trabalhei em projeto XYZ, atuando como/responsavel por..."
    },
    {
      "Empresa": "EmpresaX",
      "Cargo": "Dev Junior",
      "DataInicio":"01-01-2010",
      "DataFim":"01-01-2012",
      "DetalheExperiencia": "Trabalhei em projeto XYZ, atuando como/responsavel por..."
    }
  ]
}
```

### P.S. Caso necessário, incremente os modelos.

-----

## Envio do projeto

### Crie sua branch utilizando o padrão **feature/seuNome**, realize um pull request e nós analisaremos 😀
