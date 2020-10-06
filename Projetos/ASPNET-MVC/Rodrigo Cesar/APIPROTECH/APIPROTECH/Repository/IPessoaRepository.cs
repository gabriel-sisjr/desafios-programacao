using APIPROTECH.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Repository
{
    public interface IPessoaRepository
    {
        public void Inserir(Pessoa pessoa);
        public void Deletar(int codigo);

        public void Editar(Pessoa pessoa);

        public Pessoa GetById(int codigo);

        public List<Pessoa> listar();

        Task<bool> SaveChangesAsync();

        public bool PessoaExists(int codigo);
    }
}
