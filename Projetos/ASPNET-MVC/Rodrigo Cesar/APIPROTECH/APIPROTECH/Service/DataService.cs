using APIPROTECH.Models;
using APIPROTECH.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Service
{
    public class DataService
    {
        private IPessoaRepository _pessoaRepository;

        public DataService(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
        }

        public void Seed()
        {
            Pessoa pessoa = new Pessoa();
            pessoa.Nome = "Rodrigo César";
            pessoa.DataNascimento = "15/09/1995";
            pessoa.ExperienciaTotal = 3;

            Formacao formacao = new Formacao();

            formacao.Curso = "Ciência da Computação";
            formacao.DataConclusao = "30/12/2017";
            formacao.Status = "Concluído";


            Experiencia experiencia = new Experiencia();
            experiencia.Tecnologia = "PHP";
            experiencia.TempoExperiencia = 3;
            experiencia.DetalheExperiencia = "Trabalho na SEAD como programador Sênior utilizando a linguagem php e o framework Laravel para o sistema de Cursos EAD";

            Experiencia experiencia2 = new Experiencia();
            experiencia2.Tecnologia = "C#";
            experiencia2.TempoExperiencia = 3;
            experiencia2.DetalheExperiencia = "Trabalho na CODISE como programador utilizando a linguagem .net e o framework Entity no sistema PSDI para manutenção e melhoria do mesmo";

            Experiencia experiencia3 = new Experiencia();
            experiencia3.Tecnologia = "Wordpress";
            experiencia3.TempoExperiencia = 5;
            experiencia3.DetalheExperiencia = "Trabalho na CODISE como programador utilizando a linguagem PHP utilziando wordpress para construção de temas e plugins para desenvolvimento de sites.";



            ExperienciaEmpresa experienciaEmpresa = new ExperienciaEmpresa();
            experienciaEmpresa.DataInicio = "06/02/2018";
            experienciaEmpresa.DataFim = "01/10/2020";
            experienciaEmpresa.DetalheExperiencia = "Programador Senior";
            experienciaEmpresa.Cargo = "Programador Senior";
            experienciaEmpresa.Empresa = "SEAD";


            ExperienciaEmpresa experienciaEmpresa2 = new ExperienciaEmpresa();
            experienciaEmpresa2.DataInicio = "01/06/2018";
            experienciaEmpresa2.DataFim = "Atualmente";
            experienciaEmpresa2.DetalheExperiencia = "Programador ";
            experienciaEmpresa2.Cargo = "Programador ";
            experienciaEmpresa2.Empresa = "CODISE";

            pessoa.Formacao = new List<Formacao>(){ formacao};
            pessoa.Experiencia = new List<Experiencia>(){ experiencia, experiencia2,experiencia3};
            pessoa.ExperienciaEmpresas = new List<ExperienciaEmpresa>() { experienciaEmpresa, experienciaEmpresa2};

            _pessoaRepository.Inserir(pessoa);
            _pessoaRepository.SaveChangesAsync();


        }
    }
}
