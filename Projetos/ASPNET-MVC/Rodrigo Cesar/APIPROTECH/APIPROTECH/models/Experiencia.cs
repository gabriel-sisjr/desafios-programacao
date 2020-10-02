using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Models
{
    public class Experiencia
    {
        public int Codigo { get; set; }
        public string Tecnologia { get; set; }
        public int TempoExperiencia { get; set; }
        public string DetalheExperiencia { get; set; }
        public Pessoa Pessoa { get; set; }

    }
}
