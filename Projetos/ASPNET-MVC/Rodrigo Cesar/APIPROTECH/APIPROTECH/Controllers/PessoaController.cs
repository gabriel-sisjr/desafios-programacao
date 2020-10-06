using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIPROTECH.Models;
using APIPROTECH.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace APIPROTECH.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private IPessoaRepository _pessoaRepository;
        
        public PessoaController(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
        }
        
        

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            

            return  Ok(_pessoaRepository.listar());

        }

        [HttpGet("{codigo}")]
        public IActionResult getById(int codigo)
        {
            try
            {

                if (codigo <= 0)
                {
                    return BadRequest($"Erro: não existe esse id");

                }
                return Ok(_pessoaRepository.GetById(codigo));
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

        }


        [HttpPost]
        [Consumes("application/json")]
        public async Task<IActionResult> Inserir([FromBody] Pessoa pessoa)
        {
       
            try
            {
                _pessoaRepository.Inserir(pessoa);
                if (await _pessoaRepository.SaveChangesAsync())
                {
                    string salvo = "foi salvo";
                    return Ok(salvo);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest("Erro: problema filho!");
        }

        [HttpPut("{codigo}")]
        [Consumes("application/json")]
        public async Task<IActionResult> Editar(int codigo,[FromBody] Pessoa pessoa)
        {

            try
            {
                if(pessoa == null || codigo != pessoa.Codigo)
                    return BadRequest($"Erro:  Não existe pessoa com este código");

                if (!_pessoaRepository.PessoaExists(codigo))
                    return NotFound();

                _pessoaRepository.Editar(pessoa);
                if (await _pessoaRepository.SaveChangesAsync())
                {
                    string salvo = "foi editada a pessoa com id:" + codigo;
                    return Ok(salvo);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest("Erro: problema filho!");
        }

        [HttpDelete("{codigo}")]
        public IActionResult Deletar(int codigo)
        {

            try
            {

                if (codigo <= 0)
                {
                    return BadRequest($"Erro: não existe esse id");

                }
                else
                {


                    _pessoaRepository.Deletar(codigo);
                    _pessoaRepository.SaveChangesAsync();
                    string salvo = "foi deletado";
                    return Ok(salvo);
                }

            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest("Erro: problema filho!");
        }
    }
}
