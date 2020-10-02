using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Models
{
    public class Pessoa
    {
          
            public int Codigo { get; set; }
            public string Nome { get; set; }
            public string DataNascimento { get; set; }
            public List<Formacao> Formacao { get; set; }
            public int ExperienciaTotal { get; set; }
            public List<Experiencia> Experiencia { get; set; }
            public List<ExperienciaEmpresa> ExperienciaEmpresas { get; set; }
    }
}
