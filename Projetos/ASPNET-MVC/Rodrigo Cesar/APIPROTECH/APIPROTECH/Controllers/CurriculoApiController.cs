using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using APIPROTECH.Models;
using APIPROTECH.Repository;

namespace APIPROTECH.Controllers
{
    
    public class CurriculoApiController : Controller
    {
        private readonly IPessoaRepository _pessoaRepository;

        public CurriculoApiController(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;
        }

        // GET: PessoaApi
       [Route("CurriculoApi/Index")]
        public async Task<IActionResult> Index()
        {
            return View(_pessoaRepository.listar());
        }

    }
}
