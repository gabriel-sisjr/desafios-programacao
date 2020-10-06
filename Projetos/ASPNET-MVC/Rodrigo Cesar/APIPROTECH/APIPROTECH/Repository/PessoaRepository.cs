using APIPROTECH.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPROTECH.Repository
{
    public class PessoaRepository : IPessoaRepository
    {
        private Context _dbContext;
        public PessoaRepository( Context context)
        {
            _dbContext = context;
        }
        public void Deletar(int codigo)
        {
           Pessoa pessoa = _dbContext.Pessoa.Find(codigo);
            _dbContext.Pessoa.Remove(pessoa);
        }

        public void Editar(Pessoa pessoa)
        {
           _dbContext.Pessoa.Update(pessoa);

           
        }

        public Pessoa GetById(int codigo)
        {
            var pessoa = _dbContext.Pessoa
                                 .Where(u => u.Codigo == codigo)
                                 .Include(u => u.Formacao)
                                 .Include(u => u.ExperienciaEmpresas)
                                 .Include(u => u.Experiencia)
                                 .FirstOrDefault();
            return  pessoa;
        }

        public void Inserir(Pessoa pessoa)
        {
            _dbContext.Add(pessoa);
        }

        public List<Pessoa> listar()
        {
            var pessoas =  _dbContext.Pessoa
                                 .Include(u => u.Formacao)
                                 .Include(u => u.ExperienciaEmpresas)
                                 .Include(u => u.Experiencia)
                                 .ToList();

            return pessoas;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _dbContext.SaveChangesAsync()) > 0;
        }

        public bool PessoaExists(int codigo)
        {
            return _dbContext.Pessoa.Any(p => p.Codigo == codigo);
        }
    }
}
