using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Models
{
    public class Formacao
    {
        public int Codigo { get; set; }
        public string Curso { get; set; }
        public string Status { get; set; }
        public string DataConclusao { get; set; }
        public Pessoa Pessoa{ get; set; }

    }
}
