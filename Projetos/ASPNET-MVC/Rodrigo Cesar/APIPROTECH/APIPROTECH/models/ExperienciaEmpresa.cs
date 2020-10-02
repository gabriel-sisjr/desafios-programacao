using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Models
{
    public class ExperienciaEmpresa
    {
        public int Codigo { get; set; }
        public string Empresa { get; set; }
        public string Cargo { get; set; }
        public string DataInicio { get; set; }
        public string DataFim { get; set; }
        public string DetalheExperiencia { get; set; }
        public Pessoa Pessoa { get; set; }

    }
}
